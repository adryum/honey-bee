import dotenv from "dotenv";
import { testConnection } from "./services.js";
import mysql from 'mysql2'
import express from "express";
import cors from "cors";

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

app.post('/signup', async (req, res) => {
    const { name, surename, profilePicture, email, password } = req.body

    // missing credentials
    if (!email || !password || !name || !surename) {
        res.status(401).send('missing credentials!') 
        return
    }

    const checkQuery = `
        SELECT *
        FROM users
        WHERE e_mail = ?`

    const [[alreadyRegisteredUser]] = await db.query(checkQuery, [email])

    // user has already been registered
    if (alreadyRegisteredUser) {
        res.status(401).send('this email is already registered!') 
        return
    } 

    const insertQuery = `
        INSERT INTO users
        (account_code, name, surename, profile_picture, e_mail, password, role)
        VALUES (?, ?, ?, ?, ?, ?, ?)`

    const accountCode = await generateAccountCode()

    const insert = await db.query(insertQuery, [accountCode, name, surename, null, email, password, 'Admin'])

    const [[newUser]] = await db.query(checkQuery, [email])

    if (newUser) {
        res.status(201).json({
            message: 'all good!',
            user: newUser
        })
    } else {
        res.status(401).send('could not get registered user!')
    }
})

async function generateAccountCode(table, pkColumn) {
    const query = `
        SELECT ${pkColumn}
        FROM ${table}`

    const [results] = await db.query(query)
    const sortedIds = results.map((obj) => obj['id'].substring(1)).sort((a, b) => a - b)
    
    let previousCode = parseInt(sortedIds[0])
    
    // check if table contains skipped value, like: 1 2 4 (3 was skipped)
    for (let i = 1; i < sortedIds.length; i++) {
        const selectedCode = parseInt(sortedIds[i])

        if (previousCode - selectedCode < -1) {
            console.log(`previous: ${previousCode}, selected: ${selectedCode}`)
            return `#${previousCode + 1}`
        }

        previousCode = selectedCode
    }

    // add 1 to the last value
    return `#${parseInt(sortedIds[sortedIds.length - 1]) + 1}`
}

app.post('/hives', async (req, res) => {
    const { accountCode } = req.body

    // missing credentials
    if (!accountCode) {
        res.status(401).send('incorrect credentials!') 
        return
    }

    const query = `
        SELECT *
        FROM hives
        WHERE creator = ?`

    const [hives] = await db.query(query, [accountCode])

    console.log(hives)
    
    res.status(201).json({
        message: 'all good!',
        hives: hives
    })
})

app.post('/apiaries', async (req, res) => {
    let { accountCode, startWith } = req.body
    console.log(accountCode, startWith)

    // missing credentials
    if (!accountCode) {
        res.status(401).send('incorrect credentials!') 
        return
    }

    // sets default value
    if (!startWith) {
        startWith = '%'
    } else {
        startWith = startWith.concat('%')
    }

    console.log(startWith)

    const query = `
        SELECT *
        FROM apiaries
        WHERE creator = ? AND name LIKE ?`

    const [apiaries] = await db.query(query, [accountCode, startWith])

    console.log(apiaries)
    
    res.status(201).json({
        message: 'all good!',
        apiaries: apiaries
    })
})

app.post('/apiaries/create', async (req, res) => {
    let { accountCode, name, location, description } = req.body
    console.log(accountCode, name, location, description)

    // missing credentials
    if (!accountCode || !name || !location) {
        res.status(401).send('incorrect information!') 
        return
    }

    const avialableId = await generateAccountCode('apiaries', 'id')

    const query = `
        INSERT INTO apiaries (id, name, location, description, creator)
        VALUES(?, ?, ?, ?, ?)`

    const result = await db.query(query, [avialableId, name, location, description, accountCode])

    console.log(result)
    
    res.status(201).json({
        message: 'all good!',
        // apiaries: apiaries
    })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
