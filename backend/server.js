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
app.post('/user', async (req, res) => {
    const { account_code, username, name, surname, image, email, password } = req.body

    console.log(account_code, username, name, surname, image, email, password );
    
    const promises = []
    let userId
    await db.query('SELECT id FROM users WHERE account_code = ?', [account_code]).then((result) => {
        [[{ id: userId }]] = result
    })
    console.log('userId : ' + userId);
    
    const wherePart = 'WHERE id = ' + userId

    if (username) 
        promises.push(db.query('UPDATE users SET username = ? ' + wherePart, [username]))
    if (name) 
        promises.push(db.query('UPDATE users SET name = ? ' + wherePart, [name]))
    if (surname) 
        promises.push(db.query('UPDATE users SET surname = ? ' + wherePart, [surname]))
    if (image) 
        promises.push(db.query('UPDATE users SET image = ? ' + wherePart, [image]))
    if (email) 
        promises.push(db.query('UPDATE users SET e_mail = ? ' + wherePart, [email]))
    if (password) 
        promises.push(db.query('UPDATE users SET password = ? ' + wherePart, [password]))

    await Promise.all(promises)

    const [user] = await db.query('SELECT * FROM users ' + wherePart)

    console.log(user);
    

    res.status(201).json({
        message: 'all good!',
        user: user
    })
})

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

    const accountCode = await generateAccountCode('users', 'account_code')

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
 
    const sortedIds = results.map((obj) => obj[pkColumn].substring(1)).sort((a, b) => a - b)
    
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
    const { identification } = req.body

    console.log(identification);
    
    // missing credentials
    if (!identification) {
        res.status(401).send('incorrect credentials!') 
        return
    }

    const query = `
        SELECT hives.*, api.name as apiary
        FROM hives
        LEFT JOIN apiaries AS api ON hives.apiary_id = api.id
        WHERE hives.user_id = ?
        `
    const [hives] = await db.query(query, [identification.id])

    console.log(hives)
    
    res.status(201).json({
        message: 'all good!',
        hives: hives
    })
})

app.post('/apiary/hives', async (req, res) => {
    const { identification, apiaryId } = req.body
    console.log(identification, apiaryId);
    
    // missing credentials
    if (!identification || !apiaryId && apiaryId != 0) {
        res.status(401).send('incorrect credentials!') 
        return
    }

    const query = `
        SELECT *
        FROM hives
        WHERE user_id = ? AND apiary_id = ?`

    const [hives] = await db.query(query, [identification.id, apiaryId])

    console.log(hives)
    
    res.status(201).json({
        message: 'all good!',
        hives: hives
    })
})

app.post('/hive/overview', async (req, res) => {
    const { identification, hiveId } = req.body
    console.log(identification, hiveId);
    
    // missing credentials
    if (!identification || !hiveId && hiveId != 0) {
        res.status(401).send('incorrect credentials!') 
        return
    }

    const query = `
        SELECT 
            h.id AS h_id, 
            h.name AS h_name,
            h.image AS h_image,
            h.location AS h_location,
            h.type AS h_type,
            h.frames AS h_frames,
            h.weight AS h_height,

            n.id AS n_id,
            CONCAT(u.name, ' ', u.surname) AS n_author,
            n.title AS n_title,
            n.content AS n_content,
            n.creation_date AS n_creation_date,
            n.color AS n_color,

            q.id AS q_id,
            q.name AS q_name,
            q.image AS q_image,
            q.registration_date AS q_registration_date,
            qs.name_latin AS q_specie
        FROM hives AS h
        LEFT JOIN note_place__hive AS note_place ON note_place.hive_id = h.id
        LEFT JOIN notes AS n ON n.id = note_place.note_id
        LEFT JOIN users AS u ON u.id = n.user_id
        LEFT JOIN queen_bees AS q ON q.id = h.queen_bee_id
        LEFT JOIN queen_bee_species AS qs ON q.specie_id = qs.id
        WHERE h.user_id = ? AND h.id = ?`
    const [overviewResults] = await db.query(query, [identification.id, hiveId])
    const overviewObj = overviewResults[0]

    console.log(overviewResults);

    // group notes
    const notes = overviewResults.filter(row => row.n_id).map(row => ({ 
        id: row.n_id,
        author: row.n_author, 
        title: row.n_title, 
        content: row.n_content, 
        creation_date: row.n_creation_date, 
        color: row.n_color 
    }))

    const queen = (overviewObj.q_id) ? getQueenObj() : undefined
    const hive = getHiveObj()
   
    console.log('hive: '); console.log(hive);
    console.log('notes: '); console.log(notes);
    console.log('queen: '); console.log(queen);

    function getHiveObj() {
        const obj = {}
        for (let key in overviewObj) {
            if (key.startsWith('h_')) 
                obj[key.slice(2)] = (overviewObj[key] === null) ? undefined : overviewObj[key]
        }
        return obj
    }
    
    function getQueenObj() {
        const obj = {}
        for (let key in overviewObj) {
            if (key.startsWith('q_')) obj[key.slice(2)] = overviewObj[key]
        }
        return obj
    }
    
    res.status(201).json({
        message: 'all good!',
        hive: hive,
        notes: notes,
        queen: queen
    })
})

