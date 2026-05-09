import { Router, type Request, type Response } from "express";
import { db } from "../../config/Database";
import { uploadImage } from "../../config/image_cloud/Cloudinary";
import { PublicIdBuilder } from "../../config/image_cloud/PublicIdBuilder";
import { upload } from "../../config/Multer";
import { requireRole } from "../../Middleware";
import { HiveType, UserRoles } from "../../DatabaseEnums";
import { getSessionUserRole } from "../../config/RedisClient";
import { and, eq, inArray, or } from "drizzle-orm";
import { hives, userApiaryAccess, userHiveAccess, users } from "../../db/schema";
import { useCalendar } from "../../config/calendar/GoogleCalendar";
import { withStatus } from "../../utils";
import z from "zod";

const router = Router()


router.get(
    "/:id/hives",
    requireRole([UserRoles.ANY]),
    async (
        req: Request<{ id: string }>, 
        res: Response
) => {
    console.log("# Get all apiary hives");
    const userId   = req.session.userId!
    const role     = await getSessionUserRole(userId)
    const apiaryId = parseInt(req.params.id)

    try {
        console.log("Getting hives user has access to...");

        var hivesResult
        switch (role) {
            case UserRoles.ADMINISTRATOR:
                hivesResult = await db.query.hives.findMany({
                    where: eq(hives.apiaryId, apiaryId)
                });
                break;
            default:
                const hiveAccess = await db.query.userHiveAccess.findMany({
                    where: eq(userHiveAccess.userId, userId)
                });

                hivesResult = await db.query.hives.findMany({
                    where: and(
                        eq(hives.apiaryId, apiaryId), 
                        inArray(hives.id, hiveAccess.map(item => item.hiveId))
                    )
                });
                break;
        }
        console.log("Done!");

        return res.status(200).json(hivesResult)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})


router.get(
    "/",
    requireRole([UserRoles.ANY]),
    async (
        req: Request, 
        res: Response
) => {
    console.log("# Get all hives");

    const querySchema = z.strictObject({
        hiveIds: z.array(z.coerce.number()).optional()
    })
    const userId = req.session.userId!
    const role   = await getSessionUserRole(userId)

    try {
        console.log("Getting hives user has access to...");

        var hivesResult
        switch (role) {
            case UserRoles.ADMINISTRATOR:
                hivesResult = await db.query.hives.findMany();
                break;
            default:
                const hiveAccess = await db.query.userHiveAccess.findMany({
                    where: eq(userHiveAccess.userId, userId)
                });

                hivesResult = await db.query.hives.findMany({
                    where: inArray(hives.id, hiveAccess.map(item => item.hiveId))
                });
                break;
        }

        return res.status(200).json(hivesResult)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

router.get(
    "/:id", 
    requireRole([UserRoles.ANY]), 
    async (
        req: Request<{ id: string }>, 
        res: Response
) => {
    console.log("# Get hive");
    const hiveId    = parseInt(req.params.id)
    const reqUserId = req.session.userId!
    const role      = await getSessionUserRole(reqUserId)

    try {
        console.log("Checking if user has access to hive...");
        var hasAccess = true

        if (role !== UserRoles.ADMINISTRATOR) {
            const accessQuery = await db.query.userHiveAccess.findFirst({
                where: and(
                    eq(userHiveAccess.userId, reqUserId), 
                    eq(userHiveAccess.hiveId, hiveId)
                )
            })
            hasAccess = Boolean(accessQuery)
        }
        console.log("Done! access: ", hasAccess);
        
        if (!hasAccess) {
            return res.status(403).json({ message: 'Access denied' })
        }

        const hive = await db.query.hives.findFirst({
            where: eq(hives.id, hiveId)
        })

        return res.status(200).json(hive)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

router.put('/:id', requireRole([UserRoles.ADMINISTRATOR, UserRoles.APIARY_MAINTAINER]), upload.single("image"), async (
    req: Request<{ id: string },{},{
        name:        string
        description: string
        location:    string
        type:        HiveType
        apiaryId:    number
    }>, 
    res: Response
) => {
    const hiveId = parseInt(req.params.id)
    console.log("# Update hive");
    const { name, description, location, type, apiaryId } = req.body
    const image = req.file
    
    try {
        await db.transaction(async (transaction) => {
            await withStatus("Updating hive", () =>
                transaction.update(hives)
                    .set({ 
                        name, 
                        description, 
                        location, 
                        type, 
                        apiaryId 
                    })
                    .where(eq(hives.id, hiveId))
            )

            if (image) {
                // insert image
                const url = await withStatus("Uploading image", async () => {
                    const imageKey = new PublicIdBuilder(req.session.userId!.toString()).Apiary(hiveId.toString()).getResource()
                    return await uploadImage(image, imageKey)
                })

                await withStatus("Assigning image url to hive...", () =>
                    transaction.update(hives)
                    .set({ imageUrl: url })
                    .where(eq(hives.id, hiveId))
                )
            }
        })

        const hive = await withStatus("Getting updated row", () => db.query.hives.findFirst({
            where: eq(hives.id, hiveId)
        }))

        return res.status(200).json( hive )
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
})

// creates hive
router.post(
    '/', 
    requireRole([UserRoles.ADMINISTRATOR, UserRoles.APIARY_MAINTAINER]), 
    upload.single("image"), 
    async (
        req: Request<{},{},{
            name:        string
            description: string
            type:        HiveType
            apiaryId:    number
        }>, 
        res: Response
) => {
    console.log("# Create hive");
    
    const { name, description, type, apiaryId } = req.body
    const image = req.file
    const { createCalendar, shareCalendar } = useCalendar()
    
    try {
        const [createdHive] = await withStatus("Creating hive", () => 
            db.insert(hives).values({
                name:        name,
                description: description,
                type:        type,
                userId:      req.session.userId,
                apiaryId:    apiaryId
            })
        )
        
        if (image) {
            // insert image
            const url = await withStatus("Uploading image", async () => {
                const imageKey = new PublicIdBuilder(req.session.userId!.toString()).Apiary(createdHive.insertId.toString()).getResource()
                return await uploadImage(image, imageKey)
            })

            await withStatus("Assigning image url to hive...", () =>
                db.update(hives)
                .set({ imageUrl: url })
                .where(eq(hives.id, createdHive.insertId))
            )
        }

        const calendarId = await createCalendar({
            name: `Hive ${createdHive.insertId}`,
            description: `Calendar for hive ${name}`
        })

        await withStatus("Assigning calendarId to hive...", () =>
            db.update(hives)
            .set({ calendarId: calendarId })
            .where(eq(hives.id, createdHive.insertId))
        )

        // users who have access to appiary or admin 
        const usersResult = await withStatus("Getting users with access to this apiary ", () =>
            db.query.users.findMany({
                columns: {
                    id: true,
                    email: true,
                    role: true,
                    googleRefreshToken: true
                },
                where: or(
                    eq(users.role, UserRoles.ADMINISTRATOR),
                    and(
                        inArray(
                            users.id, 
                            db.select({ id: userApiaryAccess.userId })
                                .from(userApiaryAccess)
                                .where(eq(userApiaryAccess.apiaryId, apiaryId))
                        ),
                        eq(users.role, UserRoles.APIARY_MAINTAINER)
                    )
                )   
            })
        )

        await withStatus("Giving users access to this hive...", () => 
            db.insert(userHiveAccess).values(
                usersResult.map((user) => ({
                    userId: user.id,
                    hiveId: createdHive.insertId
                }))
            )
        )

        await withStatus("Giving calendar access to each user", () => 
            Promise.all(usersResult.map(async (user) => 
                await shareCalendar({
                    userRefreshToken: user.googleRefreshToken!,
                    calendarId:       calendarId,
                    userEmail:        user.email,
                    role:             user.role
                }
        ))))
    
        const hive = await withStatus("Getting new row", () => db.query.hives.findFirst({
            where: eq(hives.id, createdHive.insertId)
        }))

        res.status(200).json(hive)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

// delete hive
router.delete(
    '/:id', 
    requireRole([UserRoles.ANY]), 
    async (
        req: Request<{ id: string },{},{},{}>, 
        res: Response
) => {
    console.log("# Delete hive");
    const hiveId = parseInt(req.params.id)

    try {
        await withStatus("Deleting hive", () => db.delete(hives).where(eq(hives.id, hiveId)))
        
        return res.status(204).json({ id: hiveId })
    } catch (error) {
        return res.status(500).send(error);
    }
})

export default router
