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
import calendarRoute from "./routes/Calendar"
import inspectionRoute from "./routes/Inspection"
import profileRoute from "./routes/Profile"

import express from "express";
import cors from "cors";
import { connectRedis } from "./config/RedisClient";
import { createServer } from "http";
import { initializeSocket } from "./config/SocketIo";

const app = express();
const httpServer = createServer(app);
const port = process.env.EXPRESS_PORT!
console.log('RUNNING FILE:', __filename);

app.use(cors({
    origin:         process.env.WEBSITE_ORIGIN!,   // your SPA origin
    credentials:    true,
    exposedHeaders: ['Content-Disposition']        // ondownload exposes file names to client (downloads apple.pdf => client sees apple.pdf)
})); // Enable CORS to allow your Vue app to communicate with this backend
app.use(express.json()); // Parse JSON data in request bodies

async function startServer() {
    initializeSocket(httpServer)
    await connectRedis(app)

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
        console.log('------------ New Request -----------');
        console.log('Incoming request:', req.method, req.url);
        console.log('body: ',   req.body);
        // console.log('params: ', req.params);
        // console.log('query: ',  req.query);
        console.log('------------------------------------');

        next();
    });

    app.use("/auth", authentication)
    app.use("/admin", adminRoute)
    app.use("/hive", hiveRoute)
    app.use("/inspection", inspectionRoute)
    app.use("/calendar", calendarRoute)
    app.use("/apiary", apiaryRoute)
    app.use("/note", noteRoute)
    app.use("/profile", profileRoute)

    // starts express server
    httpServer.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    });
    testConnection()
}

startServer()