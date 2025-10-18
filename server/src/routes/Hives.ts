import { Router, type Request, type Response } from "express";
import type { IUserIdentification } from "../Enums";
import { db } from "../config/Database";
import { ApiaryT, HiveT } from "../TableColumnTitles";
import { col, handleSearchWord } from "../utils";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { uploadImage } from "../config/image_cloud/Cloudinary";
import { PublicIdBuilder } from "../config/image_cloud/PublicIdBuilder";
import { upload } from "../config/Multer";

const router = Router()
const hiveModelQuery =`
    SELECT 
        ${col(HiveT.tableName, HiveT.id)} AS id, 
        ${col(HiveT.tableName, HiveT.name)} as name,
        ${col(HiveT.tableName, HiveT.imagePath)} as imagePath,
        ${col(HiveT.tableName, HiveT.apiaryId)} as apiaryId,
        ${col(HiveT.tableName, HiveT.type)} as type,
        ${col(ApiaryT.tableName, ApiaryT.name)} as apiaryName,
        ${col(ApiaryT.tableName, ApiaryT.imagePath)} as apiaryImagePath
    FROM ${HiveT.tableName}
    LEFT JOIN ${ApiaryT.tableName} ON ${col(HiveT.tableName, HiveT.apiaryId)} = ${col(ApiaryT.tableName, ApiaryT.id)}`

// returns all hives
router.post('/hives', async (req: Request<{},{},{
    identification: IUserIdentification
    searchWord: string
}>, res: Response) => {
    
    const { identification } = req.body
    console.log(req.body);
    var { searchWord } = req.body
    // missing credentials
    if (!identification.id) 
        return res.status(401).send('incorrect credentials!') 

    searchWord = handleSearchWord(searchWord)
    console.log(searchWord);
    
    try {
        const [hives] = await db.query(`
            ${hiveModelQuery}
            WHERE ${col(HiveT.tableName, HiveT.userId)} = ? AND ${col(HiveT.tableName, HiveT.name)} LIKE ?`, 
            [identification.id, searchWord]
        )

        console.log(hives);
        
        res.status(200).json( hives )
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
        await db.query<ResultSetHeader>(`
            UPDATE ${HiveT.tableName} 
            SET ${HiveT.apiaryId} = ? 
            WHERE ${HiveT.id} = ? AND ${HiveT.userId} = ?`, 
            [apiaryId, hiveId, identification.id]
        )

        const [hive] = await db.query(`
            ${hiveModelQuery}
            WHERE ${col(HiveT.tableName, HiveT.userId)} = ? AND ${col(HiveT.tableName, HiveT.id)} LIKE ?`, 
            [identification.id, hiveId])

        console.log(hive);
        

        res.status(201).json(hive)
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

        res.status(204).send()
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})


// creates hive
router.post('/create', upload.single("image"), async (req: Request<{},{},{
    identification: string
    name: string
    location: string
    description: string
    type: string
}>, res: Response) => {
    const { name, location, description, type } = req.body
    const image  = req.file
    const identificationObj = JSON.parse(req.body.identification);

    // missing credentials
    if (!identificationObj.id || !name || !type)
        return res.status(401).send('incorrect information!') 

    try {
        const [result] = await db.query<ResultSetHeader>(`
            INSERT INTO ${HiveT.tableName} (
                ${HiveT.name}, 
                ${HiveT.location}, 
                ${HiveT.description}, 
                ${HiveT.type}, 
                ${HiveT.userId}
            )
            VALUES(?, ?, ?, ?, ?)`, 
            [name, location, description, type, identificationObj.id]
        )

        // insert image
        if (image) {
            const imageKey = new PublicIdBuilder(identificationObj.id).Apiary(result.insertId.toString()).getResource()

            const url = await uploadImage(image, imageKey)
            console.log(url);

            const [updateRes] = await db.query<ResultSetHeader>(`
                UPDATE ${HiveT.tableName}
                SET ${HiveT.imagePath} = ?
                WHERE ${HiveT.id} = ?`,
                [url, result.insertId]
            )
        }

        const [hive] = await db.query<any[]>(`
            ${hiveModelQuery}
            WHERE ${col(HiveT.tableName, HiveT.userId)} = ? AND ${col(HiveT.tableName, HiveT.id)} LIKE ?`, 
            [identificationObj.id, result.insertId]
        )

        console.log(hive[0]);
        res.status(200).json(hive[0])
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

// delete hive
router.post('/delete', upload.none(), async (req: Request<{},{},{
    identification: string
    hiveId: string
}>, res: Response) => {
    const { hiveId } = req.body
    const identificationObj = JSON.parse(req.body.identification);
    console.log(hiveId);

    // missing credentials
    if (!identificationObj.id || !hiveId)
        return res.status(401).send('incorrect information!') 

    try {
        const deleteQuery = await db.query(`
            DELETE FROM ${HiveT.tableName} 
            WHERE ${HiveT.id} = ? AND ${HiveT.userId} = ?`, 
            [hiveId, identificationObj.id]
        )

        res.status(204).send()
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

export default router
