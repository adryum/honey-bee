import dotenv from "dotenv";
dotenv.config()
import "./config/image_cloud/Cloudinary"

import express from "express";
import cors from "cors";
import { testConnection } from "./utils";
import registrationRoute from "./routes/Registration"
import adminRoute from "./routes/Admin"
import hiveRoute from "./routes/Hives"
import apiaryRoute from "./routes/Apiaries"
import noteRoute from "./routes/Notes"
import supperRoute from "./routes/Suppers"
const app = express();
const port = 5000;

app.use(cors()); // Enable CORS to allow your Vue app to communicate with this backend
app.use(express.json()); // Parse JSON data in request bodies

// middle man between request and resposne
app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.url);
    console.log('body: ', req.body);
    
    next();
});

app.use("/registration", registrationRoute)
app.use("/admin", adminRoute)
app.use("/hive", hiveRoute)
app.use("/apiary", apiaryRoute)
app.use("/note", noteRoute)
app.use("/supper", supperRoute)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

testConnection()
