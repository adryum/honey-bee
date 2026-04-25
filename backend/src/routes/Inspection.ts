import { Router, type Request, type Response } from "express";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { db, pool } from "../config/Database";
import { Role } from "../DatabaseEnums";
import { requireRole } from "../Middleware";
import { isValidValue, withStatus } from "../utils";
import { asc, count, desc, eq } from "drizzle-orm";
import {  apiaries, hiveInspectionForms, hiveInspections, users } from "../db/schema";

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
        const inspectionResult = await withStatus(
            `Getting Limit: ${limit} Offset: ${offset} inspection table entries`,
            () => db
                .select({
                    id: hiveInspections.id,
                    processed: hiveInspections.processed,
                    creationTimestamp: hiveInspections.creationTimestamp,
                    formCount: db
                        .select({ count: count().as('count') })
                        .from(hiveInspectionForms)
                        .where(eq(hiveInspectionForms.inspectionId, hiveInspections.id))
                        .as('formCount'),
                    apiary: {
                        id: apiaries.id,
                        name: apiaries.name,
                    },
                    user: {
                        id: users.id,
                        username: users.username,
                        image: users.image
                    },
                })
                .from(hiveInspections)
                .leftJoin(apiaries, eq(hiveInspections.apiaryId, apiaries.id))
                .leftJoin(users, eq(hiveInspections.userIdCreator, users.id))
                .orderBy(desc(hiveInspections.creationTimestamp))
                .limit(limit)
                .offset(offset)
        )
        
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
    '/', 
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
    await withStatus("Checking manditory fields", () => {
        if (forms.some(item => !isValidValue(item.hiveId)) || !isValidValue(apiaryId)) {
            console.log("Hive ID and Apiary ID are required!");
            return res.status(400).send("Hive ID and Apiary ID are required!");
        }
    })


    try {
        var inspectionCreateResult: ResultSetHeader
        await db.transaction(async (transaction) => {
            [inspectionCreateResult] = await withStatus("Inserting new Inspection entry", () =>  
                transaction.insert(hiveInspections).values({
                    apiaryId:      apiaryId,
                    userIdCreator: req.session.userId,
                })
            )

            await withStatus("Inserting inspection forms", () => Promise.all(
                forms.map(row =>
                    transaction.insert(hiveInspectionForms).values({
                        inspectionId:                    inspectionCreateResult.insertId,
                        hiveId:                          row.hiveId,
                        abnormalBehavior:                row.isAbnormalBehavior,
                        abnormalBehaviorDescription:     row.abnormalBehaviorDescription,
                        swarming:                        row.isSwarming,
                        needFeeding:                     row.needAdditionalFeeding,
                        queenAlive:                      row.isQueenAlive,
                        queenLayingEggs:                 row.isQueenLayingEggs,
                        queenLayingEggsIncorrectly:      row.isQueenLayingEggsIncorrectly,
                        needMoreHoneyFrames:             row.needMoreHoneyFrames,
                        needMoreHoneyFramesAmount:       row.needMoreHoneyFramesAmount,
                        needMoreBreedingFrames:          row.needMoreBreedingFrames,
                        needMoreBreedingFramesAmount:    row.needMoreBreedingFramesAmount,
                        takingFrames:                    row.isTakingOutFrames,
                        takenHoneyFrames:                row.takenHoneyFrames,
                        takenBreedingFrames:             row.takenBreedingFrames,
                        hasHiveDamage:                   row.hasHiveDamage,
                        hasHiveDamageDescription:        row.hiveDamageDescription,
                        needMedicalAttention:            row.needMedicalAttention,
                        needMedicalAttentionDescription: row.medicalAttentionDescription,
                    })
                )
            ))
        })

        const inspectionResult = await withStatus("Getting inspection", 
            () => db.query.hiveInspections.findFirst({
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
                }}
            )
        )
        
        res.status(200).json(inspectionResult);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
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
