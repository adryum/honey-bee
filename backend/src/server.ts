import dotenv from "dotenv";
dotenv.config()
import "./image_cloud/Cloudinary"

import mysql from 'mysql2'
import express from "express";
import cors from "cors";
import { testConnection } from "./utils";
import registrationRoute from "./routes/Registration"
import adminRoute from "./routes/Admin"
import hiveRoute from "./routes/Hives"
import apiaryRoute from "./routes/Apiaries"



const app = express();
const port = 5000;

app.use(cors()); // Enable CORS to allow your Vue app to communicate with this backend
app.use(express.json()); // Parse JSON data in request bodies

// Set up your database connection
export const db = mysql.createPool({
    host: process.env.MYSQL_HOST as string,
    user: process.env.MYSQL_USER as string,
    password: process.env.MYSQL_PASSWORD as string,
    database: process.env.MYSQL_DATABASE as string,
}).promise()

// middle man between request and resposne
// app.use((req, res, next) => {
//     console.log('Incoming request:', req.method, req.url);
//     console.log('body: ', req.body);
    
//     next();
// });

app.use("/registration", registrationRoute)
app.use("/admin", adminRoute)
app.use("/hive", hiveRoute)
app.use("/apiary", apiaryRoute)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

testConnection()
