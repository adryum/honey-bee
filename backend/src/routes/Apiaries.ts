import { Router, type Request, type Response } from "express";
import { db } from "../server";
import { type IUserIdentification } from "../Enums";
import { ApiaryT, HiveT } from "../TableColumnTitles";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { col } from "../utils";
import { getImage, uploadImage } from "../image_cloud/Cloudinary";
import { PublicIdBuilder } from "../image_cloud/PublicIdBuilder";
import { upload } from "../Multer";

const router = Router()

// returns all apiary hives
router.post('/hives', async (req: Request<{},{}, {
    identification: IUserIdentification
    apiaryId: string,
    searchWord: string
}>, res: Response) => {
    const { identification, apiaryId } = req.body
    var { searchWord } = req.body

    if (!identification || !apiaryId) 
        return res.status(401).send('incorrect credentials!') 

    searchWord = (!searchWord) ? '%' : searchWord.concat('%')
        
    try {
        const [hives] = await db.query(`
            SELECT 
                ${HiveT.id} AS id,
                ${HiveT.name} AS name,
                ${HiveT.imagePath} AS imagePath
            FROM ${HiveT.tableName}
            WHERE ${HiveT.userId} = ? AND ${HiveT.apiaryId} = ? AND ${HiveT.name} LIKE ?`, 
            [identification.id, apiaryId, searchWord]
        )
        console.log(hives);
        return res.status(200).json(hives);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

// returns all apiaries which start with given filter
router.post('/apiaries', async (req: Request<{},{},{
    identification: IUserIdentification
    searchWord: string
}>, res: Response) => {
    let { identification, searchWord: searchFilter } = req.body

    if (!identification.id) 
        return res.status(401).send('incorrect credentials!') 

    // sets default value
    searchFilter = (!searchFilter) ? '%' : searchFilter.concat('%')

    try {
        const [apiaries] = await db.query<any[]>(`
            SELECT 
                ${col(ApiaryT.tableName, ApiaryT.id)} AS id, 
                ${col(ApiaryT.tableName, ApiaryT.name)} AS name,
                ${col(ApiaryT.tableName, ApiaryT.description)} AS description,
                ${col(ApiaryT.tableName, ApiaryT.imagePath)} AS imagePath,
                COUNT(${col(HiveT.tableName, HiveT.id)}) AS hiveCount
            FROM ${ApiaryT.tableName}
            LEFT JOIN ${HiveT.tableName} ON ${col(HiveT.tableName, HiveT.apiaryId)} = ${col(ApiaryT.tableName, ApiaryT.id)}
            WHERE ${col(ApiaryT.tableName, ApiaryT.userId)} = ? AND ${col(ApiaryT.tableName, ApiaryT.name)} LIKE ?
            GROUP BY ${col(ApiaryT.tableName, ApiaryT.id)}
            `,
            [identification.id, searchFilter]
        )
        
        res.status(200).json({apiaries})
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

// returns apiary
router.post('/', async (req: Request<{},{},{
    identification: IUserIdentification
    apiaryId: string
}>, res: Response) => {
    const { identification, apiaryId } = req.body

    // missing credentials
    if (!identification || apiaryId == null) 
        return res.status(401).send('incorrect credentials!') 

    try {
        const [apiary] = await db.query(`
            SELECT *
            FROM ${ApiaryT.tableName}
            WHERE ${ApiaryT.userId} = ? AND ${ApiaryT.id} = ?
            LIMIT 1`, 
            [identification.id, apiaryId]
        )

        console.log(apiary);
        return res.status(200).json( (apiary as any[])[0] )
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

// creates apiary
router.post('/create', upload.single("image"), async (req: Request<{},{},{
    identification: string
    name: string
    location: string
    description: string
}>, res: Response) => {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    const { name, location, description } = req.body
    const file = req.file;
    const identificationObj = JSON.parse(req.body.identification);

    // missing credentials
    if (!identificationObj || !name) 
        return res.status(400).send('incorrect information!') 

    try {
        const [result] = await db.query<ResultSetHeader>(`
            INSERT INTO ${ApiaryT.tableName} (
            ${ApiaryT.name}, 
            ${ApiaryT.location}, 
            ${ApiaryT.description}, 
            ${ApiaryT.userId}
            )
            VALUES(?, ?, ?, ?)`, 
            [name, location, description, identificationObj.id]
        )

        // add image
        if (file) {
            const imageKey = new PublicIdBuilder(identificationObj.id).Apiary(result.insertId.toString()).getResource()

            const url = await uploadImage(file, imageKey)
            console.log(url);
            
            const [updateRes] = await db.query<ResultSetHeader>(`
                UPDATE ${ApiaryT.tableName} 
                SET ${ApiaryT.imagePath} = ?
                WHERE ${ApiaryT.id} = ?`,
                [url, result.insertId]
            )
        }
        
        res.status(201).send()
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

// deletes apiary
router.post('/delete', async (req: Request<{},{},{
    identification: IUserIdentification
    apiaryId: string
}>, res: Response) => {
    console.log(req.body);
    const { identification, apiaryId } = req.body

    // missing credentials
    if (!identification || apiaryId == null) 
        return res.status(401).send('incorrect information!') 
    
    try {
        const unassigningResult = await db.query( `
            UPDATE ${HiveT.tableName} 
            SET ${HiveT.apiaryId} = NULL 
            WHERE ${HiveT.apiaryId} = ? AND ${HiveT.userId} = ?`, 
            [apiaryId, identification.id]
        )
        
        const deleteQuery = await db.query(`
            DELETE FROM ${ApiaryT.tableName} 
            WHERE ${ApiaryT.id} = ? AND ${ApiaryT.userId} = ?`, 
            [apiaryId, identification.id]
        )

        res.status(204).send()
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

export default router
