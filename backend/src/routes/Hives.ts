import { Router, type Request, type Response } from "express";
import { db } from "../config/Database";
import { HiveT } from "../TableColumnTitles";
import { col, getCurrentUTCDateString, isValidValue } from "../utils";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { uploadImage } from "../config/image_cloud/Cloudinary";
import { PublicIdBuilder } from "../config/image_cloud/PublicIdBuilder";
import { upload } from "../config/Multer";
import { requireRole } from "../Middleware";
import { Role, String_to_Role } from "../DatabaseEnums";
import { createHiveCalendar, createHiveEvent, getHiveEvents, shareHiveCalendarWithUser } from "../config/ServiceAcc";
import { getValidToken } from "../config/GoogleAuth";
import { redisClient } from "../config/RedisClient";

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

// returns all hives
router.get('/get', requireRole([Role.ANY]), async (
    req: Request<{},{},{}>, 
    res: Response
) => {
    console.log("# Get all hives");
    const role = String_to_Role(await redisClient.hGet(`user:${req.session.userId}`, 'role') ?? "")
    console.log("Role: ", role);
    var hives: RowDataPacket[]
    try {
        console.log("Getting hives you have access to...");
        switch (role) {
            case Role.ADMINISTRATOR:
                [hives] = await db.query<RowDataPacket[]>(hiveModelQuery)
                break;
            default:
                [hives] = await db.query<RowDataPacket[]>(hiveModelQuery + `
                    WHERE h.id IN (
                        SELECT hiveId 
                        FROM userHiveAccess 
                        WHERE userId = ?
                    )`,
                    [req.session.userId]
                )
                break;
        }
        console.log("Done!");

        console.log("Getting calendar events...");
        const hivesWithEvents = await Promise.all(
            hives.map(async (hive) => {
                // 1. Only fetch if there is a calendarId
                if (!hive.calendarId) {
                    return { ...hive, events: [] }; // Return hive with empty events prop
                }

                // 2. Fetch the data from Google
                const events = await getHiveEvents(hive.calendarId);
                console.table(events);
                

                // 3. Return a NEW object that has all original hive props 
                // PLUS the new 'events' property (prop3)
                return {
                    ...hive,       // prop1, prop2, etc.
                    events: events // prop3
                };
            })
        );
        console.log("Done!");

        
        res.status(200).json( hivesWithEvents )
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

router.post('/history/create', requireRole([Role.ANY]), async (
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
router.post('/create', requireRole([Role.ADMINISTRATOR, Role.APIARY_MAINTAINER]), upload.single("image"), async (req: Request<{},{},{
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


        console.log("Creating calendar...");
        const calendarId = await createHiveCalendar(createResult.insertId)
        await db.query<ResultSetHeader>(`
            UPDATE hives
            SET calendarId = ?
            WHERE id = ?`,
            [calendarId, createResult.insertId]
        )
        console.log("Done!");


        console.log("Getting all users who should have access to this hive...");
        var [users] = await db.query<RowDataPacket[]>(`
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
            return await db.query<ResultSetHeader>(`
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
router.post('/delete', requireRole([Role.ANY]), upload.none(), async (req: Request<{},{},{
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

type InspectionResponse = {
    id:            number;
    apiaryId:      number;
    apiaryName:    string
    userIdCreator: number
    userPicture:   string
    username:      string
    creationDate:  string
    forms:    {
        id:                           number;
        hiveId:                       number;
        isAbnormalBehavior:           boolean;
        isSwarming:                   boolean;
        needAdditionalFeeding:        boolean;
        isQueenAlive:                 boolean;
        isQueenLayingEggs:            boolean;
        isQueenLayingEggsIncorrectly: boolean;
        needMoreHoneyFrames:          boolean;
        needMoreBreedingFrames:       boolean;
        needMedicalAttention:         boolean;
        hasHiveDamage:                boolean;
        isTakingOutFrames:            boolean;
        abnormalBehaviorDescription:  string;
        medicalAttentionDescription:  string;
        hiveDamageDescription:        string;
        neededHoneyFrames:            number;
        neededBreedingFrames:         number;
        takenHoneyFrames:             number;
        takenBreedingFrames:          number;
    }[]
}

function getInspectionsQuery(where: string) {
    return `
        SELECT 
            hive_inspections.id,
            hive_inspections.apiaryId,
            apiaries.name AS apiaryName,
            hive_inspections.userIdCreator,
            users.username,
            users.image,
            hive_inspections.creationDate,

            COALESCE((
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id',                           hive_inspection_forms.id,
                        'isAbnormalBehavior',           hive_inspection_forms.isAbnormalBehavior,
                        'abnormalBehaviorDescription',  hive_inspection_forms.abnormalBehaviorDescription,
                        'isSwarming',                   hive_inspection_forms.isSwarming,
                        'needFeeding',                  hive_inspection_forms.needFeeding,
                        'isQueenAlive',                 hive_inspection_forms.isQueenAlive,
                        'isQueenLayingEggs',            hive_inspection_forms.isQueenLayingEggs,
                        'isQueenLayingEggsIncorrectly', hive_inspection_forms.isQueenLayingEggsIncorrectly,
                        'needMoreHoneyFrames',          hive_inspection_forms.needMoreHoneyFrames,
                        'needMoreHoneyFramesAmount',    hive_inspection_forms.needMoreHoneyFramesAmount,
                        'needMoreBreedingFrames',       hive_inspection_forms.needMoreBreedingFrames,
                        'needMoreBreedingFramesAmount', hive_inspection_forms.needMoreBreedingFramesAmount,
                        'needMedicalAttention',         hive_inspection_forms.needMedicalAttention,
                        'medicalAttentionDescription',  hive_inspection_forms.medicalAttentionDescription,
                        'hasHiveDamage',                hive_inspection_forms.hasHiveDamage,
                        'hiveDamageDescription',        hive_inspection_forms.hiveDamageDescription,
                        'isTakingFrames',               hive_inspection_forms.isTakingFrames,
                        'takenHoneyFrames',             hive_inspection_forms.takenHoneyFrames,
                        'takenBreedingFrames',          hive_inspection_forms.takenBreedingFrames,
                        'inspectionId',                 hive_inspection_forms.inspectionId,
                        'hiveId',                       hive_inspection_forms.hiveId,
                        'hiveName',                     hives.name
                    )
                )
                FROM hive_inspection_forms
                LEFT JOIN hives ON hive_inspection_forms.hiveId = hives.id
                WHERE hive_inspections.id = hive_inspection_forms.inspectionId
            ), JSON_ARRAY()) AS forms

        FROM hive_inspections
        LEFT JOIN users ON hive_inspections.userIdCreator = users.id
        LEFT JOIN apiaries ON hive_inspections.apiaryId = apiaries.id
        ${where}
    `
}

router.get(
    '/inspections/get', 
    requireRole([Role.ANY]), 
    async (
        req: Request, 
        res: Response<InspectionResponse[] | string>
) => {
    console.log("# Get Inspections");
    const page   = parseInt(req.query.page as string) || 1;
    const limit  = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit
    
    try {
        console.log(`Getting Limit: ${limit} Offset: ${offset} inspections...`);
        const [inspections] = await db.query<(RowDataPacket & InspectionResponse)[]>(
            getInspectionsQuery(`
                WHERE hive_inspections.userIdCreator = ?
                LIMIT ? OFFSET ?`
            ), 
            [
                req.session.userId,
                limit,
                offset
            ]
        )
        console.log("Done!");
        
        res.status(200).json(inspections);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

router.post(
    '/inspections/create', 
    requireRole([Role.ANY]), 
    async (
        req: Request<{},{},{
            apiaryId: number;
            forms:     {
                hiveId:                       number;
                isAbnormalBehavior:           boolean;
                isSwarming:                   boolean;
                needAdditionalFeeding:        boolean;
                isQueenAlive:                 boolean;
                isQueenLayingEggs:            boolean;
                isQueenLayingEggsIncorrectly: boolean;
                needMoreHoneyFrames:          boolean;
                needMoreBreedingFrames:       boolean;
                needMedicalAttention:         boolean;
                hasHiveDamage:                boolean;
                isTakingOutFrames:            boolean;
                abnormalBehaviorDescription:  string;
                medicalAttentionDescription:  string;
                hiveDamageDescription:        string;
                needMoreHoneyFramesAmount:    number;
                needMoreBreedingFramesAmount: number;
                takenHoneyFrames:             number;
                takenBreedingFrames:          number;
            }[]
        }>, 
        res: Response
) => {
    console.log("# Create Inspection");
    const { apiaryId, forms } = req.body

    // checking manditory fields
    console.log("Checking manditory fields...");
    if (forms.some(item => !isValidValue(item.hiveId)) || !isValidValue(apiaryId)) {
        console.log("Hive ID and Apiary ID are required!");
        return res.status(400).send("Hive ID and Apiary ID are required!");
    }
    console.log("Done!");


    console.log("Getting db connection..");
    const connection = await db.getConnection();
    await connection.beginTransaction();
    console.log("Done!");
    
    try {
        const [inspectionResult] = await connection.query<ResultSetHeader>(`
            INSERT INTO hive_inspections (apiaryId, userIdCreator) VALUES ?`, 
            [[[
                apiaryId,
                req.session.userId
            ]]]
        )
        // inserting new entries (transaction lets us rollback db changes on error)
        console.log("Inserting inspection forms...");
        await Promise.all(
            forms.map(row =>
                connection.query<ResultSetHeader>(`
                    INSERT INTO hive_inspection_forms 
                    (
                        hiveId,
                        isAbnormalBehavior,
                        isSwarming,
                        needFeeding,
                        isQueenAlive,
                        isQueenLayingEggs,
                        isQueenLayingEggsIncorrectly,
                        needMoreHoneyFrames,
                        needMoreBreedingFrames,
                        needMedicalAttention,
                        hasHiveDamage,
                        isTakingFrames,
                        abnormalBehaviorDescription,
                        medicalAttentionDescription,
                        hiveDamageDescription,
                        needMoreHoneyFramesAmount,
                        needMoreBreedingFramesAmount,
                        takenHoneyFrames,
                        takenBreedingFrames,
                        inspectionId
                    ) VALUES ?`,
                    [[[
                        row.hiveId,
                        row.isAbnormalBehavior,
                        row.isSwarming,
                        row.needAdditionalFeeding,
                        row.isQueenAlive,
                        row.isQueenLayingEggs,
                        row.isQueenLayingEggsIncorrectly,
                        row.needMoreHoneyFrames,
                        row.needMoreBreedingFrames,
                        row.needMedicalAttention,
                        row.hasHiveDamage,
                        row.isTakingOutFrames,
                        row.abnormalBehaviorDescription,
                        row.medicalAttentionDescription,
                        row.hiveDamageDescription,
                        row.needMoreHoneyFramesAmount,
                        row.needMoreBreedingFramesAmount,
                        row.takenHoneyFrames,
                        row.takenBreedingFrames,
                        inspectionResult.insertId
                    ]]]
                )
            )
        );

        await connection.commit();
        console.log("Done!");

        console.log(`Getting inspection...`);
        const [[inspection]] = await db.query<(RowDataPacket & InspectionResponse)[]>(
            getInspectionsQuery(`
                WHERE hive_inspections.id = ?`
            ), 
            [
                inspectionResult.insertId,
            ]
        )
        console.log("Done!");
        
        res.status(200).json(inspection);
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).send('Server error');
    } finally {
        connection.release(); // always release back to pool
    }
});

export default router
