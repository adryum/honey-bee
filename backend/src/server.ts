import dotenv from "dotenv";
import mysql from 'mysql2'
import express from "express";
import cors from "cors";
import { testConnection } from "./utils";
import registrationRoute from "./routes/Registration"
import adminRoute from "./routes/Admin"
import hiveRoute from "./routes/Hives"
import apiaryRoute from "./routes/Apiaries"

dotenv.config()
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

app.use("/registration", registrationRoute)
app.use("/admin", adminRoute)
app.use("/hive", hiveRoute)
app.use("/apiary", apiaryRoute)

app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  next();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

testConnection()





// function convertNULLToUndefinedOrRemove(obj) {
//     let newObj = structuredClone(obj)
//     let hasAValue = false
//     for (let key in newObj) {
//         if (newObj[key] === null) {
//             newObj[key] = undefined
//         } else {
//             hasAValue = true
//         }
//     }

//     return (hasAValue) ? newObj : undefined
// }
