import { Router, type Request, type Response } from "express";
import { db, pool } from "../config/Database";
import type { ResultSetHeader } from "mysql2";
import { uploadImage } from "../config/image_cloud/Cloudinary";
import { PublicIdBuilder } from "../config/image_cloud/PublicIdBuilder";
import { upload } from "../config/Multer";
import { attachCalendarClient, requireRole } from "../Middleware";
import { HiveType, Role } from "../DatabaseEnums";
import { getSessionUserRole } from "../config/RedisClient";
import { and, eq, inArray, or } from "drizzle-orm";
import { hives, userApiaryAccess, userHiveAccess, users } from "../db/schema";
import { useCalendar } from "../config/calendar/GoogleCalendar";
import { withStatus } from "../utils";

const router = Router()

router.get(
    "/",
    requireRole([Role.ANY]),
    async (
        req: Request, 
        res: Response
) => {
    console.log("# Get all hives");
    const userId = req.session.userId!
    const role   = await getSessionUserRole(userId)

    try {
        console.log("Getting hives user has access to...");

        var hivesResult
        switch (role) {
            case Role.ADMINISTRATOR:
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
    requireRole([Role.ANY]), 
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

        if (role !== Role.ADMINISTRATOR) {
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

router.post('/update', requireRole([Role.ADMINISTRATOR, Role.APIARY_MAINTAINER]), upload.single("image"), async (
    req: Request<{},{},{
        id:          number
        name:        string
        description: string
        location:    string
        type:        string
        apiaryId:    number
    }>, 
    res: Response
) => {
    console.log("# Update hive");
    const { id, name, description, location, type, apiaryId } = req.body
    const image = req.file
    
    try {
        console.log("Updating hive...");
        const [hiveUpdateReslut] = await pool.query<ResultSetHeader>(`
            UPDATE hives
            SET 
                name = ?,
                description = ?,
                location = ?,
                type = ?,
                apiaryId = ?
            WHERE id = ?`, 
            [name, description, location, type, apiaryId, id]
        )
        console.log("Done!");

        // insert image
        if (image) {
            console.log("Uplading image...");
            const imageKey = new PublicIdBuilder(req.session.userId!.toString()).Apiary(hiveUpdateReslut.insertId.toString()).getResource()

            const url = await uploadImage(image, imageKey)
            console.log(url);
            console.log("Done!");

            console.log("Updating hive entry with image...");
            await pool.query<ResultSetHeader>(`
                UPDATE hives
                SET image = ?
                WHERE id = ?`,
                [url, hiveUpdateReslut.insertId]
            )
            console.log("Done!");
        }

        const hive = await withStatus("Getting new row", () => db.query.hives.findFirst({
            where: eq(hives.id, id)
        }))
        
        res.status(200).json( hive )
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

// creates hive
router.post(
    '/create', 
    requireRole([Role.ADMINISTRATOR, Role.APIARY_MAINTAINER]), 
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
                .set({ image: url })
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
                    eq(users.role, Role.ADMINISTRATOR),
                    and(
                        inArray(
                            users.id, 
                            db.select({ id: userApiaryAccess.userId })
                                .from(userApiaryAccess)
                                .where(eq(userApiaryAccess.apiaryId, apiaryId))
                        ),
                        eq(users.role, Role.APIARY_MAINTAINER)
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
router.post('/delete', requireRole([Role.ANY]), upload.none(), async (req: Request<{},{},{
    id: string
}>, res: Response) => {
    console.log("# Delete hive");
    const { id } = req.body

    try {
        console.log("Deleting hive...");
        await pool.query(`
            DELETE FROM hives 
            WHERE id = ?`, 
            [id]
        )
        console.log("Done!");
        
        res.status(204).json(id)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

router.post('/calendar/create', requireRole([Role.ANY]), attachCalendarClient, async (req: Request<{},{},{
    hiveId:       number
    calendarId:   string
    start:        string
    end:          string
    title:        string
    description:  string
    creatorEmail: string
}>, res: Response) => {
    try {
        console.log("# Create calendar entry");
        const { calendarId, start, end, title, description, creatorEmail, hiveId } = req.body

        if (!calendarId) return res.status(400).send("Invalid credentials!")

        const { createEvent } = useCalendar()
        const result = await createEvent(req.calendarClient!, {
            calendarId:  calendarId,
            title:       title,
            description: description,
            start:       new Date(start),
            end:         new Date(end)
        })

        res.status(200).json({ 
            ...result, 
            hiveId: hiveId
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

export default router
