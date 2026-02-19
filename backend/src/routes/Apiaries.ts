import { Router, type Request, type Response } from "express";
import { db } from "../config/Database";
import { ApiaryT, HiveT } from "../TableColumnTitles";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { uploadImage } from "../config/image_cloud/Cloudinary";
import { PublicIdBuilder } from "../config/image_cloud/PublicIdBuilder";
import { upload } from "../config/Multer";
import { requireRole } from "../Middleware";
import { Role, String_to_Role } from "../DatabaseEnums";
import { redisClient } from "../config/RedisClient";

const getApiaryQuery = (where: string) => `
SELECT 
    a.id, 
    a.name,
    a.location,
    a.description,
    a.image
FROM apiaries as a
`

const router = Router()

router.get('/get', requireRole([Role.ANY]), async (
    req: Request<{},{},{}>, 
    res: Response
) => {
    console.log("# Get apiaries");
    const role = String_to_Role(await redisClient.hGet(`user:${req.session.userId}`, 'role') ?? "")
    console.log("Role: ", role);
    var apiaries: RowDataPacket[]
    try {
        console.log("Getting apiaries you have access to...");
        switch (role) {
            case Role.ADMINISTRATOR:
                [apiaries] = await db.query<RowDataPacket[]>(getApiaryQuery(""))
                break;
            default:
                [apiaries] = await db.query<RowDataPacket[]>(getApiaryQuery("") + `
                    WHERE a.id IN (
                        SELECT apiaryId 
                        FROM userApiaryAccess 
                        WHERE userId = ?
                    )`,
                    [req.session.userId]
                )
                break;
        }
        console.log("Done!");
    // // try {
    // //     var [apiaries] = await db.query<any[]>(`
    // //         ${getApiaryQuery("")}
    // //         WHERE a.userId = ? 
    // //         GROUP BY a.id
    // //         `,
    // //         [req.session.userId]
    // //     )
    //     console.log("Done!");
        res.status(200).json(apiaries)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

// creates apiary
router.post('/create', upload.single("image"), async (req: Request<{},{},{
    name: string
    location: string
    description: string
}>, res: Response) => {
    console.log("# Create apiary");
    const { name, location, description } = req.body
    const file = req.file;

    // missing credentials
    if (!name) 
        return res.status(400).send('incorrect information!') 

    try {
        console.log("Inserting apirary...");
        const [result] = await db.query<ResultSetHeader>(`
            INSERT INTO apiaries (
            name, 
            location, 
            description, 
            userId
            )
            VALUES(?, ?, ?, ?)`, 
            [name, location, description, req.session.userId]
        )
        console.log("Done!");
    
        if (file) {
            console.log("Uploading image to cloud...");
            const imageKey = new PublicIdBuilder(req.session.userId!.toString()).Apiary(result.insertId.toString()).getResource()

            const url = await uploadImage(file, imageKey)
            console.log(url);
            console.log("Done!");

            console.log("Updating entry with image...");
            
            await db.query<ResultSetHeader>(`
                UPDATE apiaries
                SET image = ?
                WHERE id = ?`,
                [url, result.insertId]
            )
            console.log("Done!");
        }

        console.log("Getting new entry data...");
        var [[getNewApiary]] = await db.query<RowDataPacket[]>(`
            ${getApiaryQuery("")}
            WHERE a.id = ? 
            GROUP BY a.id
            LIMIT 1
            `,
            [result.insertId]
        )
        
        res.status(201).json(getNewApiary)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

// // deletes apiary
// router.post('/delete', async (req: Request<{},{},{
//     apiaryId: string
// }>, res: Response) => {
//     console.log(req.body);

//     // missing credentials
//     try {
//         const unassigningResult = await db.query( `
//             UPDATE ${HiveT.tableName} 
//             SET ${HiveT.apiaryId} = NULL 
//             WHERE ${HiveT.apiaryId} = ? AND ${HiveT.userId} = ?`, 
//             [apiaryId, identification.id]
//         )
        
//         const deleteQuery = await db.query(`
//             DELETE FROM ${ApiaryT.tableName} 
//             WHERE ${ApiaryT.id} = ? AND ${ApiaryT.userId} = ?`, 
//             [apiaryId, identification.id]
//         )

//         res.status(204).send()
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// })

export default router
