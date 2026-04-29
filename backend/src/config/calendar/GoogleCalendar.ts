import { calendar_v3, google } from 'googleapis'
import { JWT } from 'google-auth-library'
import { requireEnv, withStatus } from '../../utils';
import { CalendarEntryModel, CreateCalendarEventModel, UpdateCalendarEventModel } from './Models';
import { UserRoles, Role_to_GoogleCalendarRole } from '../../DatabaseEnums';

const GOOGLE_CLIENT_ID     = requireEnv('GOOGLE_CLIENT_ID')
const GOOGLE_CLIENT_SECRET = requireEnv('GOOGLE_CLIENT_SECRET')
const MAIN_PROD_EMAIL      = requireEnv('MAIN_PROD_EMAIL')

const client = new JWT({
    keyFile: process.env.PATH_TO_SERVICE_ACC!,
    scopes: ['https://www.googleapis.com/auth/calendar'], // Use the Calendar scope
});

// 2. Pass that client into the Google Calendar "Remote Control"
const calendar = google.calendar({ version: 'v3', auth: client });

// For admin ops — creating/deleting hive calendars
export function getAdminCalendarClient() {
    return calendar
}

// For user ops — creating/editing events in that user's name
export function getUserCalendarClient(userRefreshToken: string) {
    const client = new google.auth.OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
    )
    client.setCredentials({ refresh_token: userRefreshToken })
    return google.calendar({ version: 'v3', auth: client })
}

