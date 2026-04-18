import { Router, type Request, type Response } from "express";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { db, pool } from "../config/Database";
import { Role } from "../DatabaseEnums";
import { requireRole } from "../Middleware";
import { isValidValue } from "../utils";
import { asc, desc, eq } from "drizzle-orm";
import {  hiveInspections } from "../db/schema";

const router = Router()

router.get(
    '/entries', 
    requireRole([Role.ANY]), 
    async (
        req: Request<{ 
            page:  string
            limit: string
        }>, 
        res: Response
) => {
    console.log("# Get Inspection entries");
    const page   = parseInt(req.query.page as string) || 1;
    const limit  = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit
    
    try {
        console.log(`Getting Limit: ${limit} Offset: ${offset} inspection table entries...`);
        const inspectionResult = await db.query.hiveInspections.findMany({
            with: {
                hiveInspectionForms: {
                    columns: { 
                        id: true,
                    }
                },
                apiary: {
                    columns: {
                        id: true,
                        name: true
                    }
                },
                user: {
                    columns: {
                        id: true,
                        username: true
                    }
                }
            },
            offset: offset,
            limit: limit,
            orderBy: [desc(hiveInspections.creationDate)]
        })
        console.log("Done!");
        
        res.status(200).json(inspectionResult);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

router.get(
    '/:id', 
    requireRole([Role.ANY]), 
    async (
        req: Request<{ id: string }>, 
        res: Response
) => {
    console.log("# Get Inspection");
    const inspectionId = parseInt(req.params.id)
    
    try {
        console.log(`Getting inspection...`);
        const inspectionResult = await db.query.hiveInspections.findFirst({
            where: eq(hiveInspections.id, inspectionId),
            with: {
                hiveInspectionForms: {
                    with: {
                        hive: {
                            columns: {
                                name: true
                            }
                        }
                    }
                },
                apiary: true,
                user: true
            }
        })
        console.log("Done!");
        
        res.status(200).json(inspectionResult);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

router.post(
    '/create', 
    requireRole([Role.ANY]), 
    async (
        req: Request<{},{},{
            apiaryId: number;
            forms:     {
                hiveId:                       number;
                isAbnormalBehavior:           boolean;
                isSwarming:                   boolean;
                needAdditionalFeeding:        boolean;
                isQueenAlive:                 boolean;
                isQueenLayingEggs:            boolean;
                isQueenLayingEggsIncorrectly: boolean;
                needMoreHoneyFrames:          boolean;
                needMoreBreedingFrames:       boolean;
                needMedicalAttention:         boolean;
                hasHiveDamage:                boolean;
                isTakingOutFrames:            boolean;
                abnormalBehaviorDescription:  string;
                medicalAttentionDescription:  string;
                hiveDamageDescription:        string;
                needMoreHoneyFramesAmount:    number;
                needMoreBreedingFramesAmount: number;
                takenHoneyFrames:             number;
                takenBreedingFrames:          number;
            }[]
        }>, 
        res: Response
) => {
    console.log("# Create Inspection");
    const { apiaryId, forms } = req.body

    // checking manditory fields
    console.log("Checking manditory fields...");
    if (forms.some(item => !isValidValue(item.hiveId)) || !isValidValue(apiaryId)) {
        console.log("Hive ID and Apiary ID are required!");
        return res.status(400).send("Hive ID and Apiary ID are required!");
    }
    console.log("Done!");


    console.log("Getting db connection..");
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    console.log("Done!");
    
    try {
        const [inspectionCreateResult] = await connection.query<ResultSetHeader>(`
            INSERT INTO hive_inspections (apiaryId, userIdCreator) VALUES ?`, 
            [[[
                apiaryId,
                req.session.userId
            ]]]
        )
        // inserting new entries (transaction lets us rollback db changes on error)
        console.log("Inserting inspection forms...");
        await Promise.all(
            forms.map(row =>
                connection.query<ResultSetHeader>(`
                    INSERT INTO hive_inspection_forms 
                    (
                        hiveId,
                        isAbnormalBehavior,
                        isSwarming,
                        needFeeding,
                        isQueenAlive,
                        isQueenLayingEggs,
                        isQueenLayingEggsIncorrectly,
                        needMoreHoneyFrames,
                        needMoreBreedingFrames,
                        needMedicalAttention,
                        hasHiveDamage,
                        isTakingFrames,
                        abnormalBehaviorDescription,
                        medicalAttentionDescription,
                        hiveDamageDescription,
                        needMoreHoneyFramesAmount,
                        needMoreBreedingFramesAmount,
                        takenHoneyFrames,
                        takenBreedingFrames,
                        inspectionId
                    ) VALUES ?`,
                    [[[
                        row.hiveId,
                        row.isAbnormalBehavior,
                        row.isSwarming,
                        row.needAdditionalFeeding,
                        row.isQueenAlive,
                        row.isQueenLayingEggs,
                        row.isQueenLayingEggsIncorrectly,
                        row.needMoreHoneyFrames,
                        row.needMoreBreedingFrames,
                        row.needMedicalAttention,
                        row.hasHiveDamage,
                        row.isTakingOutFrames,
                        row.abnormalBehaviorDescription,
                        row.medicalAttentionDescription,
                        row.hiveDamageDescription,
                        row.needMoreHoneyFramesAmount,
                        row.needMoreBreedingFramesAmount,
                        row.takenHoneyFrames,
                        row.takenBreedingFrames,
                        inspectionCreateResult.insertId
                    ]]]
                )
            )
        );

        await connection.commit();
        console.log("Done!");

        console.log(`Getting inspection...`);
        const inspectionResult = await db.query.hiveInspections.findFirst({
            where: eq(hiveInspections.id, inspectionCreateResult.insertId),
            with: {
                hiveInspectionForms: {
                    with: {
                        hive: {
                            columns: {
                                name: true
                            }
                        }
                    }
                },
                apiary: true,
                user: true
            }
        })
        console.log("Done!");
        
        res.status(200).json(inspectionResult);
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).send('Server error');
    } finally {
        connection.release(); // always release back to pool
    }
});


router.get(
    '/:id/process', 
    requireRole([Role.ANY]), 
    async (
        req: Request<{ id: string }>, 
        res: Response
) => {
    console.log("# Process Inspection");
    const inspectionId = parseInt(req.params.id)
    
    try {
        console.log(`Processing  inspection...`);
        await db.update(hiveInspections).set({ processed: true }).where(eq(hiveInspections.id, inspectionId))
        const inspectionResult = await db.query.hiveInspections.findFirst({
            where: eq(hiveInspections.id, inspectionId),
            with: {
                hiveInspectionForms: {
                    with: {
                        hive: {
                            columns: {
                                name: true
                            }
                        }
                    }
                },
                apiary: true,
                user: true
            }
        });
        console.log("Done!");
        
        res.status(200).json(inspectionResult);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

export default router
