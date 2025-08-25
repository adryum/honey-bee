import { Router, type Request, type Response } from "express";
import { db } from "../server";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { PaidTier, UserRole } from "../Enums";
import { UserT } from "../TableColumnTitles";

const router = Router()

// login user
router.post('/login', async (req: Request<{},{}, {
    email: string,
    password: string
}>, res) => {
    console.log(req.body);
    const { email, password } = req.body
    // missing credentials
    if (!email || !password) 
        return res.status(401).send('incorrect credentials!')

    try {
        const [rows] = await db.query<RowDataPacket[]>(`
            SELECT *
            FROM ${UserT.tableName}
            WHERE ${UserT.email} = ?
            LIMIT 1`, 
            [email]
        )
        
        const user = rows[0]

        // user isn't registered
        if (!user) {
            res.status(401).send('incorrect email!')
            console.error("Incorrect email!");
            
            return
        }

        if (password === user[UserT.password]) {
            console.log(user);
            return res.status(201).json(user)
        } else {
            res.status(401).send('incorrect password')
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
})

// create user
router.post('/signup', async (req: Request<{},{}, {
    username: string
    email: string
    password: string
}>, res: Response) => {
    const { username, email, password } = req.body

    // missing credentials
    if (!username || !email || !password) {
        console.error("Missing credentials!");
        
        return res.status(401).send('missing credentials!') 
    }

    try {
        const [[alreadyRegisteredUser]] = await db.query<RowDataPacket[]>(`
            SELECT *
            FROM ${UserT.tableName}
            WHERE ${UserT.email} = ?`, 
            [email]
        )

        // user has already been registered
        if (alreadyRegisteredUser) 
            return res.status(401).send('this email is already registered!')

        // creating user entry
        const [response] = await db.query<ResultSetHeader>(`
            INSERT INTO ${UserT.tableName}
            (${UserT.username}, 
            ${UserT.email}, 
            ${UserT.password}, 
            ${UserT.role}, 
            ${UserT.paidTier})
            VALUES (?, ?, ?, ?, ?, ?)`, 
            [username, email, password, UserRole.User, PaidTier.Free]
        )

        // get user info
        const [[user]] = await db.query<RowDataPacket[]>(`
            SELECT * 
            FROM ${UserT.tableName} 
            WHERE ${UserT.id} = ?`, 
            [response.insertId]
        )

        console.log(user);

        if (user) {
            res.status(201).json(user)
        } else {
            res.status(401).send('could not get registered user!')
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

export default router