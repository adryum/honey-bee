import { useCalendar } from "../config/calendar/GoogleCalendar";
import { Role } from "../DatabaseEnums"
import { attachCalendarClient, requireRole } from "../Middleware"
import { getCurrentUTCDateString } from "../utils"
import { Router, type Request, type Response } from "express";

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
        }>, 
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

export default router
