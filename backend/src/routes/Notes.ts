import { Router, type Request, type Response } from "express";
import { type IUserIdentification } from "../Enums";
import { NoteT } from "../TableColumnTitles";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { getCurrentUTCDateString, isNumber } from "../utils";
import { upload } from "../config/Multer";
import { db } from "../config/Database";

const router = Router()
const getNotesQuery = `
    SELECT 
        *,
        (
            SELECT COALESCE(
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', p.id,
                    )
                ),
                JSON_ARRAY()
            )
            FROM note_place__hive AS hive
            LEFT JOIN notes AS n ON hive.note_id = n.id
        ) as hives
    FROM ${NoteT.tableName}
    `
 
router.post('/', upload.none(), async (req: Request<{},{}, {
    identification: IUserIdentification
    hiveId: number
}>, res: Response) => {
    const { identification, hiveId } = req.body

    if (!identification || !isNumber(hiveId))
        return res.status(401).send('incorrect credentials!') 
        
    try {
        const [notes] = await db.query<RowDataPacket[]>(
            getNotesQuery + ` WHERE ${NoteT.userId} = ?`, 
            [identification.id]
        )
        console.log(notes);
        return res.status(200).json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})
 
router.post('/create', upload.none(), async (req: Request<{},{},{
    identification: IUserIdentification
    title: string
    content: string
    type: string

    hiveIds: number[]
    queenIds: number[] 
    apiaryIds: number[] 
    inventoryIds: number[] 
}>, res: Response) => {
    let { identification, title, content, type, hiveIds, queenIds, apiaryIds, inventoryIds } = req.body

    if (!identification.id || !title || !content || !type) 
        return res.status(401).send('incorrect credentials!')

    const currentTime = getCurrentUTCDateString();

    try {
        const [noteInsertResult] = await db.query<ResultSetHeader>(`
            INSERT INTO ${NoteT.tableName}
            (${NoteT.title},${NoteT.content},${NoteT.creationDate},${NoteT.type},${NoteT.userId}) 
            VALUES (?,?,?,?,?,?)`,
            [title, content, currentTime, type, identification.id]
        )

        const insertHivesResult = await insertHives(noteInsertResult.insertId, hiveIds)
        
        const [[getNotesResult]] = await db.query<RowDataPacket[]>(
            getNotesQuery + " WHERE id = ?",
            [noteInsertResult.insertId]
        )
        
        console.log(getNotesResult);
        res.status(200).json(getNotesResult)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

router.post('/delete', upload.none(), async (req: Request<{},{},{
    identification: IUserIdentification
    id: number
}>, res: Response) => {
    let { identification, id } = req.body

    if (!identification.id || !isNumber(id)) 
        return res.status(401).send('incorrect credentials!')

    try {
        const [noteDeleteResult] = await db.query<ResultSetHeader>(`
            DELETE FROM ${NoteT.tableName}
            WHERE id = ? AND user_id = ?`,
            [id, identification.id]
        )

        res.status(200).json(id)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

router.post('/update', upload.none(), async (req: Request<{},{},{
    identification: IUserIdentification
    id: number
    title: string
    content: string
    type: string

    removeHiveIds: number[]
    removeQueenIds: number[] 
    removeApiaryIds: number[] 
    removeInventoryIds: number[]
    addHiveIds: number[]
    addQueenIds: number[] 
    addApiaryIds: number[] 
    addInventoryIds: number[] 
}>, res: Response) => {
    const { 
        identification,
        id,
        title, 
        content, 
        type,
        removeHiveIds,
        removeApiaryIds,
        removeInventoryIds,
        removeQueenIds,
        addApiaryIds,
        addHiveIds,
        addInventoryIds,
        addQueenIds
    } = req.body

    if (!identification.id || !title || !content || !type) 
        return res.status(401).send('incorrect credentials!')

    try {
        const [noteUpdateResult] = await db.query<ResultSetHeader>(`
            UPDATE ${NoteT.tableName}
            SET 
            ${NoteT.title} = ?,
            ${NoteT.content} = ?,
            ${NoteT.type} = ?,
            ) 
            WHERE id = ? AND user_id = ?`,
            [title, content, type, id, identification.id]
        )

        const insertHivesResult = await insertHives(id, addHiveIds)

        const removeHivesResult = await removeHives(id, removeHiveIds)

        const [[getNotesResult]] = await db.query<RowDataPacket[]>(
            getNotesQuery + " WHERE id = ?",
            [id]
        )
        
        console.log(getNotesResult);
        res.status(200).json(getNotesResult)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

async function insertHives(noteId: number, hiveIds: number[]): Promise<ResultSetHeader | undefined> {
    var notePlaceHiveInsertResult: ResultSetHeader | undefined = undefined;
    if (hiveIds.length > 0) {
        const values = hiveIds.map(hiveId => [noteId, hiveId]);
        [notePlaceHiveInsertResult] = await db.query<ResultSetHeader>(`
            UPDATE INTO note_place__hive
            (note_id, hive_id) 
            VALUES ?`,
            [values]
        )
    }
    return notePlaceHiveInsertResult
}

async function removeHives(noteId: number, hiveIds: number[]): Promise<ResultSetHeader | undefined> {
    var notePlaceHiveRemoveResult: ResultSetHeader | undefined = undefined;
    if (hiveIds.length > 0) {;
        [notePlaceHiveRemoveResult] = await db.query<ResultSetHeader>(`
            DELETE FROM note_place__hive
            WHERE note_id = ? AND hive_id IN (?)`,
            [noteId, hiveIds]
        )
    }
    return notePlaceHiveRemoveResult
}

export default router
