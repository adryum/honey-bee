import { Router, type Request, type Response } from "express";
import { db } from "../config/Database";
import { requireRole } from "../Middleware";
import { Role, String_to_Role } from "../DatabaseEnums";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { isValidValue } from "../utils";
import { updateUserSession } from "../config/RedisClient";
import { ClientEvents } from "../config/SocketIo";

const router = Router()

router.post(
    '/access/set/apiary', 
    requireRole([Role.ADMINISTRATOR]),
    async (req: Request<{},{}, {
        userId:     number
        apiaryId:   number
        giveAccess: boolean
    }>, 
    res: Response
) => {
    console.log("# Update user apiary access");
    const { userId, apiaryId, giveAccess } = req.body 

    if (!isValidValue(userId) || !isValidValue(apiaryId)) {
        res.status(401).send("incorrect credentials!");
        return;
    }

    try {
        console.log("Checking if user already has access...");
        const [[checkResult]] = await db.query<RowDataPacket[]>(`
            SELECT id
            FROM userApiaryAccess
            WHERE userId = ? AND apiaryId = ?
            LIMIT 1`, 
            [userId, apiaryId]
        )
        
        if (isValidValue(checkResult)) {
            console.log("User has access!");
            if (!giveAccess) {
                console.log("Removing access...");
                await db.query<ResultSetHeader>(`
                    DELETE FROM userApiaryAccess
                    WHERE userId = ? AND apiaryId = ?
                    LIMIT 1`,
                    [userId, apiaryId]
                )
                console.log("Done!");
            }
            return res.status(200).json({
                userId:    userId,
                apiaryId:  apiaryId,
                hasAccess: false
            })
        } else {
            console.log("User doesnt have access!");
            if (giveAccess) {
                console.log("Giving access...");
                await db.query<ResultSetHeader>(`
                    INSERT INTO userApiaryAccess (userId, apiaryId)
                    VALUES (?, ?)`,
                    [userId, apiaryId]
                )
                console.log("Done!");
            }
            return res.status(200).json({
                userId:    userId,
                apiaryId:  apiaryId,
                hasAccess: true
            })
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to get apiary access!');
    }
})

router.post(
    '/access/get/apiaries', 
    requireRole([Role.ADMINISTRATOR]),
    async (req: Request<{},{}, {
        userId: number
    }>, 
    res: Response
) => {
    console.log("# Get user apiary access");
    const { userId } = req.body 

    if (!isValidValue(userId)) {
        res.status(401).send("incorrect credentials!");
        return;
    }

    try {
        console.log("Getting apiary accesses...");
        const [result] = await db.query<RowDataPacket[]>(`
            SELECT apiaryId
            FROM userApiaryAccess
            WHERE userId = ?`, 
            userId
        )
        console.log("Done!");

        return res.status(200).json(result)
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to get apiary access!');
    }
})

router.post('/user/delete', async (req: Request, res: Response) => {
    const { identification, userId } = req.body
    console.log(identification, userId);
    
    // missing credentials
    if (!identification || (!userId && userId != 0)) {
        res.status(401).send('incorrect credentials!') 
        return
    }
 
    const deleteQuery = `
        DELETE FROM users WHERE id = ?
    `
    const delRes = await db.query(deleteQuery, [userId])
    
    res.status(201).json({
        message: 'all good!',
    })
})

const newWhitelistEntryDataQuery = `
    SELECT 
        id,
        email,
        role,
        status,
        EXISTS (
            SELECT 1
            FROM users AS u
            WHERE u.email = w.email
        ) AS isRegistered
    FROM whitelist AS w
`

router.post('/whitelist/add', requireRole([Role.ADMINISTRATOR]), async (req: Request<{},{},{
    email: number
    role: string,
    isEnabled: boolean
}>, res: Response) => {
    console.log("# Adding to whitelist");
    const { email, role, isEnabled } = req.body 
    const roleEnum = String_to_Role(role)
    
    try {
        console.log("Checking if email is already registered...");
        const [[checkResult]] = await db.query<RowDataPacket[]>(`
            SELECT email
            FROM whitelist
            WHERE email = ?
            LIMIT 1
            `, 
            [email]
        )

        if (checkResult) {
            console.log("Found existing row in system: ", checkResult);
            return res.status(400).send("Email is already registered!")
        } else {
            console.log("No email was found! Creating new entry...");
            const [insertResult] = await db.query<ResultSetHeader>(`
                INSERT INTO whitelist 
                (email, role, status)
                VALUES (?, ?, ?)`
                , [email, roleEnum, isEnabled]
            )
            console.log("Done!");

            console.log("Getting new whitelist entry data...");
            const [[newWhitelistEntry]] = await db.query<RowDataPacket[]>(
                    newWhitelistEntryDataQuery + ` 
                    WHERE id = ? 
                    LIMIT 1
                `, [insertResult.insertId]
            )
            console.log("Done!");
            
            return res.status(200).json(newWhitelistEntry)
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Addition to whitelist failed!');
    }
})

router.post('/whitelist/remove', requireRole([Role.ADMINISTRATOR]), async (req: Request<{},{},{
    id: number
}>, res: Response) => {
    console.log("# Remove entry from whitelist");
    const { id } = req.body 

    try {
        console.log("Getting entry's email...");
        const [[entryLinkCheck]] = await db.query<RowDataPacket[]>(`
            SELECT email
            FROM whitelist
            WHERE id = ?
            LIMIT 1
            `, [id]
        )
        console.log("Done!");
        
        console.log("Checking if entry has a link with user...");
        const [[userIdQuery]] = await db.query<RowDataPacket[]>(`
            SELECT id
            FROM users
            WHERE email = ?
            LIMIT 1
            `, [entryLinkCheck?.email]
        )
        
        if (userIdQuery) {
            console.log("Found linked user!");
            const userId: number = userIdQuery?.id

            console.log("Removing user from whitelist and breaking whitelist - user link...");
            await db.query<ResultSetHeader>(`
                UPDATE users
                SET isWhitelisted = false
                WHERE id = ?
                LIMIT 1
                `, [userId]
            );
            console.log("Removed from whitelist!");
            await updateUserSession({ id: userId }, ClientEvents.LOGOUT)
        } else {
            console.log("No user was found!");
        }

        console.log("Deleting entry from table...");
        await db.query<ResultSetHeader>(`
            DELETE FROM whitelist
            WHERE id = ?
            `, [id]
        );
        console.log("Done!");

        return res.status(200).json(id)
    } catch (err) {
        console.error(err);
        res.status(500).send('Removal from whitelist failed!');
    }
})


router.post('/whitelist/update', requireRole([Role.ADMINISTRATOR]), async (req: Request<{},{},{
    id: number
    email: string 
    role: string
    isEnabled: boolean
}>, res: Response) => {
    console.log("# Whitelist entry update");
    const { id, email, role, isEnabled } = req.body 
    const roleEnum = String_to_Role(role)

    try {
        // check if email has changed
        console.log("Checking if whitelist entry's email was changed...");
        const [[emailCheck]] = await db.query<RowDataPacket[]>(`
            SELECT 
                email,
                EXISTS (
                    SELECT 1
                    FROM users AS u
                    WHERE u.email = w.email
                ) AS isRegistered
            FROM whitelist AS w
            WHERE id = ?
            LIMIT 1
            `, [id]
        )

        if (emailCheck !== undefined && emailCheck.email !== email) {
            console.log("Email was changed!");

            console.log("Checking if entry with new already email exists...");
            const [[existingWhitelistEntryCheck]] = await db.query<RowDataPacket[]>(`
                SELECT id
                FROM whitelist
                WHERE email = ?
                LIMIT 1
                `, [email]
            )

            if (existingWhitelistEntryCheck) {
                throw new Error("Entry with this email is already in the system!");
            } else {
                console.log("No entry found - proceed!");
            }

            console.log("Checking if previous user is registered...");
            const [[userIdQuery]] = await db.query<(RowDataPacket & { id: number })[]>(`
                SELECT id
                FROM users
                WHERE email = ?
                `, [emailCheck.email]
            )

            if (isValidValue(userIdQuery?.id)) {
                console.log("User is registered!");
                
                console.log("Removing user from whitelist and breaking whitelist - user link...");
                await db.query<ResultSetHeader>(`
                    UPDATE users
                    SET isWhitelisted = false
                    WHERE email = ?
                    LIMIT 1
                    `, [emailCheck?.email]
                );
                console.log("Removed from whitelist!");
                await updateUserSession({ id: userIdQuery.id, role: roleEnum }, ClientEvents.LOGOUT)
            } else {
                console.log("User is not registered!");
            }
        } else if (emailCheck !== undefined && Boolean(emailCheck.isRegistered)) {
            console.log("Whitelist entry is linked to an user!");
            console.log(emailCheck);
            
            console.log("Updating user entry...");
            const [[userIdGetResult]] = await db.query<RowDataPacket[]>(`
                SELECT id
                FROM users
                WHERE email = ?
                `, [email]
            );
            const userId = userIdGetResult!.id
            const [updateUserResult] = await db.query<ResultSetHeader>(`
                UPDATE users
                SET role = ?, isWhitelisted = ?
                WHERE id = ?
                `, [roleEnum, isEnabled, userId]
            );

            console.log("Done!");
            await updateUserSession({ id: userId, role: roleEnum }, ClientEvents.LOGOUT)
        } else {
            console.log("Whitelist entry is not linked to an user!");
        }

        console.log("Updating whitelist entry...");
        const [updateEntryResult] = await db.query<ResultSetHeader>(`
            UPDATE whitelist
            SET email = ?, role = ?, status = ?
            WHERE id = ?
            `, [email, roleEnum, isEnabled, id]
        ); 
        console.log("Done!");

        console.log("Checking if there's a user with new entry's email...");
        const [[newEmailUserCheck]] = await db.query<(RowDataPacket & { id: number })[]>(`
            SELECT id
            FROM users
            WHERE email = ?
            LIMIT 1
            `, [email]
        )

        if (isValidValue(newEmailUserCheck?.id)) {
            console.log("User found!");
            
            console.log("Updating user with a matching entry email...");
            await db.query<RowDataPacket[]>(`
                UPDATE users
                SET role = ?, isWhitelisted = ?
                WHERE email = ?
                LIMIT 1
                `, [roleEnum, isEnabled, email]
            )
            console.log("Done!");
            await updateUserSession({ id: newEmailUserCheck.id, role: roleEnum }, ClientEvents.LOGOUT)
        } else {
            console.log("No user with entrys email!");
        }

        var userEntry: RowDataPacket | undefined
        var whitelistEntry: RowDataPacket | undefined

        if (emailCheck) {
            console.log("Getting new user data...");
            [[userEntry]] = await db.query<RowDataPacket[]>(`
                SELECT 
                    id,
                    email,
                    role,
                    isWhitelisted
                FROM users
                WHERE email = ?
                LIMIT 1
                `, [emailCheck.email]
            )
            console.log("Done!");
        } else {
            console.log("Skiped user get!");
        }

        console.log("Getting new whitelist entry data...");
        [[whitelistEntry]] = await db.query<RowDataPacket[]>(
            newWhitelistEntryDataQuery + `
            WHERE id = ?
            LIMIT 1
        `, [id]
        )
        console.log("Done!");
        
        return res.status(200).json({
            whitelistEntry: whitelistEntry,
            userEntry: userEntry
        })
    } catch (err) {
        console.error(err);
        res.status(500).send('Whitelist entry update failed!');
    }
})

router.post(
    '/users/update', 
    requireRole([Role.ADMINISTRATOR]), 
    async (
        req: Request<{},{},{
            id: number
            email: string 
            role: string
            isWhitelisted: boolean
        }>, 
        res: Response
) => {
    console.log("# User entry update");
    const { id, email, role, isWhitelisted } = req.body 
    const roleEnum = String_to_Role(role)

    try {
        console.log("Checking if users whitelist status has changed...");
        const [[whitelistStatusCheck]] = await db.query<RowDataPacket[]>(`
            SELECT isWhitelisted
            FROM users
            WHERE id = ?
            LIMIT 1
            `, [id]
        )

        if (!whitelistStatusCheck) throw Error("No such user in DB!")

        var whitelistTableCheck: RowDataPacket | undefined

        if (whitelistStatusCheck.isWhitelisted !== isWhitelisted) {
            console.log(`Status was changed: ${whitelistStatusCheck.isWhitelisted} => ${isWhitelisted}`);
            console.log("Checking if user is in whitelist table...");
            [[whitelistTableCheck]] = await db.query<RowDataPacket[]>(`
                SELECT
                    id
                FROM whitelist
                WHERE email = ?
                LIMIT 1
                `, [email]
            )

            // updates if exists, creates if is whitelisted
            if (whitelistTableCheck) {
                console.log("User is in whitelist table!");
                console.log("Updating whitelist entry...");
                const [updateEntryResult] = await db.query<ResultSetHeader>(`
                    UPDATE whitelist
                    SET role = ?, status = ?
                    WHERE email = ?
                    `, [role, isWhitelisted, email]
                ); 
                console.log("Done!");
            } else {
                console.log("User is not in whitelist table!");

                if (isWhitelisted) {
                    console.log("Creating new whitelistEntry...");
                    const [whitelistEntryInsert] = await db.query<ResultSetHeader>(`
                        INSERT INTO whitelist
                        (email, role, status)
                        VALUES(?,?,?)`,
                        [email, roleEnum, isWhitelisted]
                    )
                    console.log("Done!");
                }
            }
        }

        console.log("Updating user...");
        const [[userIdGetResult]] = await db.query<RowDataPacket[]>(`
            SELECT id
            FROM users
            WHERE email = ?
            `, [email]
        );
        const userId = userIdGetResult!.id
        const [updateUserResult] = await db.query<ResultSetHeader>(`
            UPDATE users
            SET role = ?, isWhitelisted = ?
            WHERE id = ?
            `, [roleEnum, isWhitelisted, id]
        );
        console.log("Done!");
        await updateUserSession({ id: id, role: roleEnum }, ClientEvents.LOGOUT)

        var userEntry: RowDataPacket | undefined
        var whitelistEntry: RowDataPacket | undefined

        if (whitelistTableCheck) {
            console.log("Getting new whitelist entry data...");
            [[whitelistEntry]] = await db.query<RowDataPacket[]>(
                newWhitelistEntryDataQuery + `
                WHERE id = ?
                LIMIT 1
                `, [whitelistTableCheck.id]
            )
            console.log("Done!");
        } else {
            console.log("Skiped whitelist entry get!");
        }

        console.log("Getting new user entry data...");
        [[userEntry]] = await db.query<RowDataPacket[]>(`
            SELECT 
                id,
                email,
                role,
                isWhitelisted
            FROM users
            WHERE id = ?
            LIMIT 1
            `, [id]
        )
        console.log("Done!");
        
        return res.status(200).json({
            whitelistEntry: whitelistEntry,
            userEntry: userEntry
        })
    } catch (err) {
        console.error(err);
        res.status(500).send('User entry update failed!');
    }
})

router.get('/whitelist/users', requireRole([Role.ADMINISTRATOR]),  async (
    req: Request<{},{}, {}>,
    res: Response
) => {
    try {
        console.log("Getting all whitelist table entries...");
        const [whitelistEntries] = await db.query<RowDataPacket[]>(newWhitelistEntryDataQuery)
        console.log("Done!");
        res.status(200).json(whitelistEntries);
    } catch (error) {
        res.status(400).send("Failed to get all users!");
    }
})

router.get('/users', requireRole([Role.ADMINISTRATOR]), async (
    req: Request<{},{}, {}>, 
    res: Response
) => {
    try {
        console.log("Getting all users...");
        const [users] = await db.query<RowDataPacket[]>(`
            SELECT 
                id,
                email,
                role,
                isWhitelisted
            FROM users
            `
        )
        console.log("Done!");
        return res.status(200).json(users);
    } catch (error) {
        res.status(400).send("Failed to get all users!");
    }
})


export default router