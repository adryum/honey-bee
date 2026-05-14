import dotenv from "dotenv";
dotenv.config()

import "./type_extensions/DateExtensions"
import "./type_extensions/ObjectExtensions"
import "./config/image_cloud/Cloudinary"
import { requireEnv, testConnection, withStatus } from "./utils";

import authentication from "./routes/Authentication"
import adminRoute from "./routes/Admin"
import hiveRoute from "./routes/hive/Hive"
import hiveActionHistoryRouter from "./routes/hive/HiveActionHistory";
import hiveYieldsRouter from "./routes/hive/HiveHoneyYields";
import hiveQueenHistoryRouter from "./routes/hive/HiveQueenHistory";
import hiveNotesRouter from "./routes/hive/HiveNotes";
import apiaryRoute from "./routes/Apiaries"
import calendarRoute from "./routes/Calendar"
import inspectionRoute from "./routes/Inspection"
import profileRoute from "./routes/Profile"
import apiaryHistoryRoute from "./routes/ApiaryHistory"
import speciesRoute from "./routes/Species"
import queenRoute from "./routes/Queen"

import express from "express";
import cors from "cors";
import { connectRedis } from "./config/RedisClient";
import { createServer } from "http";
import { initializeSocket } from "./config/SocketIo";
import { setupHistoryActionTypeMap } from "./initialization";

const app = express();
const httpServer = createServer(app);
const port = requireEnv("EXPRESS_PORT")

app.use(cors({
    origin:         process.env.WEBSITE_ORIGIN!,   // your SPA origin
    credentials:    true,
    exposedHeaders: ['Content-Disposition']        // ondownload exposes file names to client (downloads apple.pdf => client sees apple.pdf)
})); // Enable CORS to allow your Vue app to communicate with this backend
app.use(express.json()); // Parse JSON data in request bodies

async function startServer() {
    initializeSocket(httpServer)
    await connectRedis(app)
    await withStatus("Setting up history action enum map", () => setupHistoryActionTypeMap())

    app.use((req, res, next) => {
        // monkey-patches .json function

        const originalJson = res.json
        const originalSend = res.send
        let isJson = false

        res.json = function (body) {
            isJson = true
            console.log('[EXIT] JSON response:', body)
            return originalJson.call(this, body)
        }

        res.send = function (body) {
            if (!isJson) {
                console.log('[EXIT] Send response:', body)
            }
            return originalSend.call(this, body)
        }

        next()
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
    app.use("/profile", profileRoute)
    app.use("/calendar", calendarRoute)
    
    app.use("/apiary", apiaryRoute)
    app.use("/apiaryHistory", apiaryHistoryRoute)
    app.use("/inspection", inspectionRoute)
    
    app.use("/hive", hiveRoute)
    app.use('/hive-action-history', hiveActionHistoryRouter)
    app.use('/hive-yields', hiveYieldsRouter)
    app.use('/hive-queen-history', hiveQueenHistoryRouter)
    app.use('/hive-notes', hiveNotesRouter)

    app.use("/species", speciesRoute)
    app.use("/queen", queenRoute)

    // starts express server
    httpServer.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    });
    testConnection()
}

startServer()