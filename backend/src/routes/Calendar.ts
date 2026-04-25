import { useCalendar } from "../config/calendar/GoogleCalendar";
import { Role } from "../DatabaseEnums"
import { attachCalendarClient, requireRole } from "../Middleware"
import { Router, type Request, type Response } from "express";
import { withStatus } from "../utils";

const router = Router()

router.post(
    '/create', 
    requireRole([Role.ANY]),
    attachCalendarClient,
    async (
        req: Request<{},{},{
            calendarId:   string
            start:        string
            end:          string
            title:        string
            description:  string
        }, {}>, 
        res: Response
) => {
    console.log("# Create calendar event");
    const { calendarId, start, end, title, description } = req.body
    
    try {
        const { createEvent } = useCalendar()
        
        const event = await createEvent(
            req.calendarClient!,
            {
                calendarId:  calendarId,
                title:       title,
                description: description,
                start:       new Date(start),
                end:         new Date(end)
            }
        )

        res.status(200).json(event)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

router.get(
    "/events",
    requireRole([Role.ANY]),
    async (
        req: Request<{},{},{}, { calendarId: string[], month: string, year: string }>, 
        res: Response
) => {
    console.log("# Get calendar events");
    const calendarIds = [].concat(req.query.calendarId as any) as string[];
    const month       = Number(req.query.month);
    const year        = Number(req.query.year);

    console.log(calendarIds, month, year);
    const { getEvents } = useCalendar()
    
    try {
        const events = await withStatus(`Fetching events for ${calendarIds.length} calendars`, () => {
            return Promise.all(
                calendarIds.map((id) => getEvents({
                    calendarId: id,
                    month:      month,
                    year:       year
                }))
            )
        })
        const flattenedEvents = events.flat()

        res.status(200).json(flattenedEvents)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

export default router
