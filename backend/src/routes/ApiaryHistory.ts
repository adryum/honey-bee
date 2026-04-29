import { Router, type Request, type Response } from "express";
import { db } from "../config/Database"
import { HistoryActionType, UserRoles } from "../DatabaseEnums"
import { requireRole } from "../Middleware"
import { withStatus } from "../utils"
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { apiaryActionHistory } from "../db/schema";
import { DBQueryConfig, desc, ExtractTablesWithRelations } from "drizzle-orm";
import { HistoryActionTypeMap } from "../initialization";
import type * as schema from "../db/schema";

const router = Router()

type Schema = ExtractTablesWithRelations<typeof schema>;
type ApiaryHistoryQueryConfig = DBQueryConfig<"many", true, Schema, Schema["apiaryActionHistory"]>;

const apiaryHistoryGetParts = {
    columns: {
        userId: false,
        historyActionTypeId: false
    },
    with: {
        historyActionType: {},
        user: {
            columns: {
                id:       true,
                image:    true,
                username: true,
            }
        }
    }
} satisfies ApiaryHistoryQueryConfig;

router.post(
    '/', 
    requireRole([UserRoles.ANY]), 
    async (
        req: Request<{},{},{
            apiaryId: number
            text:     string,
            type:     HistoryActionType
        }>, 
        res: Response
) => {
    console.log("# Create apiary history entry");
    const { apiaryId, text, type } = req.body
    
    try {
        const [result] = await withStatus("Creating history entry", 
            () => db.insert(apiaryActionHistory).values({
                text:                text,
                userId:              req.session.userId,
                apiaryId:            apiaryId,
                historyActionTypeId: HistoryActionTypeMap.get(type)!
            })
        )

        const apiaryHistoryGetResult = await withStatus("Getting new entry data", 
            () => db.query.apiaryActionHistory.findFirst({
                ...apiaryHistoryGetParts,
                where: eq(apiaryActionHistory.id, result.insertId),
            })
        )
        
        res.status(200).json(apiaryHistoryGetResult)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

router.get(
    '/apiary/:id', 
    requireRole([UserRoles.ANY]), 
    async (
        req: Request<{ id: string }>, 
        res: Response
    ) => {
        console.log("# Get apiary history");
        const { id } = req.params

        try {
            const apiaryHistoryGetResult = await withStatus("Getting apiary history", 
                () => db.query.apiaryActionHistory.findMany({
                    ...apiaryHistoryGetParts,
                    where: eq(apiaryActionHistory.apiaryId, parseInt(id)),
                    orderBy: [desc(apiaryActionHistory.creationTimestamp)]
                })
            )

            res.status(200).json(apiaryHistoryGetResult)
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    }
)

export default router
