import dotenv from "dotenv";
import { testConnection } from "./services.js";
import mysql from 'mysql2'
import express from "express";
import cors from "cors";
import { catchInfo } from "../frontend/src/utils/log.js"

dotenv.config()
const app = express();
const port = 5000;

// Enable CORS to allow your Vue app to communicate with this backend
app.use(cors());

// Parse JSON data in request bodies
app.use(express.json());

// Set up your database connection
export const db = mysql.createPool({
  host: process.env.MYSQL_HOST, // Your database host
  user: process.env.MYSQL_USER, // Your database username
  password: process.env.MYSQL_PASSWORD, // Your database password
  database: process.env.MYSQL_DATABASE, // Your database name
}).promise()

testConnection()

app.post('/login', async (req, res) => {
    const { email, password } = req.body

    // missing credentials
    if (!email || !password) {
        res.status(401).send('incorrect credentials!') 
        return
    }

    const query = `
        SELECT *
        FROM users
        WHERE e_mail = ?`

    const [[user]] = await db.query(query, [email])

    // user isn't registered
    if (!user) {
        res.status(401).send('incorrect email!') 
        return
    }

    if (password === user['password']) {
        res.status(201).json({
            message: 'all good!',
            user: user
        })
    } else {
        res.status(401).send('incorrect password')
    }
})

app.get('/users', async (req, res) => {
    const { column, attribute, email } = req.query
    const query = `
        SELECT ??
        FROM users
        WHERE ?? = ?`

    // .then((<takes value from previous function>) => passes down)
    db.query(query, [column, attribute, email])
        .then((queryResult) => res.json(queryResult))
        .catch(err => queryErr(err))
})

// // API route to get data from your table
function getUsers() {
    const query = 'SELECT * FROM user'
    app.get('/a', (req, res) => {
        db.query(query)
		.then((results) => {res.json(results[0])})
		.catch(err => queryErr(err))
    })
}

function queryErr(err) {
    catchInfo(err, 'Query error!')
}

getUsers()

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
