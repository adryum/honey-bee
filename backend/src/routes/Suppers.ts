import { Router, type Request, type Response } from "express";
import { type IUserIdentification } from "../Enums";
import { NoteT } from "../TableColumnTitles";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { getCurrentUTCDateString, isNumber } from "../utils";
import { upload } from "../config/Multer";
import { db } from "../config/Database";

const router = Router()
const getSuppersQuery = `
    SELECT 
        *
    FROM suppers
    `
 
router.post('/', upload.none(), async (req: Request<{},{}, {
    identification: IUserIdentification
    hiveId: number
}>, res: Response) => {
    const { identification, hiveId } = req.body

    if (!identification || !isNumber(hiveId))
        return res.status(401).send('incorrect credentials!') 
        
    try {
        const [suppers] = await db.query<RowDataPacket[]>(
            getSuppersQuery + ` WHERE hive_id = ? && user_id = ?`, 
            [hiveId, identification.id]
        )
        console.log(suppers);
        return res.status(200).json(suppers);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})
 
router.post('/create', upload.none(), async (req: Request<{},{},{
    identification: IUserIdentification
    type: string
    frames: number
    hiveId: number
}>, res: Response) => {
    let { identification, type, frames, hiveId } = req.body

    if (!identification.id || !isNumber(frames) || frames < 0 || !isNumber(hiveId) || !type) 
        return res.status(401).send('incorrect credentials!')

    try {
        const [supperInsertResult] = await db.query<ResultSetHeader>(`
            INSERT INTO suppers
            (type, frames, hive_id, user_id) 
            VALUES (?,?,?,?)`,
            [type, frames, hiveId, identification.id]
        )

        const [[supper]] = await db.query<RowDataPacket[]>(
            getSuppersQuery + ` WHERE id = ?`, 
            [supperInsertResult.insertId]
        )
        
        console.log(supper);
        res.status(200).json(supper)
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
            DELETE FROM suppers
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
    type: string
    frames: number
}>, res: Response) => {
    const { 
        identification,
        id,
        type,
        frames
    } = req.body

    if (!identification.id || !isNumber(frames) || frames < 0 || !type) 
        return res.status(401).send('incorrect credentials!')

    try {
        const [supperUpdateResult] = await db.query<ResultSetHeader>(`
            UPDATE suppers
            SET type = ?, frames = ? 
            WHERE id = ? AND user_id = ?`,
            [type, frames, id, identification.id]
        )

        const [[supper]] = await db.query<RowDataPacket[]>(
            getSuppersQuery + ` WHERE id = ?`, 
            [id]
        )
        
        console.log(supper);
        res.status(200).json(supper)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

export default router