app.post('/hive/assign', async (req, res) => {
    const { identification, hiveId, apiaryId } = req.body
    console.log(identification, hiveId, apiaryId);
    
    // missing credentials
    if (!identification || !hiveId && hiveId != 0 || !apiaryId && apiaryId != 0) {
        res.status(401).send('incorrect credentials!') 
        return
    }

    const updateQuery = `
        UPDATE hives SET apiary_id = ? WHERE id = ? AND user_id = ?`
    const [hives] = await db.query(updateQuery, [apiaryId, hiveId, identification.id])

    console.log(hives)
    
    res.status(201).json({
        message: 'all good!',
        hives: hives
    })
})

app.post('/hive/unassign', async (req, res) => {
    const { identification, hiveId } = req.body
    console.log(identification, hiveId);
    
    // missing credentials
    if (!identification || !hiveId && hiveId != 0) {
        res.status(401).send('incorrect credentials!') 
        return
    }

    const updateQuery = `
        UPDATE hives SET apiary_id = NULL WHERE id = ? AND user_id = ?`
    const [hives] = await db.query(updateQuery, [hiveId, identification.id])

    console.log(hives)
    
    res.status(201).json({
        message: 'all good!',
    })
})

app.post('/apiaries', async (req, res) => {
    let { identification, startWith } = req.body
    console.log(identification, startWith)

    // missing credentials
    if (!identification) {
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
        WHERE user_id = ? AND name LIKE ?`

    const [apiaries] = await db.query(query, [identification.id, startWith])

    console.log(apiaries)
    
    res.status(201).json({
        message: 'all good!',
        apiaries: apiaries
    })
})

app.post('/apiary', async (req, res) => {
    let { identification, apiaryId } = req.body
    console.log(identification, apiaryId)

    // missing credentials
    if (!identification || !apiaryId && apiaryId != 0) {
        res.status(401).send('incorrect credentials!') 
        return
    }

    const query = `
        SELECT *
        FROM apiaries
        WHERE user_id = ? AND id = ?`

    const [apiary] = await db.query(query, [identification.id, apiaryId])

    console.log(apiary)
    
    res.status(201).json({
        message: 'all good!',
        apiary: apiary
    })
})

app.post('/apiaries/create', async (req, res) => {
    let { identification, name, location, description } = req.body
    console.log(identification, name, location, description)

    // missing credentials
    if (!identification || !name || !location) {
        res.status(401).send('incorrect information!') 
        return
    }

    const query = `
        INSERT INTO apiaries (name, location, description, user_id)
        VALUES(?, ?, ?, ?)`

    const result = await db.query(query, [name, location, description, identification.id])

    console.log(result)
    
    res.status(201).json({
        message: 'all good!',
        // apiaries: apiaries
    })
})

app.post('/apiaries/delete', async (req, res) => {
    let { identification, apiaryId } = req.body
    console.log(identification, apiaryId)
    console.log(!1)

    // missing credentials
    if (!identification || !apiaryId && apiaryId != 0) {
        res.status(401).send('incorrect information!') 
        return
    }

    const unassigningHivesQuery = `
        UPDATE hives SET apiary_id = NULL WHERE apiary_id = ? AND user_id = ?`
    const unassigningResult = await db.query(unassigningHivesQuery, [apiaryId, identification.id])
    
    const deleteQuery = `
        DELETE FROM apiaries WHERE id = ? AND user_id = ?`
    const result = await db.query(deleteQuery, [apiaryId, identification.id])

    console.log(unassigningResult)
    console.log(result)
    
    res.status(201).json({
        message: 'all good!',
    })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

function convertNULLToUndefinedOrRemove(obj) {
    let newObj = structuredClone(obj)
    let hasAValue = false
    for (let key in newObj) {
        if (newObj[key] === null) {
            newObj[key] = undefined
        } else {
            hasAValue = true
        }
    }

    return (hasAValue) ? newObj : undefined
}
