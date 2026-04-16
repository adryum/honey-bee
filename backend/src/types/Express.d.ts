import type { calendar_v3 } from 'googleapis'

declare global {
    namespace Express {
        interface Request {
            calendarClient?: calendar_v3.Calendar
        }
    }
}