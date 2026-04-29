/// <reference path="../types/index.d.ts" />
import { Router, type Request, type Response } from "express";
import { db, pool } from "../config/Database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { createSession } from "../config/RedisClient";
import { oauth2Client, scopes } from "../config/GoogleAuth";
import { UserRoles } from "../DatabaseEnums";
import { isValidValue, requireEnv, withStatus } from "../utils";
import { eq } from "drizzle-orm";
import { users, whitelist } from "../db/schema";

const router = Router()

router.get('/google', async (req: Request, res: Response) => {
    console.log("From auth/Google !!!");
    
    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt:      'consent',
      scope:       scopes,
    });

    res.redirect(authorizeUrl);
})

router.get(
    '/google/callback', 
    async (
        req: Request,
        res: Response
) => {
    console.log("# Callback from Google OAuth!");

    try {
        const { code } = req.query
        
        // Exchange code for tokens
        const { tokens } = await oauth2Client.getToken(code as string);
        oauth2Client.setCredentials(tokens);

        if (!tokens.id_token)  return res.status(400).send("Token did not contain ID!");
        
        // Verify ID token
        const ticket = await oauth2Client.verifyIdToken({
            idToken:  tokens.id_token,
            audience: requireEnv("GOOGLE_CLIENT_ID")
        });
        const payload = ticket.getPayload();

        if (!payload)  return res.status(400).send("Failed to get payload from token!");

        const { email, name, picture, sub } = payload

        if (!email || !name || !sub || !tokens.refresh_token) {
            return res.status(400).send("Didnt get required credentials!")
        }

        const whitelistedUserResult = await withStatus("Getting user from whitelist", () => 
            db.query.whitelist.findFirst({
                columns: {
                    id:     true,
                    role:   true,
                    status: true,
                    userId: false
                },
                with: {
                    user: {
                        columns: {
                            id: true,
                            role: true,
                        }
                    }
                },
                where: eq(whitelist.email, email)
            })
        )

        console.log("whitelistedUserResult", whitelistedUserResult);
        
        
        if (!!!whitelistedUserResult?.status) {
            return res.status(400).send("User is not in or enabled in whitelist!")
        }

        // get session data
        if (whitelistedUserResult.user) {
            await withStatus(
                "Reseting user refreshtoken BC GOGLE MAKES EM EXPIRE AFTE R 7FUKIN HOURS ON UNVERIFIED APAPPPPPPPP", 
                () => db.update(users)
                    .set({ googleRefreshToken: tokens.refresh_token })
                    .where(eq(users.id, whitelistedUserResult.user!.id))
            )

            await withStatus("Creating user session", () => createSession({
                req:  req,
                id:   whitelistedUserResult.user!.id,
                role: whitelistedUserResult.user!.role
            }))
        } else {
            const [userInsertResult] = await withStatus("Creating user entry", () => 
                db.insert(users).values({
                    username:           name,
                    email:              email,
                    providerSub:        sub,
                    provider:           "GOOGLE",
                    googleRefreshToken: tokens.refresh_token,
                    role: whitelistedUserResult.role,
                })
            )

            await withStatus("Linking user to whitelist entry", () => db.update(whitelist)
                .set({ userId: userInsertResult.insertId })
                .where(eq(whitelist.id, whitelistedUserResult.id)))

            const user = await withStatus("Getting new entry", () => 
                db.query.users.findFirst({
                    columns: {
                        id:   true,
                        role: true
                    },
                    where: eq(users.id, userInsertResult.insertId)
                })
            )

            await withStatus("Creating user session", () => createSession({
                req:  req,
                id:   user!.id,
                role: user!.role
            }))
        }
        console.log("Redirecting back to webistes origin");
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

router.get('/me', async (
    req: Request<{},{}, {}>, 
    res: Response
) => {
    console.log("# Checking session for user: ", req.session.userId);
    if (!isValidValue(req.session.userId)) {
        console.log("[FAILED] Fuck out of here! (Banishes user)");
        return res.status(401).send("Fuck out of here! (Banishes user)");
    }
    console.log("[DONE] All good!");
    return res.status(200).send()
})

export default router