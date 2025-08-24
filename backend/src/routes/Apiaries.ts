import { Router, type Request, type Response } from "express";
import { db } from "../server";
import { type IUserIdentification } from "../Enums";
import { ApiaryT, HiveT } from "../TableColumnTitles";

const router = Router()

// returns all apiary hives
router.post('/hives', async (req: Request<{},{}, {
    identification: IUserIdentification
    apiaryId: string
}>, res: Response) => {
    const { identification, apiaryId } = req.body
    
    if (!identification || !apiaryId) 
        return res.status(401).send('incorrect credentials!') 
        
    try {
        const [hives] = await db.query(`
            SELECT *
            FROM ${HiveT.tableName}
            WHERE ${HiveT.userId} = ? AND ${HiveT.apiaryId} = ?`, 
            [identification.id, apiaryId]
        )
        res.status(200).json({ hives });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

// returns all apiaries which start with given filter
router.post('/apiaries', async (req: Request<{},{},{
    identification: IUserIdentification
    searchFilter: string
}>, res: Response) => {
    let { identification, searchFilter } = req.body

    if (!identification) 
        return res.status(401).send('incorrect credentials!') 

    // sets default value
    searchFilter = (!searchFilter) ? '%' : searchFilter.concat('%')

    try {
        const [apiaries] = await db.query(`
            SELECT *
            FROM ${ApiaryT.tableName}
            WHERE ${ApiaryT.userId} = ? AND ${ApiaryT.name} LIKE ?`, [identification.id, searchFilter])
        
        res.status(200).json({ apiaries })
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
    let { identification, apiaryId } = req.body

    // missing credentials
    if (!identification || apiaryId == null) 
        return res.status(401).send('incorrect credentials!') 

    try {
        const [apiary] = await db.query(`
            SELECT *
            FROM ${ApiaryT.name}
            WHERE ${ApiaryT.userId} = ? AND ${ApiaryT.id} = ?`, 
            [identification.id, apiaryId]
        )

        res.status(200).json({ apiary })
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

// creates apiary
router.post('/create', async (req: Request<{},{},{
    identification: IUserIdentification
    name: string
    location: string
    description: string
}>, res: Response) => {
    let { identification, name, location, description } = req.body

    // missing credentials
    if (!identification || !name || !location) 
        return res.status(400).send('incorrect information!') 

    try {
        await db.query(`
            INSERT INTO ${ApiaryT.tableName} (
            ${ApiaryT.name}, 
            ${ApiaryT.location}, 
            ${ApiaryT.description}, 
            ${ApiaryT.userId}
            )
            VALUES(?, ?, ?, ?)`, 
            [name, location, description, identification.id]
        )
        res.status(201)
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
    let { identification, apiaryId } = req.body

    // missing credentials
    if (!identification || apiaryId == null) 
        return res.status(401).send('incorrect information!') 
    
    try {
        const unassigningResult = await db.query( `
            UPDATE ${HiveT.name} 
            SET ${HiveT.apiaryId} = NULL 
            WHERE ${HiveT.apiaryId} = ? AND ${HiveT.userId} = ?`, 
            [apiaryId, identification.id]
        )
        
        const deleteQuery = await db.query(`
            DELETE FROM ${ApiaryT.tableName} 
            WHERE ${ApiaryT.id} = ? AND ${ApiaryT.userId} = ?`, 
            [apiaryId, identification.id]
        )

        res.status(204)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

export default router
