/// <reference path="../types/index.d.ts" />

import { Router, type Request, type Response } from "express";
import { db } from "../config/Database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { redisClient } from "../config/RedisClient";
import { oauth2Client, scopes } from "../config/GoogleAuth";
import { Role } from "../DatabaseEnums";
import { isValidValue } from "../utils";
const router = Router()

router.get('/google', async (req: Request, res: Response) => {
    console.log("From auth/Google !!!");
    
    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });

    res.redirect(authorizeUrl);
})

router.get('/google/callback', async (req: Request, res: Response) => {
    try {
        const { code } = req.query
        console.log("Got Callback!");
        
        console.log("Code: ", code);

        // Exchange code for tokens
        const { tokens } = await oauth2Client.getToken(code as string);
        oauth2Client.setCredentials(tokens);

        console.log("token: ", tokens);
        
        if (!tokens.id_token) throw new Error("Token did not contain ID!");
        
        // Verify ID token
        const ticket = await oauth2Client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID as string
        });
        const payload = ticket.getPayload();
        console.log(payload);

        // is needed only if OAuth consent screen is set to public, internal does it automatically :)
        // allow only testDevLab accounts to verify
        // if (!(payload?.hd === "testdevlab.com" && payload?.email?.endsWith("@testdevlab.com"))) {
        //     console.error("Email is not from testDevLab: ", payload?.hd, payload?.email);
        //     return res.status(401).send("Company email please! :{")
        // 
        console.log("Getting user from whitelist...");
        const [[whitelistedUserQuery]] = await db.query<RowDataPacket[]>(`
            SELECT 
                role, status
            FROM whitelist
            WHERE email = ? 
            `,
            [payload?.email]
        )
        console.log("Done: ", whitelistedUserQuery);
        
        if (!whitelistedUserQuery || !Boolean(whitelistedUserQuery.status)) {
            console.error("User is not in or enabled in whitelist!", payload);
            throw new Error("Not in whitelist!");
        }

        console.log("Checking if user was registered before...");
        // check if user is registered in the sistem
        const [[possibleUser]] = await db.query<RowDataPacket[]>(`
            SELECT 
                id,
                role
            FROM users
            WHERE providerSub = ? AND provider = ?
            `,
            [payload?.sub, "GOOGLE"]
        )
        console.log("Found this about user: ", possibleUser);
        
        // get session data
        if (possibleUser) {
            console.log(req.session.userId); // TypeScript should not complain

            req.session.userId = possibleUser.id;
            console.log("============== Pos user Set user data");
            console.log(possibleUser.id);
            await redisClient.hSet(`user:${possibleUser.id}`, {
                role: possibleUser.role,
            });
            req.session.save()
        } else {
            console.log("Creating new user...");
            const [user] = await db.query<ResultSetHeader>(`
                INSERT INTO users
                (username, image, email, providerSub, provider, role)
                VALUES(?,?,?,?,?,?)`, 
                [payload?.name, payload?.picture, payload?.email, payload?.sub, "GOOGLE", whitelistedUserQuery!.role]
            )
            console.log("Made new user!");

            console.log("Selecting user id and role for new user session...");
            const [[newUser]] = await db.query<RowDataPacket[]>(`
                SELECT 
                    id,
                    role
                FROM users
                WHERE providerSub = ? AND provider = ?
                `,
                [payload?.sub, "GOOGLE"]
            )

            req.session.userId = newUser!.id;

            console.log("============== New user Set user data");

            await redisClient.hSet(`user:${newUser!.id}`, {
                role: newUser!.role,
            });
            req.session.save()
        }
        console.log("Redirecting back to webistes origin...");
        // Redirect into your SPA
        return res.redirect(`${process.env.WEBSITE_ORIGIN}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Authentication failed');
    }
})

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
        const [[getUserResult]] = await db.query<RowDataPacket[]>(`
            SELECT *
            FROM users
            WHERE email = ?
            LIMIT 1`, 
            [email]
        )
        
        // user isn't registered
        if (!getUserResult) {
            res.status(401).send('incorrect email!')
            console.error("Incorrect email!");
            
            return
        }

        if (password === getUserResult.password) {
            return res.status(201).json(getUserResult)
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
            FROM users
            WHERE email = ?`, 
            [email]
        )

        // user has already been registered
        if (alreadyRegisteredUser) 
            return res.status(401).send('this email is already registered!')

        // creating user entry
        const [response] = await db.query<ResultSetHeader>(`
            INSERT INTO users
            (username, 
            email, 
            password, 
            role, 
            )
            VALUES (?, ?, ?, ?, ?, ?)`, 
            [username, email, password, Role.ADMIN]
        )

        // get user info
        const [[user]] = await db.query<RowDataPacket[]>(`
            SELECT * 
            FROM users 
            WHERE id = ?`, 
            [response.insertId]
        )

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

router.get('/me', async (
    req: Request<{},{}, {}>, 
    res: Response
) => {
    console.log("Checking session for user: ", req.session.userId);
    if (!isValidValue(req.session.userId)) {
        console.log("Fuck out of here! (Banishes user)");
        return res.status(401).send();
    }
    res.status(200).send()
})

router.get('/profile', async (
    req: Request<{},{}, {}>, 
    res: Response
) => {
    if (!req.session.userId) {
        return res.status(401).send();
    }

    const [[user]] = await db.query<RowDataPacket[]>(
        `SELECT 
            id,
            username,
            image,
            email,
            role
        FROM users
        WHERE id = ?`
        ,
        [req.session.userId]
    )

    req.session.userId = user!.id
    await redisClient.hSet(`user:${user!.id}`, {
        role: user!.role,
    });

    // fetch user from DB or session
    res.status(200).json(user);
})

export default router