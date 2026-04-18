import { Router, type Request, type Response } from "express";
import { db, pool } from "../config/Database";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { uploadImage } from "../config/image_cloud/Cloudinary";
import { PublicIdBuilder } from "../config/image_cloud/PublicIdBuilder";
import { upload } from "../config/Multer";
import { attachCalendarClient, requireRole } from "../Middleware";
import { HiveType, Role, String_to_Role } from "../DatabaseEnums";
import { getSessionUserRole } from "../config/RedisClient";
import { and, eq, inArray, isNotNull, or } from "drizzle-orm";
import { hives, userapiaryaccess, userhiveaccess, users } from "../db/schema";
import { getAdminCalendarClient, useCalendar } from "../config/calendar/GoogleCalendar";
import { withStatus } from "../utils";

const router = Router()
const hiveModelQuery =`
    SELECT 
        h.id, 
        h.name,
        h.description,
        h.image,
        h.location,
        h.type,
        h.apiaryId,
        h.userId,
        h.creationDate,
        h.calendarId,
        u.id as creatorId,
        u.username as creatorName,
        u.image as creatorImage,

        COALESCE(
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', hh.id,
                        'text', hh.text,
                        'userId', hh.userId,
                        'username', uh.username,
                        'userImage', uh.image,
                        'creationDate', hh.creationDate
                    )
                )
                FROM hiveHistory hh
                LEFT JOIN users uh ON hh.userId = uh.id
                WHERE hh.hiveId = h.id
            ),
            JSON_ARRAY()
        ) AS history

    FROM hives as h
    LEFT JOIN users AS u ON h.userId = u.id`

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
                const hiveAccess = await db.query.userhiveaccess.findMany({
                    where: eq(userhiveaccess.userId, userId)
                });

                hivesResult = await db.query.hives.findMany({
                    where: inArray(hives.id, hiveAccess.map(item => item.hiveId))
                });
                break;
        }
        console.log("Done!");

        // console.log("Getting calendar events...");
        // const hivesWithEvents = await Promise.all(
        //     hives.map(async (hive) => {
        //         // 1. Only fetch if there is a calendarId
        //         if (!hive.calendarId) {
        //             return { ...hive, events: [] }; // Return hive with empty events prop
        //         }

        //         // 2. Fetch the data from Google
        //         const events = await getHiveEvents(hive.calendarId);
        //         console.table(events);
                

        //         // 3. Return a NEW object that has all original hive props 
        //         // PLUS the new 'events' property (prop3)
        //         return {
        //             ...hive,       // prop1, prop2, etc.
        //             events: events // prop3
        //         };
        //     })
        // );
        // console.log("Done!");

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
            const accessQuery = await db.query.userhiveaccess.findFirst({
                where: and(
                    eq(userhiveaccess.userId, reqUserId), 
                    eq(userhiveaccess.hiveId, hiveId)
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

        console.log("Getting new update info...");
        const [[hiveGetResult]] = await pool.query<RowDataPacket[]>(hiveModelQuery + ` WHERE h.id = ?`, [id])
        console.log("Done!");
        
        res.status(200).json( hiveGetResult )
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
        
        // insert image
        if (image) {
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
                            db.select({ id: userapiaryaccess.userId })
                                .from(userapiaryaccess)
                                .where(eq(userapiaryaccess.apiaryId, apiaryId))
                        ),
                        eq(users.role, Role.APIARY_MAINTAINER)
                    )
                )   
            })
        )

        await withStatus("Giving users access to this hive...", () => 
            db.insert(userhiveaccess).values(
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
    
        console.log("Getting new entry data...");
        const [[hiveGetResult]] = await pool.query<RowDataPacket[]>(
            hiveModelQuery + `
            WHERE h.id = ?
            LIMIT 1`, 
            [createdHive.insertId]
        )
        console.log("Done!");
        res.status(200).json(hiveGetResult)
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

        if (!calendarId) res.status(400).send("Invalid credentials!")

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
