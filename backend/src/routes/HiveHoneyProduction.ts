import { Router, type Request, type Response } from "express";
import { Role } from "../DatabaseEnums";
import { eq } from "drizzle-orm";
import { db } from "../config/Database";
import { hiveHoneyProduction, hiveInspections } from "../db/schema";
import { requireRole } from "../Middleware";

const router = Router()
    
router.post(
    '/create', 
    requireRole([Role.ANY]), 
    async (
        req: Request<{}, {}, {
            hiveId:       number
            inspectionId: number
            amount:       number
        }>, 
        res: Response
) => {
    console.log("# Create hive honey production entry");
    const { hiveId, inspectionId, amount } = req.body
    
    try {
        console.log(`creating entrys...`);
        const [insert] = await db.insert(hiveHoneyProduction).values({ hiveId, inspectionId, amount });
        const honeyProduction = await db.query.hiveHoneyProduction.findFirst({
            where: eq(hiveHoneyProduction.id, insert.insertId)
        });
        console.log("Done!");
        
        res.status(200).json(honeyProduction);
    } catch (error) {
        console.error(error);
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
    console.log("# Get hive honey production entries");
    const { id } = req.params;
    
    try {
        console.log(`Getting entrys...`);
        const honeyProduction = await db.query.hiveHoneyProduction.findMany({
            where: eq(hiveHoneyProduction.hiveId, Number.parseInt(id))
        });
        console.log("Done!");
        
        res.status(200).json(honeyProduction);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

export default router
