import { EventEmitter } from "events";
import { Response } from "express";

// single shared emitter for the whole server
export const eventEmitter = new EventEmitter();

export const clientEventName = (id: number) => 'user_' + id

export function sendSSE(res: Response, event: ClientEvents, data?: unknown) {
    console.log(event);
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
}

export enum ClientEvents {
    REFRESH_PAGE = "REFRESH_PAGE",
    LOGOUT = "LOGOUT"
}

export function logoutClient(res: Response) {
    sendSSE(res, ClientEvents.LOGOUT)
}