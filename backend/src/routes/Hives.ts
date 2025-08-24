import { Router, type Request, type Response } from "express";
import type { IUserIdentification } from "../Enums";
import { db } from "../server";
import { ApiaryT, HiveT } from "../TableColumnTitles";
import { col } from "../utils";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { uploadImage } from "../image_cloud/Cloudinary";
import { UserId } from "../image_cloud/PublicIdBuilder";

const router = Router()

// returns all hives
router.post('/hives', async (req: Request<{},{},{
    identification: IUserIdentification
}>, res: Response) => {
    const { identification } = req.body

    // missing credentials
    if (!identification) 
        return res.status(401).send('incorrect credentials!') 
    try {
        const [hives] = await db.query(`
            SELECT 
                ${HiveT.tableName}.*, 
                ${ApiaryT.name} as apiary
            FROM ${HiveT.tableName}
            LEFT JOIN ${ApiaryT.tableName} ON ${col(HiveT.tableName, HiveT.apiaryId)} = ${col(ApiaryT.tableName, ApiaryT.id)}
            WHERE ${col(HiveT.tableName, HiveT.userId)} = ?`, 
            [identification.id]
        )

        res.status(200).json({ hives })
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

// returns hive overview
router.post('/hive/overview', async (req: Request<{},{},{
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

    // console.log(overviewResults);

    // // group notes
    // const notes = overviewResults!.filter(row => typeof row.n_id === 'number').map(row => ({ 
    //     id: row.n_id,
    //     author: row.n_author, 
    //     title: row.n_title, 
    //     content: row.n_content, 
    //     creation_date: row.n_creation_date, 
    //     color: row.n_color 
    // }))

    // const queen = (overviewObj.q_id) ? getQueenObj() : undefined
    // const hive = getHiveObj()
   
    // console.log('hive: '); console.log(hive);
    // console.log('notes: '); console.log(notes);
    // console.log('queen: '); console.log(queen);

    // function getHiveObj() {
    //     const obj = {}
    //     for (let key in overviewObj) {
    //         if (key.startsWith('h_')) 
    //             obj[key.slice(2)] = (overviewObj[key] === null) ? undefined : overviewObj[key]
    //     }
    //     return obj
    // }
    
    // function getQueenObj() {
    //     const obj = {}
    //     for (let key in overviewObj) {
    //         if (key.startsWith('q_')) obj[key.slice(2)] = overviewObj[key]
    //     }
    //     return obj
    // }
    
    // res.status(201).json({
    //     message: 'all good!',
    //     hive: hive,
    //     notes: notes,
    //     queen: queen
    // })
})

// assigns hive to an apiary
router.post('/assign', async (req: Request<{},{},{
    identification: IUserIdentification,
    hiveId: string
    apiaryId: string
}>, res) => {
    const { identification, hiveId, apiaryId } = req.body
    
    // missing credentials
    if (!identification || !hiveId || !apiaryId) 
        return res.status(401).send('incorrect credentials!') 
      
    try {
        const [hives] = await db.query(`
            UPDATE ${HiveT.tableName} 
            SET ${HiveT.apiaryId} = ? 
            WHERE ${HiveT.id} = ? AND ${HiveT.userId} = ?`, 
            [apiaryId, hiveId, identification.id]
        )
        
        res.status(201).json({ hives })
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

// un-assigns hive to an apiary
router.post('/unassign', async (req: Request<{},{}, {
    identification: IUserIdentification,
    hiveId: string
}>, res) => {
    const { identification, hiveId } = req.body
    
    // missing credentials
    if (!identification || !hiveId) 
        return res.status(401).send('incorrect credentials!') 
       
    try {
        const [hives] = await db.query(`
            UPDATE ${HiveT.tableName} 
            SET ${HiveT.apiaryId} = NULL 
            WHERE ${HiveT.id}  = ? AND ${HiveT.userId}  = ?`, 
            [hiveId, identification.id]
        )

        res.status(204)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})


// creates hive
router.post('/create', async (req: Request<{},{},{
    identification: IUserIdentification
    name: string
    location: string
    description: string
    type: string
    imagePath: string
}>, res) => {
    const { identification, name, location, description, type, imagePath } = req.body

    // missing credentials
    if (!identification || !name || !type)
        return res.status(401).send('incorrect information!') 

    try {
        const [response] = await db.query<ResultSetHeader>(`
            INSERT INTO ${HiveT.tableName} (
                ${HiveT.name}, 
                ${HiveT.location}, 
                ${HiveT.description}, 
                ${HiveT.type}, 
                ${HiveT.userId}
            )
            VALUES(?, ?, ?, ?, ?)`, 
            [name, location, description, type, identification.id]
        )

        // insert image url
        var imageUrl: string | undefined
        if (imagePath)
            imageUrl = await uploadImage(imagePath, new UserId(identification.id).Hive(String(response.insertId)).getResource())

        if (imageUrl)
            await db.query<ResultSetHeader>(`
                UPDATE ${HiveT.tableName}
                SET ${HiveT.imagePath} = ${imageUrl}
                WHERE ${HiveT.id} = ${response.insertId}`,
            )
        
        res.status(201)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

export default router
