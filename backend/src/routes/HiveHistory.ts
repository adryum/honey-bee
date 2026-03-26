import { Router, type Request, type Response } from "express";
import { db } from "../config/Database"
import { HistoryEntryType, Role } from "../DatabaseEnums"
import { requireRole } from "../Middleware"
import { getCurrentUTCDateString } from "../utils"
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { hivehistory } from "../db/schema";
import { desc } from "drizzle-orm";

const router = Router()

router.post(
    '/create', 
    requireRole([Role.ANY]), 
    async (
        req: Request<{},{},{
            hiveId:    number
            text:      string,
            type:      HistoryEntryType
        }>, 
        res: Response
) => {
    console.log("# Create hive history entry");
    const { hiveId, text, type } = req.body
    const creationDate = getCurrentUTCDateString()
    
    try {
        console.log("Creating history entry...");
        const [result] = await db.insert(hivehistory).values({
            text:         text,
            userId:       req.session.userId,
            hiveId:       hiveId,
            type:         type,
            creationDate: creationDate
        })
        console.log("Done!");

        console.log("Getting new entry data...");
        const hiveHistoryGetResult = await db.query.hivehistory.findFirst({
            where: eq(hivehistory.id, result.insertId),
            with: {
                user: {
                    columns: {
                        id:       true,
                        image:    true,
                        username: true
                    }
                }
            }
        });
        console.log("Done!");
        
        res.status(200).json(hiveHistoryGetResult)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

router.get(
    '/hive/:id', 
    requireRole([Role.ANY]), 
    async (
        req: Request<{ id: string }>, 
        res: Response
    ) => {
        console.log("# Get hive history");
        const { id } = req.params

        try {
            console.log("Fetching hive history...");
            const hiveHistoryGetResult = await db.query.hivehistory.findMany({
                where: eq(hivehistory.hiveId, parseInt(id)),
                with: {
                    user: {
                        columns: {
                            id:       true,
                            image:    true,
                            username: true
                        }
                    }
                },
                orderBy: [desc(hivehistory.creationDate)]
            });
            console.log("Done!");

            res.status(200).json(hiveHistoryGetResult)
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    }
)

export default router
