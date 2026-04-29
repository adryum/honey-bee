import { Router, type Request, type Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { getCurrentUTCDateString, isNumber, isValidValue, withStatus } from "../utils";
import { upload } from "../config/Multer";
import { db, pool } from "../config/Database";
import { requireRole } from "../Middleware";
import { NoteTypes, UserRoles } from "../DatabaseEnums";
import { eq } from "drizzle-orm";
import { hiveNotes } from "../db/schema";

const router = Router()

router.get(
    '/hive/:hiveId', 
    requireRole([UserRoles.ANY]),
    async (
        req: Request<{ hiveId: string }>, 
        res: Response
) => {
    console.log("# Get hive notes");
    const hiveId = Number.parseInt(req.params.hiveId)

    try {
        const notes = await withStatus("Getting notes", () => db.query.hiveNotes.findMany({
            where: eq(hiveNotes.hiveId, hiveId)
        }))
      
        return res.status(200).json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})
 
router.post(
    '/', 
    requireRole([UserRoles.ANY]), 
    async (req: Request<{},{},{
        title:   string
        content: string
        type:    NoteTypes
        hiveId:  number
    }>, res: Response
) => {
    console.log("# Create note");
    let { title, content, type, hiveId } = req.body

    if (!title || !type || !isValidValue(hiveId)) 
        return res.status(401).send('incorrect credentials!')

    try {
        const [noteInsertResult] = await withStatus("Inserting note", () => db.insert(hiveNotes).values({
            title:   title,
            content: content,
            type:    type,
            hiveId:  hiveId,
            userId:  req.session.userId
        })) 

        const noteGetResult = await withStatus("Getting insterted note", () => 
            db.query.hiveNotes.findFirst({
                where: eq(hiveNotes.id, noteInsertResult.insertId)
            })
        )
        
        res.status(200).json(noteGetResult)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

router.delete(
    '/:id', 
    requireRole([UserRoles.ANY]), 
    async (
        req: Request<{ id: string },{},{}>, 
        res: Response
) => {
    console.log("# Delete hive note");
    const id = Number.parseInt(req.params.id)

    if (!isValidValue(id)) 
        return res.status(401).send('incorrect credentials!')

    try {
        await withStatus("Deleting note", () => db.delete(hiveNotes).where(eq(hiveNotes.id, id)))
        
        res.status(200).json({ id: id })
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

export default router
