import { google } from 'googleapis';
import { JWT } from 'google-auth-library'
import { Role, Role_to_GoogleCalendarRole } from '../DatabaseEnums';
import { oauth2Client } from './GoogleAuth';

const client = new JWT({
    keyFile: process.env.PATH_TO_SERVICE_ACC!,
    scopes: ['https://www.googleapis.com/auth/calendar'], // Use the Calendar scope
});

// 2. Pass that client into the Google Calendar "Remote Control"
const calendar = google.calendar({ version: 'v3', auth: client });

/**
 * Creates a calendar for a new hive and shares it with the prod email.
 */
export async function createHiveCalendar(hiveId: number) {
    try {
        // A. Create the new secondary calendar
        const newCalendar = await calendar.calendars.insert({
            requestBody: {
                summary: `Hive: ${hiveId}`,
                description: `Calendar for tracking data for ${hiveId}`,
                timeZone: 'UTC', // Or your specific timezone
            },
        });

        const calendarId = newCalendar.data.id!;

        // B. Share it with your Prod Email (the ACL step)
        await calendar.acl.insert({
            calendarId: calendarId,
            requestBody: {
                role: 'owner', // 'owner' allows you to change colors and delete it
                scope: {
                    type: 'user',
                    value: process.env.MAIN_PROD_EMAIL!,
                },
            },
        });

        // C. Return the ID so you can save it in your HiveModelDB
        return calendarId;
    } catch (error) {
        console.error('Google Calendar Setup Failed:', error);
        throw error;
    }
}

export async function shareHiveCalendarWithUser(
    calendarId: string, 
    userEmail: string, 
    role: Role
) {
  // Map your app roles to Google ACL roles
  // 'writer' allows them to add/edit events
  const googleRole = Role_to_GoogleCalendarRole(role)

  try {
    const response = await calendar.acl.insert({
        calendarId: calendarId,
        requestBody: {
            role: googleRole,
            scope: {
                type: 'user',
                value: userEmail,
            },
        },
    });
    return response.data;
  } catch (error) {
    console.error("Error sharing calendar:", error);
    throw error;
  }
}

export async function getHiveEventss(calendarId: string) {
  try {
    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(), // Only get future events
      singleEvents: true,
      orderBy: 'startTime',
    });

    return response.data.items || [];
  } catch (error) {
    console.error(`Error fetching events for ${calendarId}:`, error);
    return [];
  }
}

export type CalendarEntryRequestModel = {
    calendarId:   string
    start:        string
    end:          string
    title:        string
    description:  string
    creatorEmail: string
}

export type CalendarEntryResponseModel = {
    id:          string
    start:       string
    end:         string
    title:       string
    description: string
    creatorEmail: string
}

export async function createHiveEvent(
    model: CalendarEntryRequestModel,
    userAccessToken: string
): Promise<CalendarEntryResponseModel | undefined> {
    try {
        oauth2Client.setCredentials({ access_token: userAccessToken });
    
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
        
        // Now when you insert, 'Created By' in Google will be the USER, not the Robot

        const response = await calendar.events.insert({
            calendarId: model.calendarId, 
            requestBody: {
                summary: model.title,
                description: `[${model.creatorEmail}] ${model.description}`,
                start: { dateTime: model.start },
                end: { dateTime: model.end },
                attendees: [
                    { 
                        email: model.creatorEmail, 
                        responseStatus: 'accepted' // <--- 2. Automatically confirms it
                    }
                ],
            },
        });
        const data = response.data

        return {
            id: data.id ?? "",
            title: data.summary || '',
            description: data.description || '',
            // Google returns these as nested objects { dateTime: '...' }
            start: data.start?.dateTime || data.start?.date || '',
            end: data.end?.dateTime || data.end?.date || '',
            creatorEmail: model.creatorEmail
        };
    } catch (error) {
        console.error("Failed to create Google Event:", error);
        return undefined;
    }
}

export async function getHiveEvents(calendarId: string) {
    try {
        const response = await calendar.events.list({
            calendarId: calendarId,
            // Optional: Filter to only get events from today onwards
            // timeMin: new Date().toISOString(), 
            singleEvents: true, // Expands recurring events into individual instances
            orderBy: 'startTime',
        });

        const events = response.data.items;

        if (!events || events.length === 0) {
            console.log('No upcoming events found for this hive.');
            return [];
        }

        // Map the data to something clean for your Vue frontend
        return events.map(event => ({
            id: event.id,
            title: event.summary,
            start: event.start?.dateTime || event.start?.date,
            end: event.end?.dateTime || event.end?.date,
            description: event.description
        }));

    } catch (error) {
        console.error('Error fetching hive events:', error);
        throw error;
    }
}