export function useCalendar() {
    async function createEvent(
        userCalendarClient: calendar_v3.Calendar,
        model: CreateCalendarEventModel
    ): Promise<CalendarEntryModel> {
        const { data } = await withStatus(
            `Creating event in calendar ${model.calendarId}`, 
            () => {
                return userCalendarClient.events.insert({
                    calendarId:  model.calendarId,
                    requestBody: {
                        summary:     model.title,
                        description: model.description,
                        start: {
                            dateTime: model.start.toISOString(),
                            timeZone: 'UTC'  
                        },
                        end: {
                            dateTime: model.end.toISOString(),
                            timeZone: 'UTC'
                        }
                    }
                })
            }
        )

        return {
            id:           data.id              ?? 'NO_ID',
            title:        data.summary         ?? 'NO_TITLE',
            description:  data.description     ?? 'NO_DESCRIPTION',
            start:        data.start?.dateTime ?? data.start?.date ?? 'NO_START_TIME',
            end:          data.end?.dateTime   ?? data.end?.date   ?? "NO_END_TIME",
            creatorEmail: data.creator?.email  ?? "NO_EMAIL",
        }
    }

    async function updateEvent(
        userCalendarClient: calendar_v3.Calendar,
        model: UpdateCalendarEventModel
    ): Promise<CalendarEntryModel> {
        const { data } = await withStatus(`Updating event in calendar ${model.calendarId}`, 
            () => {
                return userCalendarClient.events.patch({
                    calendarId:  model.calendarId,
                    eventId:     model.id,
                    requestBody: {
                        summary:     model.title,
                        description: model.description,
                        start: {
                            dateTime: model.start.toISOString(),
                            timeZone: 'UTC'  
                        },
                        end: {
                            dateTime: model.end.toISOString(),
                            timeZone: 'UTC'
                        }
                    }
                })
            }
        )

        return {
            id:           data.id              ?? 'NO_ID',
            title:        data.summary         ?? 'NO_TITLE',
            description:  data.description     ?? 'NO_DESCRIPTION',
            start:        data.start?.dateTime ?? data.start?.date ?? 'NO_START_TIME',
            end:          data.end?.dateTime   ?? data.end?.date   ?? "NO_END_TIME",
            creatorEmail: data.creator?.email  ?? "NO_EMAIL",
        }
    }

    async function deleteEvent({ calendarId, eventId, userCalendarClient }: { 
        userCalendarClient: calendar_v3.Calendar,
        calendarId: string, 
        eventId: string 
    }): Promise<string> {
        await withStatus(`Deleting event from calendar ${calendarId}`, 
            () => userCalendarClient.events.delete({ calendarId: calendarId, eventId: eventId })
        )
        return eventId
    }

    async function getEvents({ calendarId, month, year }: { 
        calendarId: string,
        month: number, 
        year: number 
    }): Promise<CalendarEntryModel[]> {
        const timeMin = new Date(year, month - 1, 1);
        const timeMax = new Date(year, month, 1);

        const { data } = await withStatus(`Fetching events from calendar ${calendarId}`,
            () => getAdminCalendarClient().events.list({
                calendarId,
                timeMin:       timeMin.toISOString(),
                timeMax:       timeMax.toISOString(),
                singleEvents:  true,
                orderBy:       'startTime',
            })
        )

        return data.items?.map<CalendarEntryModel>(event => ({
            id:          event.id              ?? 'NO_ID',
            title:       event.summary         ?? 'NO_TITLE',
            description: event.description     ?? 'NO_DESCRIPTION',
            start:       event.start?.dateTime ?? event.start?.date ?? 'NO_START_TIME',
            end:         event.end?.dateTime   ?? event.end?.date   ?? "NO_END_TIME",
            creatorEmail: event.creator?.email ?? "NO_EMAIL",
        })) ?? []
    }

    async function createCalendar({ name, description }: { 
        name: string, 
        description: string 
    }): Promise<string> {
         // 1. Create the calendar using service account
        const newCalendar = await withStatus(`Creating calendar ${name}`, () => 
            getAdminCalendarClient().calendars.insert({
                requestBody: {
                    summary:     name,
                    description: description,
                    timeZone:    'UTC',
                },
            })
        )

        const calendarId = newCalendar.data.id!

        // TODO: remember to remove this shit when I get main prods refresh token!!! 
        // 2. Give your prod account owner access
        //    (service account owns it by default, but it won't appear
        //    in your prod Google Calendar UI without this step)
        await withStatus(`Granting dedicated account access to calendar ${calendarId}`, () =>  
            getAdminCalendarClient().acl.insert({
                calendarId,
                requestBody: {
                    role:  'owner',
                    scope: { type: 'user', value: MAIN_PROD_EMAIL },
                },
            })
        )

        // 3. Return the ID to save in your hive DB record
        return calendarId
    }

    async function deleteCalendar({ calendarId, memberRefreshTokens }: { 
        calendarId: string,
        memberRefreshTokens: string[],  // all current hive members' refresh tokens
    }): Promise<void> {
        // 1. Remove calendar from every member's calendar list
        await withStatus(`Removing calendar ${calendarId} from members' lists`, () => 
            Promise.all(
                memberRefreshTokens.map(async (refreshToken) => {
                    const userCalendar = getUserCalendarClient(refreshToken)
                    await userCalendar.calendarList.delete({ calendarId })
                })
            )
        )

        // 2. Delete the calendar itself via service account
        //    (this also wipes all ACL rules automatically)
        await withStatus(`Deleting calendar ${calendarId}`, () => 
            getAdminCalendarClient().calendars.delete({ calendarId })
        )
    }

    async function shareCalendar({ calendarId, userEmail, userRefreshToken, role }: { 
        calendarId:        string,
        userEmail:         string,
        userRefreshToken:  string,
        role:              UserRoles
    }): Promise<void> {
        const googleRole = Role_to_GoogleCalendarRole(role)
        
        // acl is calendar permissions!!!
        // 1. Grant access via service account (this is the permission layer)
        await withStatus(`Sharing calendar ${calendarId} with ${userEmail}`, () => 
            getAdminCalendarClient().acl.insert({
                calendarId,
                requestBody: {
                    role: googleRole,
                    scope: { type: 'user', value: userEmail },
                },
            })
        )

        // 2. Add it to their calendar list so it appears immediately, no email needed
        await withStatus(`Adding calendar ${calendarId} to user's list`, () => 
            getUserCalendarClient(userRefreshToken).calendarList.insert({
                requestBody: { id: calendarId },
            })
        )
    }

    async function removeAccesToCalendar({ calendarId, userEmail, userRefreshToken }: { 
        calendarId: string, 
        userEmail: string,
        userRefreshToken: string
    }): Promise<void> {
        // 1. Revoke permission via service account
        await withStatus(`Removing access to calendar ${calendarId} for ${userEmail}`, () => 
            getAdminCalendarClient().acl.delete({
                calendarId,
                ruleId: `user:${userEmail}`,  // Google's ACL rule ID format
            })
        )

        // 2. Remove it from their calendar list using their credentials
        await withStatus(`Removing calendar ${calendarId} from user's list`, () => 
            getUserCalendarClient(userRefreshToken).calendarList.delete({
                calendarId,
            })
        )
    }

    return {
        createEvent,
        updateEvent,
        deleteEvent,
        createCalendar,
        deleteCalendar,
        shareCalendar,
        removeAccesToCalendar,
        getEvents,
    }
}