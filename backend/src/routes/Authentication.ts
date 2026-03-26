/// <reference path="../types/index.d.ts" />
import { Router, type Request, type Response } from "express";
import { pool } from "../config/Database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { authenticateUser } from "../config/RedisClient";
import { oauth2Client, scopes } from "../config/GoogleAuth";
import { Role } from "../DatabaseEnums";
import { isValidValue } from "../utils";
const router = Router()

router.get('/google', async (req: Request, res: Response) => {
    console.log("From auth/Google !!!");
    
    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: scopes,
    });

    res.redirect(authorizeUrl);
})

router.get(
    '/google/callback', 
    async (
        req: Request,
        res: Response
) => {
    try {
        const { code } = req.query
        console.log("Got Callback!");
        
        // console.log("Code: ", code);

        // Exchange code for tokens
        const { tokens } = await oauth2Client.getToken(code as string);
        oauth2Client.setCredentials(tokens);

        // console.log("token: ", tokens);
        
        if (!tokens.id_token) throw new Error("Token did not contain ID!");
        
        // Verify ID token
        const ticket = await oauth2Client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID as string
        });
        const payload = ticket.getPayload();
        // console.log(payload);

        console.log("Getting user from whitelist...");
        const [[whitelistedUserQuery]] = await pool.query<RowDataPacket[]>(`
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
        const [[possibleUser]] = await pool.query<RowDataPacket[]>(`
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
            await authenticateUser({
                req:  req,
                id:   possibleUser.id,
                role: possibleUser.role
            })
        } else {
            console.log("Creating new user...");
            const [user] = await pool.query<ResultSetHeader>(`
                INSERT INTO users
                (username, image, email, providerSub, provider, googleRefreshToken, role, isWhitelisted)
                VALUES(?,?,?,?,?,?,?)`, 
                [payload?.name, payload?.picture, payload?.email, payload?.sub, "GOOGLE", tokens.refresh_token, whitelistedUserQuery!.role, true]
            )
            console.log("Made new user!");

            console.log("Selecting user id and role for new user session...");
            const [[newUser]] = await pool.query<RowDataPacket[]>(`
                SELECT 
                    id,
                    role
                FROM users
                WHERE providerSub = ? AND provider = ?
                `,
                [payload?.sub, "GOOGLE"]
            )

            await authenticateUser({
                req:  req,
                id:   newUser!.id,
                role: newUser!.role
            })
        }
        console.log("Redirecting back to webistes origin...");
        // Redirect into your SPA
        return res.redirect(`${process.env.WEBSITE_ORIGIN}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Authentication failed');
    }
})

router.get('/logout', async (
    req: Request<{},{}, {}>, 
    res: Response
) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Failed to destroy session:", err);
            return res.status(500).send("Logout failed");
        }

        // clear the cookie on the client
        res.clearCookie("connect.sid"); // default cookie name for express-session
        res.send("Logged out successfully");
    });
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
        const [[getUserResult]] = await pool.query<RowDataPacket[]>(`
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
        const [[alreadyRegisteredUser]] = await pool.query<RowDataPacket[]>(`
            SELECT *
            FROM users
            WHERE email = ?`, 
            [email]
        )

        // user has already been registered
        if (alreadyRegisteredUser) 
            return res.status(401).send('this email is already registered!')

        // creating user entry
        const [response] = await pool.query<ResultSetHeader>(`
            INSERT INTO users
            (username, 
            email, 
            password, 
            role, 
            )
            VALUES (?, ?, ?, ?, ?, ?)`, 
            [username, email, password, Role.ADMINISTRATOR]
        )

        // get user info
        const [[user]] = await pool.query<RowDataPacket[]>(`
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
    console.log("# Checking session for user: ", req.session.userId);
    if (!isValidValue(req.session.userId)) {
        console.log("Fuck out of here! (Banishes user)");
        return res.status(401).send();
    }
    console.log("All good!");
    return res.status(200).send()
})

export default router