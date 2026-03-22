import { Router, type Request, type Response } from "express";
import { db, pool } from "../config/Database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { uploadImage } from "../config/image_cloud/Cloudinary";
import { PublicIdBuilder } from "../config/image_cloud/PublicIdBuilder";
import { upload } from "../config/Multer";
import { requireRole } from "../Middleware";
import { Role, String_to_Role } from "../DatabaseEnums";
import { getSessionUserRole, redisClient } from "../config/RedisClient";
import { and, eq, inArray } from "drizzle-orm";
import { userhiveaccess, hives, userapiaryaccess, apiaries } from "../db/schema";

const getApiaryQuery = (where: string) => `
SELECT 
    a.id, 
    a.name,
    a.location,
    a.description,
    a.image
FROM apiaries as a
`

const router = Router()

router.get('/', requireRole([Role.ANY]), async (
    req: Request<{},{},{}>, 
    res: Response
) => {
    console.log("# Get apiaries");
    const userId = req.session.userId!
    const role   = await getSessionUserRole(userId)

    try {
        console.log("Getting apiaries you have access to...");

        var apiariesResult
        switch (role) {
            case Role.ADMINISTRATOR:
                apiariesResult = await db.query.apiaries.findMany(); break;
            default:
                const apiaryAccess = await db.query.userapiaryaccess.findMany({
                    where: eq(userapiaryaccess.userId, userId)
                })

                apiariesResult = await db.query.apiaries.findMany({
                    where: inArray(apiaries.id, apiaryAccess.map(item => item.apiaryId))
                })
                break;
        }
        console.log("Done!");

        res.status(200).json(apiariesResult)
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
    console.log("# Get apiary");
    const apiaryId  = parseInt(req.params.id)
    const reqUserId = req.session.userId!
    const role      = await getSessionUserRole(reqUserId)

    try {
        console.log("Checking if user has access to apiary...");
        var hasAccess = true

        if (role !== Role.ADMINISTRATOR) {
            const accessQuery = await db.query.userapiaryaccess.findFirst({
                where: and(
                    eq(userapiaryaccess.userId, reqUserId), 
                    eq(userapiaryaccess.apiaryId, apiaryId)
                )
            })
            hasAccess = Boolean(accessQuery)
        }
        console.log("Done! access: ", hasAccess);
        
        if (!hasAccess) {
            return res.status(403).json({ message: 'Access denied' })
        }

        const apiary = await db.query.apiaries.findFirst({
            where: eq(apiaries.id, apiaryId)
        })

        return res.status(200).json(apiary)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

router.get(
    "/:id/hives",
    requireRole([Role.ANY]),
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
            case Role.ADMINISTRATOR:
                hivesResult = await db.query.hives.findMany({
                    where: eq(hives.apiaryId, apiaryId)
                });
                break;
            default:
                const hiveAccess = await db.query.userhiveaccess.findMany({
                    where: eq(userhiveaccess.userId, userId)
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

// creates apiary
router.post('/create', upload.single("image"), async (req: Request<{},{},{
    name: string
    location: string
    description: string
}>, res: Response) => {
    console.log("# Create apiary");
    const { name, location, description } = req.body
    const file = req.file;

    // missing credentials
    if (!name) 
        return res.status(400).send('incorrect information!') 

    try {
        console.log("Inserting apirary...");
        const [result] = await pool.query<ResultSetHeader>(`
            INSERT INTO apiaries (
            name, 
            location, 
            description, 
            userId
            )
            VALUES(?, ?, ?, ?)`, 
            [name, location, description, req.session.userId]
        )
        console.log("Done!");
    
        if (file) {
            console.log("Uploading image to cloud...");
            const imageKey = new PublicIdBuilder(req.session.userId!.toString()).Apiary(result.insertId.toString()).getResource()

            const url = await uploadImage(file, imageKey)
            console.log(url);
            console.log("Done!");

            console.log("Updating entry with image...");
            
            await pool.query<ResultSetHeader>(`
                UPDATE apiaries
                SET image = ?
                WHERE id = ?`,
                [url, result.insertId]
            )
            console.log("Done!");
        }

        console.log("Getting new entry data...");
        var [[getNewApiary]] = await pool.query<RowDataPacket[]>(`
            ${getApiaryQuery("")}
            WHERE a.id = ? 
            GROUP BY a.id
            LIMIT 1
            `,
            [result.insertId]
        )
        
        res.status(201).json(getNewApiary)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

export default router
