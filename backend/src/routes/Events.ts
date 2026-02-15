import { Router } from "express";
import { sendSSE, ClientEvents, eventEmitter } from "../config/Events";

const router = Router()

router.get("", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    const userId = req.session.userId;

    if (!userId) return res.sendStatus(401);

    console.log("============ Recieved a sub!");
    console.log("userId:", userId);

    const clientSeperateEventName = `user_${userId}`
    // defining event functions
    const event = (event: ClientEvents) => sendSSE(res, event)
    // const refreshUser = () => sendSSE(res, ClientEvents.RefreshPage)

    // assigning defined functions to listener
    eventEmitter.on(clientSeperateEventName, event)
    // eventEmitter.on(clientSeperateEventName, refreshUser);

    // close all listeners
    req.on("close", () => {
        eventEmitter.removeAllListeners(clientSeperateEventName);
    });
});

export default router