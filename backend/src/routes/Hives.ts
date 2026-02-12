import { Router, type Request, type Response } from "express";
import type { IUserIdentification } from "../Enums";
import { db } from "../config/Database";
import { HiveT } from "../TableColumnTitles";
import { col, getCurrentUTCDateString } from "../utils";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { uploadImage } from "../config/image_cloud/Cloudinary";
import { PublicIdBuilder } from "../config/image_cloud/PublicIdBuilder";
import { upload } from "../config/Multer";
import { requireRole } from "../Middleware";
import { Role } from "../DatabaseEnums";

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

// returns all hives
router.get('/get', requireRole(Role.ANY), async (
    req: Request<{},{},{}>, 
    res: Response
) => {
    console.log("# Get all hives");
    
    try {
        console.log("Getting hives...");
        const [hiveGetResult] = await db.query(hiveModelQuery)
        console.log("Done!");
        res.status(200).json( hiveGetResult )
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})


router.post('/history/create', requireRole(Role.ANY), async (
    req: Request<{},{},{
        hiveid:    number
        text:      string
        creatorId: number
    }>, 
    res: Response
) => {
    console.log("# Create hive history entry");
    const { hiveid, creatorId, text } = req.body
    const creationDate = getCurrentUTCDateString()
    
    try {
        console.log("Creating history entry...");
        const [hiveHistoryInsertResult] = await db.query<ResultSetHeader>(`
            INSERT INTO hives
            VALUES (
                text = ?,
                userId = ?,
                hiveId = ?,
                creationDate = ?
            )`, 
            [text, creatorId, hiveid, creationDate]
        )
        console.log("Done!");

        console.log("Getting new entry data...");
        const [[hiveHistoryGetResult]] = await db.query<RowDataPacket[]>(`
            SELECT * 
            FROM hiveHistory 
            WHERE id = ?
            LIMIT 1`,
            [hiveHistoryInsertResult.insertId]
        )
        console.log("Done!");
        
        res.status(200).json( hiveHistoryGetResult )
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

router.post('/update', requireRole(Role.ANY), upload.single("image"), async (
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
        const [hiveUpdateReslut] = await db.query<ResultSetHeader>(`
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
            await db.query<ResultSetHeader>(`
                UPDATE hives
                SET image = ?
                WHERE id = ?`,
                [url, hiveUpdateReslut.insertId]
            )
            console.log("Done!");
        }

        console.log("Getting new update info...");
        const [[hiveGetResult]] = await db.query<RowDataPacket[]>(hiveModelQuery + ` WHERE h.id = ?`, [id])
        console.log("Done!");
        
        res.status(200).json( hiveGetResult )
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

// creates hive
router.post('/create', requireRole(Role.ANY), upload.single("image"), async (req: Request<{},{},{
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
        const [createResult] = await db.query<ResultSetHeader>(`
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
            await db.query<ResultSetHeader>(`
                UPDATE hives
                SET image = ?
                WHERE id = ?`,
                [url, createResult.insertId]
            )
            console.log("Done!");
        }

        console.log("Getting new entry data...");
        const [[hiveGetResult]] = await db.query<RowDataPacket[]>(
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
router.post('/delete', requireRole(Role.ANY), upload.none(), async (req: Request<{},{},{
    id: string
}>, res: Response) => {
    console.log("# Delete hive");
    const { id } = req.body

    try {
        console.log("Deleting hive...");
        await db.query(`
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

// returns hive overview
router.post('/overview', async (req: Request<{},{},{
    identification: IUserIdentification,
    hiveId: string
}>, res: Response) => {
    const { identification, hiveId } = req.body
    
    // missing credentials
    if (!identification || !hiveId) 
        return res.status(401).send('incorrect credentials!') 

    const [[overviewResults]] = await db.query<RowDataPacket[]>(`
        SELECT 
            ${HiveT.id} AS h_id, 
            ${HiveT.name} AS h_name,
            ${HiveT.imagePath} AS h_image,
            ${HiveT.description} AS h_description,
            ${HiveT.location} AS h_location,
            ${HiveT.type} AS h_type,
            ${HiveT.frames} AS h_frames,
            ${HiveT.weight} AS h_height,

            n.id AS n_id,
            CONCAT(u.name, ' ', u.surname) AS n_author,
            n.title AS n_title,
            n.content AS n_content,
            n.creation_date AS n_creation_date,
            n.color AS n_color,

            q.id AS q_id,
            q.name AS q_name,
            q.image AS q_image,
            q.registration_date AS q_registration_date,
            qs.name_latin AS q_specie
        FROM ${HiveT.tableName}
        LEFT JOIN note_place__hive AS note_place ON note_place.hive_id = ${HiveT.id}
        LEFT JOIN notes AS n ON n.id = note_place.note_id
        LEFT JOIN users AS u ON u.id = n.user_id 
        LEFT JOIN queen_bees AS q ON q.id = ${HiveT.queenBeeId}
        LEFT JOIN queen_bee_species AS qs ON q.specie_id = qs.id
        WHERE ${HiveT.userId} = ? AND ${HiveT.id} = ?`, 
        [identification.id, hiveId]
    )
})

export default router
