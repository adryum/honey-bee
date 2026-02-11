import { Router, type Request, type Response } from "express";
import { type IUserIdentification } from "../Enums";
import { NoteT } from "../TableColumnTitles";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { getCurrentUTCDateString, isNumber, isValidValue } from "../utils";
import { upload } from "../config/Multer";
import { db } from "../config/Database";
import { requireRole } from "../Middleware";
import { Role } from "../DatabaseEnums";

const router = Router()
const getNotesQuery = `
    SELECT 
        id,
        title,
        content,
        creationDate,
        type,
        userId,
        hiveId
    FROM notes
    `
 
router.get('/get', requireRole(Role.ANY), upload.none(), async (
    req: Request<{},{}, {}>, 
    res: Response
) => {
    console.log("# Get notes");
    try {
        console.log("Getting notes...");
        const [notes] = await db.query<RowDataPacket[]>(
            getNotesQuery,
        )
        console.log("Done!");
        return res.status(200).json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})
 
router.post('/create', requireRole(Role.ANY), upload.none(), async (req: Request<{},{},{
    title: string
    content: string
    type: string
    hiveId: number
}>, res: Response) => {
    console.log("# Create note");
    let { title, content, type, hiveId } = req.body

    if (!title || !type || !isValidValue(hiveId)) 
        return res.status(401).send('incorrect credentials!')

    const currentTime = getCurrentUTCDateString();

    try {
        console.log("Inserting note...");
        const [noteInsertResult] = await db.query<ResultSetHeader>(`
            INSERT INTO notes
            (title, content, creationDate, type, userId, hiveId) 
            VALUES (?,?,?,?,?, ?)`,
            [title, content, currentTime, type, req.session.userId, hiveId]
        )
        console.log("Done!");
        
        console.log("Getting insterted data...");
        const [[getNotesResult]] = await db.query<RowDataPacket[]>(
            getNotesQuery + " WHERE id = ?",
            [noteInsertResult.insertId]
        )
        console.log("Done!");
        
        res.status(200).json(getNotesResult)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

router.post('/delete', requireRole(Role.ANY), upload.none(), async (req: Request<{},{},{
    id: number
}>, res: Response) => {
    console.log("# Delete note");
    let { id } = req.body

    if (!isNumber(id)) 
        return res.status(401).send('incorrect credentials!')

    try {
        console.log("Deleting entry...");
        
        await db.query<ResultSetHeader>(`
            DELETE FROM ${NoteT.tableName}
            WHERE id = ?`,
            [id]
        )
        console.log("Done!");

        res.status(200).json({ id: id })
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
