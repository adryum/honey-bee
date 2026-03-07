import { createClient, RedisClientType } from "redis";
import { Role } from "../DatabaseEnums";
import type { Application, Request } from "express";
import session from "express-session";
import { RedisStore } from "connect-redis";
import { isValidValue } from "../utils";
import { io, getUserRoom, ClientEvents } from "./SocketIo";

export const redisClient = createClient({ 
    url:      process.env.REDIS_URL!,
    password: process.env.REDIS_PASSWORD!,
});

const sub: RedisClientType = redisClient.duplicate();

redisClient.on('error', (err) => console.log('Redis Client Error', err));


export async function connectRedis(app: Application) {
    await redisClient.connect();
    await sub.connect();

    await sub.pSubscribe(
        "__keyevent@0__:expired",
        async (key) => {
        if (!key.startsWith("sess:")) return;

        const sessionId = key.replace("sess:", "");
        const userId = await redisClient.get(`sessionUser:${sessionId}`);
        if (!userId) return;

        io.to(getUserRoom(userId)).emit(ClientEvents.SESSION_EXPIRED);

        await redisClient.del(`sessionUser:${sessionId}`);
        await redisClient.del(`user:${userId}`);
        }
    );

    app.use(session({
        store:             new RedisStore({ client: redisClient }),
        secret:            process.env.SESSION_COOKIE_SECRET!,
        resave:            false,
        saveUninitialized: false,
        cookie:            { 
            secure:   false,
            httpOnly: true,
            sameSite: 'lax',
            maxAge:   1000 * 60 * 60 * Number(process.env.SESSION_LIVESPAN_HOURS)
        },
    }));
}


export type UserAuthenticationModel = {
    req:   Request
    id?:   number
    role?: Role
}
export async function authenticateUser(model: UserAuthenticationModel) {
    const { id, role, req } = model

    if (!isValidValue(id) || !role) {
        throw new Error(`Bad auth user data! id: ${id}, role: ${role}`);
    }

    if (!req.session.cookie.maxAge) {
        throw new Error("Session cookie maxAge is not set");
    }

    req.session.userId = id!
    // instantly saves only values that are set in req.session 
    // e.g. req.session.userId (just setting them doesnt save em)
    // usualy this is excecuted autoatically at end of request, but we need it to be instant
    req.session.save() 

    // adds shadow key to later on expiration correctly bind values to user id
    await redisClient.set(
        `sessionUser:${req.sessionID}`, id!,
        {
            EX: Math.floor(req.session.cookie.maxAge / 1000) + 60, // slightly longer than session TTL
        }
    )

    // adds other info which can be accessed anywhere where req is available
    await redisClient.hSet(`user:${id}`, {
        role: role,
    })
}


export type UserUpdateModel = {
    id?:   number
    role?: Role
}
/**
 * Changes user session data on server and sends a page refresh request to the client.
 * Highly recomended to await this method
 * @param id user id
 * @param role user role
 */
export async function updateUserSession(model: UserUpdateModel, event?: ClientEvents) {
    const { id, role } = model

    console.log("Updating user Redis session...");
    if (!isValidValue(id)) throw new Error("Invalid user is passed: " + id);
    
    if (role) {
        await redisClient.hSet(`user:${id}`, {
            role: role,
        });
    }

    if (event) {
        console.log(`Sending event ${event} to user ${id}`);
        io.to(getUserRoom(id!)).emit(event);
    }

    console.log("Done!");
}