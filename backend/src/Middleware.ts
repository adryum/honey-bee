import { Request, Response, NextFunction } from "express";
import { getSessionUserRole } from "./config/RedisClient";
import { Role } from "./DatabaseEnums";
import { isValidValue } from "./utils";
import { db } from "./config/Database";
import { users } from "./db/schema";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { getUserCalendarClient } from "./config/calendar/GoogleCalendar";

export function requireRole(requiredRoles: Role[]) {
    return async (req: Request, res: Response, next: NextFunction)  => {
        const userId = req.session.userId;

        // checks if user has a session id
        if (!isValidValue(userId)) {
            return res.sendStatus(401);
        }

        const role = await getSessionUserRole(userId)

        // checks if role matches requirements
        if (!requiredRoles.includes(Role.ANY) && !requiredRoles.includes(role)) {
            return res.sendStatus(403);
        }

        next();
    };
}

export async function attachCalendarClient(req: Request, res: Response, next: NextFunction) {
    const userId = req.session.userId!;

    const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
        columns: { googleRefreshToken: true }
    })

    if (!user?.googleRefreshToken) {
        return res.status(403).json({ error: 'No Google credentials for this user' })
    }

    req.calendarClient = getUserCalendarClient(user.googleRefreshToken)
    next()
}