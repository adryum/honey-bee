import { Router, type Request, type Response } from "express";
import { db, pool } from "../config/Database";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { uploadImage } from "../config/image_cloud/Cloudinary";
import { PublicIdBuilder } from "../config/image_cloud/PublicIdBuilder";
import { upload } from "../config/Multer";
import { requireRole } from "../Middleware";
import { Role, String_to_Role } from "../DatabaseEnums";
import { createHiveCalendar, createHiveEvent, shareHiveCalendarWithUser } from "../config/ServiceAcc";
import { getValidToken } from "../config/GoogleAuth";
import { getSessionUserRole } from "../config/RedisClient";
import { and, eq, inArray } from "drizzle-orm";
import { hives, userhiveaccess } from "../db/schema";

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
            type:        string
            apiaryId:    number
        }>, 
        res: Response
) => {
    console.log("# Create hive");
    
    const { name, description, type, apiaryId } = req.body
    const image = req.file
    
    try {
        console.log("Creating hive...");
        const [createResult] = await pool.query<ResultSetHeader>(`
            INSERT INTO hives (
                name, 
                description, 
                type, 
                userId,
                apiaryId
            )
            VALUES(?, ?, ?, ?, ?)`, 
            [name, description, type, req.session.userId, apiaryId]
        )
        console.log("Done!");
        

        // insert image
        if (image) {
            console.log("Uplading image...");
            const imageKey = new PublicIdBuilder(req.session.userId!.toString()).Apiary(createResult.insertId.toString()).getResource()

            const url = await uploadImage(image, imageKey)
            console.log(url);
            console.log("Done!");

            console.log("Updating hive entry with image...");
            await pool.query<ResultSetHeader>(`
                UPDATE hives
                SET image = ?
                WHERE id = ?`,
                [url, createResult.insertId]
            )
            console.log("Done!");
        }


        console.log("Creating calendar...");
        const calendarId = await createHiveCalendar(createResult.insertId)
        await pool.query<ResultSetHeader>(`
            UPDATE hives
            SET calendarId = ?
            WHERE id = ?`,
            [calendarId, createResult.insertId]
        )
        console.log("Done!");


        console.log("Getting all users who should have access to this hive...");
        var [users] = await pool.query<RowDataPacket[]>(`
            SELECT u.id, u.email, u.role
            FROM users AS u
            LEFT JOIN userApiaryAccess AS uaa ON u.id = uaa.userId AND uaa.apiaryId = ?
            WHERE (uaa.apiaryId IS NOT NULL AND u.role = "${Role.APIARY_MAINTAINER}")
                OR u.role = "${Role.ADMINISTRATOR}"`,
            [apiaryId]
        )
        const userArray = users.map(user => ({ 
            id: user.id,
            email: user.email ,
            role: String_to_Role(user.role)
        }))
        console.log("Done!");


        console.log("Giving user access to this hive...");
        await Promise.all(userArray.map(async (user) => {
            return await pool.query<ResultSetHeader>(`
                INSERT INTO userhiveaccess (userId, hiveId)
                VALUES(?,?)`,
                [user.id, createResult.insertId]
            );
        }))
        console.log("Done!");
        

        console.log("Giving calendar access to each user...");
        await Promise.all(userArray.map(async (user) => {
            return await shareHiveCalendarWithUser(
                calendarId,
                user.email,
                user.role
            ) 
        }))
        console.log("Done!");
    

        console.log("Getting new entry data...");
        const [[hiveGetResult]] = await pool.query<RowDataPacket[]>(
            hiveModelQuery + `
            WHERE h.id = ?
            LIMIT 1`, 
            [createResult.insertId]
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

router.post('/calendar/create', requireRole([Role.ANY]), async (req: Request<{},{},{
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

        console.log("Creating...");
        const token = await getValidToken(req.session.userId!, req.session)
        const result = await createHiveEvent(
            {
                calendarId: calendarId,
                start: start,
                end: end,
                title: title,
                description: description,
                creatorEmail: creatorEmail
            },
            token
        )
        console.log("Done!");

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
