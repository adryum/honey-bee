import { Router, type Request, type Response } from "express";
import { db } from "../config/Database";
import { requireRole } from "../Middleware";
import { UserRoles } from "../DatabaseEnums";
import { isValidValue, withStatus } from "../utils";
import { updateUserSession } from "../config/RedisClient";
import { ClientEvents } from "../config/SocketIo";
import { and, eq } from "drizzle-orm";
import { userApiaryAccess, userHiveAccess, users, whitelist } from "../db/schema";

const router = Router()

router.post(
    '/access/hive', 
    requireRole([UserRoles.ADMINISTRATOR]),
    async (req: Request<{},{}, {
        userId:     number
        hiveId:     number
    }>, 
    res: Response
) => {
    console.log("# Create user hive access");
    
    const { userId, hiveId } = req.body 

    if (!isValidValue(userId) || !isValidValue(hiveId)) {
        res.status(401).send("incorrect credentials!");
        return;
    }

    try {
        const existingAccess = await withStatus("Getting current access", 
            () => db.query.userHiveAccess.findFirst({
                where: and(
                    eq(userHiveAccess.hiveId, hiveId),
                    eq(userHiveAccess.userId, userId)
                )
            })
        )
        
        if (existingAccess) {
            return res.status(400).send("User already has access to that hive!")
        } 
        
        await withStatus("Granting access", 
            () => db.insert(userHiveAccess).values({
                userId: userId,
                hiveId: hiveId,
            })
        )
        
        return res.status(200).json({
            userId:    userId,
            hiveId:    hiveId,
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to get hive access!');
    }
})


router.delete(
    '/user/:userId/access/hive/:hiveId', 
    requireRole([UserRoles.ADMINISTRATOR]),
    async (req: Request<{
        userId: string
        hiveId: string
    },{}, {}>, 
    res: Response
) => {
    console.log("# Delete user hive access");
    const userId = Number.parseInt(req.params.userId)
    const hiveId = Number.parseInt(req.params.hiveId)

    if (!isValidValue(userId) || !isValidValue(hiveId)) {
        res.status(401).send("incorrect credentials!");
        return;
    }

    try {
        await withStatus("Removing access", 
            () => db.delete(userHiveAccess).where(and(
                eq(userHiveAccess.userId, userId),
                eq(userHiveAccess.hiveId, hiveId)
            ))
        )
        
        return res.status(200).json({
            userId:    userId,
            hiveId:    hiveId,
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to get hive access!');
    }
})

router.get(
    '/user/:userId/access/hives', 
    requireRole([UserRoles.ADMINISTRATOR]),
    async (
        req: Request<{ userId: string },{}, {}>, 
        res: Response
) => {
    const userId = Number.parseInt(req.params.userId)
    console.log(`# Get user ${userId} hive access`);

    if (!isValidValue(userId)) {
        res.status(401).send("incorrect credentials!");
        return;
    }

    try {
        const accessGetResult = await withStatus("Getting hive accesses", 
            () => db.query.userHiveAccess.findMany({
                where: eq(userHiveAccess.userId, userId)
            })
        )

        return res.status(200).json(accessGetResult)
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to get hive access!');
    }
})

router.post(
    '/access/apiary', 
    requireRole([UserRoles.ADMINISTRATOR]),
    async (req: Request<{},{}, {
        userId:     number
        apiaryId:   number
    }>, 
    res: Response
) => {
    console.log("# Update user apiary access");
    const { userId, apiaryId } = req.body 

    if (!isValidValue(userId) || !isValidValue(apiaryId)) {
        res.status(401).send("incorrect credentials!");
        return;
    }

    try {
        const existingAccess = await withStatus("Getting current access", 
            () => db.query.userApiaryAccess.findFirst({
                where: and(
                    eq(userApiaryAccess.apiaryId, apiaryId),
                    eq(userApiaryAccess.userId, userId)
                )
            })
        )
        
        if (existingAccess) {
            return res.status(400).send("User already has access to that apiary!")
        } 
        
        await withStatus("Granting access", 
            () => db.insert(userApiaryAccess).values({
                userId:   userId,
                apiaryId: apiaryId,
            })
        )
        
        return res.status(200).json({
            userId:   userId,
            apiaryId: apiaryId,
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to get apiary access!');
    }
})

router.delete(
    '/user/:userId/access/apiary/:apiaryId', 
    requireRole([UserRoles.ADMINISTRATOR]),
    async (req: Request<{
        userId: string
        apiaryId: string
    },{}, {}>, 
    res: Response
) => {
    console.log("# Delete user hive access");
    const userId   = Number.parseInt(req.params.userId)
    const apiaryId = Number.parseInt(req.params.apiaryId)

    if (!isValidValue(userId) || !isValidValue(apiaryId)) {
        res.status(401).send("incorrect credentials!");
        return;
    }

    try {
        await withStatus("Removing access", 
            () => db.delete(userApiaryAccess).where(and(
                eq(userApiaryAccess.userId, userId),
                eq(userApiaryAccess.apiaryId, apiaryId)
            ))
        )
        
        return res.status(200).json({
            userId:   userId,
            apiaryId: apiaryId,
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to get hive access!');
    }
})

router.get(
    '/user/:userId/access/apiaries', 
    requireRole([UserRoles.ADMINISTRATOR]),
    async (
        req: Request<{ userId: string },{}, {}>, 
        res: Response
) => {
    console.log("# Get user apiary access");
    const userId = Number.parseInt(req.params.userId)

    if (!isValidValue(userId)) {
        res.status(401).send("incorrect credentials!");
        return;
    }

    try {
        const accessGetResult = await withStatus("Getting apiary accesses", () => 
            db.query.userApiaryAccess.findMany({
                where: eq(userApiaryAccess.userId, userId)
            })
        )

        return res.status(200).json(accessGetResult)
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to get apiary access!');
    }
})

router.delete(
    '/user/:userId', 
    async (
        req: Request<{ userId: string },{},{},{}>, 
        res: Response
) => {
    console.log("# Delete user");
    const userId = Number.parseInt(req.params.userId)
    
    if (!isValidValue(userId)) {
        res.status(401).send("incorrect credentials!");
        return;
    }
    
    try {
        await withStatus("Deleting user", () => db.delete(users).where(eq(users.id, userId)))
        return res.status(201).json({
            userId: userId
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to delete user!');
    }
})


router.post(
    '/whitelist', 
    requireRole([UserRoles.ADMINISTRATOR]), 
    async (
        req: Request<{},{},{
            email:     string
            role:      UserRoles,
            isEnabled: boolean
        }, {}>, 
        res: Response
) => {
    console.log("# Create whitelist entry");
    const { email, role, isEnabled } = req.body 
    
    try {
        const existingEntry = await withStatus("Finding existing entry", 
            () => db.query.whitelist.findFirst({
                where: eq(whitelist.email, email)
            })
        )

        if (existingEntry) {
            return res.status(400).send("Email is already in list!")
        } 

        const existingUser = await withStatus(
            "Finding registered user with this email", 
            () => db.query.users.findFirst({
                columns: {
                    id:    true,
                    email: true,
                    role:  true
                },
                where: eq(users.email, email)
            })
        )

        if (existingUser) {
            return res.status(400).json({
                message: "Email is already in list!",
                user: existingUser
            })
        }

        const [insertResult] = await withStatus("Inserting new entry", () => db.insert(whitelist).values({
            email:  email,
            role:   role,
            status: isEnabled
        }))

        const whitelistGetResult = await withStatus("Getting new entry", 
            () => db.query.whitelist.findFirst({
                where: eq(whitelist.id, insertResult.insertId)
            })
        )

        return res.status(200).json(whitelistGetResult)
    } catch (err) {
        console.error(err);
        res.status(500).send('Addition to whitelist failed!');
    }
})

router.delete(
    '/whitelist/:id', 
    requireRole([UserRoles.ADMINISTRATOR]), 
    async (
        req: Request<{ id: string },{},{}>, 
        res: Response
) => {
    console.log("# Remove entry from whitelist");
    const id = Number.parseInt(req.params.id)

    try {
        await withStatus("Deleting entry", () => db.delete(whitelist).where(eq(whitelist.id, id)))
        return res.status(200).json(id)
    } catch (err) {
        console.error(err);
        res.status(500).send('Removal from whitelist failed!');
    }
})

router.put(
    '/whitelist', 
    requireRole([UserRoles.ADMINISTRATOR]), 
    async (
        req: Request<{},{},{
            id:        number
            email:     string
            role:      UserRoles
            isEnabled: boolean
        }>, 
        res: Response
) => {
    console.log("# Whitelist entry update");
    const { id, email, role, isEnabled } = req.body

    try {
        const existingEntry = await withStatus("Getting existing entry", 
            () => db.query.whitelist.findFirst({
                where: eq(whitelist.id, id)
            })
        )

        if (!existingEntry) {
            return res.status(400).send("Entry doesnt exist!")
        }

        if (existingEntry.userId === null) {
            // no user link
            const sameEmailUser = await withStatus("Getting user with new email", 
                () => db.query.users.findFirst({
                    where: eq(users.email, email)
                })
            )

            if (sameEmailUser) {
                return res.status(400).send("Email is used by a registered user!")
            }

            const [updateResult] = await withStatus("Updating entry", 
                () => db.update(whitelist).set({
                    email:  email,
                    role:   role,
                    status: isEnabled
                }).where(eq(whitelist.id, id))
            )

            const whitelistGetResult = await withStatus("Getting existing entry", 
                () => db.query.whitelist.findFirst({
                    where: eq(whitelist.id, updateResult.insertId)
                })
            )

            return res.status(200).json(whitelistGetResult)
        }

        if (existingEntry.email !== email) {
            // remove user link
            const [updateResult] = await withStatus("Updating entry", 
                () => db.update(whitelist).set({
                    email:  email,
                    role:   role,
                    status: isEnabled,
                    userId: null
                }).where(eq(whitelist.id, id))
            )

            const whitelistGetResult = await withStatus("Getting existing entry", 
                () => db.query.whitelist.findFirst({
                    where: eq(whitelist.id, updateResult.insertId)
                })
            )
            await updateUserSession({ id: existingEntry.userId }, ClientEvents.LOGOUT)

            return res.status(200).json(whitelistGetResult)
        }

        // has user link, no email change, update both
        const [whitelistUpdateResult] = await withStatus("Updating whitelist entry", 
            () => db.update(whitelist).set({
                role:   role,
                status: isEnabled
            }).where(eq(whitelist.id, id))
        )

        const [userUpdateResult] = await withStatus("Updating existing user entry", 
            () => db.update(users).set({
                role:   role,
            }).where(eq(users.id, existingEntry.userId!))
        )

        await updateUserSession({ id: existingEntry.userId, role: role }, ClientEvents.LOGOUT)

        return res.status(200).send("Success")
    } catch (err) {
        console.error(err);
        res.status(500).send('Whitelist entry update failed!');
    }
})

router.put(
    '/users', 
    requireRole([UserRoles.ADMINISTRATOR]), 
    async (
        req: Request<{},{},{
            id:            number
            role:          UserRoles
            isWhitelisted: boolean
        }>, 
        res: Response
) => {
    console.log("# User entry update");
    const { id, role, isWhitelisted } = req.body 

    try {
        const existingUser = await withStatus("Getting existing user", 
            () => db.query.users.findFirst({
                where: eq(users.id, id)
            })
        )

        if (!existingUser) {
            return res.status(400).send("User doesnt exists")
        }

        const userWhitelistEntry = await withStatus("Getting user whitelist entry", 
            () => db.query.whitelist.findFirst({
                where: eq(whitelist.userId, id)
            })
        )

        await withStatus("Updating user entry", 
            () => db.update(users).set({
                role: role
            }).where(eq(users.id, id))
        )

        if (userWhitelistEntry) {
            await withStatus("Updating whitelist entry",
                () => db.update(whitelist).set({ 
                    role:   role,
                    status: isWhitelisted 
                }).where(eq(whitelist.id, userWhitelistEntry.id))
            )
        } else {
            await withStatus("Inserting whitelist entry", 
                () => db.insert(whitelist).values({
                    email:  existingUser.email,
                    role:   role,
                    status: isWhitelisted,
                    userId: existingUser.id
                })
            )
        }

        const [userGetResult] = await withStatus("Getting new user entry",
            () => db
                .select({
                    id:              users.id,
                    email:           users.email,
                    role:            users.role,
                    whitelistStatus: whitelist.status
                })
                .from(users)
                .leftJoin(whitelist, eq(whitelist.userId, id))
                .where(eq(users.id, id))
                .limit(1)
        )

        await updateUserSession({ id: id, role: role }, ClientEvents.LOGOUT)

        return res.status(200).json(userGetResult)
    } catch (err) {
        console.error(err);
        res.status(500).send('User entry update failed!');
    }
})

router.get(
    '/whitelist', 
    requireRole([UserRoles.ADMINISTRATOR]),  
    async (
        req: Request<{},{}, {}>,
        res: Response
) => {
    try {
        const whitelistGetResult = await withStatus("Getting all whitelist entries",
            () => db.query.whitelist.findMany()
        )
        res.status(200).json(whitelistGetResult);
    } catch (error) {
        console.error(error);
        
        res.status(400).send("Failed to get all users!");
    }
})

router.get(
    '/users', 
    requireRole([UserRoles.ADMINISTRATOR]), 
    async (
        req: Request<{},{}, {}>, 
        res: Response
) => {
    try {
        const userGetResult = await withStatus("Getting new user entry",
            () => db
                .select({
                    id:              users.id,
                    email:           users.email,
                    role:            users.role,
                    whitelistStatus: whitelist.status
                })
                .from(users)
                .leftJoin(whitelist, eq(whitelist.userId, users.id))
        )
        return res.status(200).json(userGetResult);
    } catch (error) {
        console.error(error);
        res.status(400).send("Failed to get all users!");
    }
})

export default router