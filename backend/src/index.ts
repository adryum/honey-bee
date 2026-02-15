import dotenv from "dotenv";
dotenv.config()

import "./config/image_cloud/Cloudinary"
import "./config/ServiceAcc"
import { testConnection } from "./utils";

import authentication from "./routes/Authentication"
import adminRoute from "./routes/Admin"
import hiveRoute from "./routes/Hives"
import apiaryRoute from "./routes/Apiaries"
import noteRoute from "./routes/Notes"
import eventRoute from "./routes/Events"

import express from "express";
import cors from "cors";
import session from "express-session";
import { RedisStore } from "connect-redis";
import { connectRedis, redisClient } from "./config/RedisClient";
const app = express();
const port = 5000;

async function startServer() {
    await connectRedis()

    app.use(cors({
        origin: process.env.WEBSITE_ORIGIN as string, // your SPA origin
        credentials: true,
        exposedHeaders: ['Content-Disposition'] // ondownload exposes file names to client (downloads apple.pdf => client sees apple.pdf)
    })); // Enable CORS to allow your Vue app to communicate with this backend
    app.use(express.json()); // Parse JSON data in request bodies

    app.use(session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_COOKIE_SECRET as string,
        resave: false,
        saveUninitialized: false,
        cookie: { 
            secure: false, 
            httpOnly: true, 
            sameSite: 'lax', 
            maxAge: 1000 * 60 * 60 * 24 // 24 hour 
        },
    }));

    app.use((req, res, next) => {
        // monkey-patches .json function

        const originalJson = res.json;

        res.json = function (body) {
            console.log(">>> Exit!");
            console.log('JSON response:', body);
            return originalJson.call(this, body);
        };

        next();
    });

    // middle man between request and resposne
    app.use((req, res, next) => {
        console.log('------------ First Check -----------');
        console.log('Incoming request:', req.method, req.url);
        console.log('body: ', req.body);
        console.log('------------------------------------');

        next();
    });

    app.use("/events", eventRoute)
    app.use("/auth", authentication)
    app.use("/admin", adminRoute)
    app.use("/hive", hiveRoute)
    app.use("/apiary", apiaryRoute)
    app.use("/note", noteRoute)

    // starts express server
    app.listen(port, () => {
        console.log(`Server running at port: ${port}`);
    });

    testConnection()
}

startServer()