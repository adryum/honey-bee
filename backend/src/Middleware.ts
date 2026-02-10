import { Request, Response, NextFunction } from "express";
import { redisClient } from "./config/RedisClient";
import { Role } from "./DatabaseEnums";
import { isValidValue } from "./utils";

export function requireRole(requiredRole: Role) {
    return async (req: Request, res: Response, next: NextFunction)  => {
        const userId = req.session.userId;

        // checks if user has a session id
        if (!isValidValue(userId)) {
            return res.sendStatus(401);
        }

        const role = await redisClient.hGet(`user:${userId}`, "role");

        // checks if role matches requirements
        if (requiredRole !== Role.ANY && role !== requiredRole) {
            return res.sendStatus(403);
        }

        next();
    };
}