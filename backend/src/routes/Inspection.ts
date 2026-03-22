import { Router, type Request, type Response } from "express";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { pool } from "../config/Database";
import { Role } from "../DatabaseEnums";
import { requireRole } from "../Middleware";
import { isValidValue } from "../utils";

const router = Router()

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
    '/', 
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
        const [inspections] = await pool.query<(RowDataPacket & InspectionResponse)[]>(
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
    '/create', 
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
    const connection = await pool.getConnection();
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
        const [[inspection]] = await pool.query<(RowDataPacket & InspectionResponse)[]>(
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
