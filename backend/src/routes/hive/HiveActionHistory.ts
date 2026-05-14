import { Router, type Request, type Response } from "express";
import { db } from "../../config/Database"
import { HistoryActionType, UserRoles } from "../../DatabaseEnums"
import { requireRole } from "../../Middleware"
import { withStatus } from "../../utils"
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { hiveActionHistory } from "../../db/schema";
import { desc } from "drizzle-orm";
import { HistoryActionTypeMap } from "../../initialization";

const router = Router()

type HiveHistoryQueryConfig = Parameters<typeof db.query.hiveActionHistory.findMany>[0];

const hiveHistoryGetParts = {
    columns: {
        userId: false,
        historyActionTypeId: false
    },
    with: {
        historyActionType: {},
        user: {
            columns: {
                id:       true,
                imageUrl: true,
                username: true,
            }
        }
    }
} satisfies HiveHistoryQueryConfig;

router.post(
    '/', 
    requireRole([UserRoles.ANY]), 
    async (
        req: Request<{},{},{
            hiveId:    number
            text:      string,
            type:      HistoryActionType
        }>, 
        res: Response
) => {
    console.log("# Create hive history entry");
    const { hiveId, text, type } = req.body
    
    try {
        const [result] = await withStatus("Creating history entry", 
            () => db.insert(hiveActionHistory).values({
                text:                text,
                userId:              req.session.userId,
                hiveId:              hiveId,
                historyActionTypeId: HistoryActionTypeMap.get(type)!
            })
        )

        const hiveHistoryGetResult = await withStatus("Getting new entry data", 
            () => db.query.hiveActionHistory.findFirst({
                ...hiveHistoryGetParts,
                where: eq(hiveActionHistory.id, result.insertId),
            })
        )
        
        res.status(200).json(hiveHistoryGetResult)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

router.get(
    '/hive/:id', 
    requireRole([UserRoles.ANY]), 
    async (
        req: Request<{ id: string }>, 
        res: Response
    ) => {
        console.log("# Get hive history");
        const { id } = req.params

        try {
            const hiveHistoryGetResult = await withStatus("Getting hive history", 
                () => db.query.hiveActionHistory.findMany({
                    ...hiveHistoryGetParts,
                    where: eq(hiveActionHistory.hiveId, parseInt(id)),
                    orderBy: [desc(hiveActionHistory.creationTimestamp)]
                })
            )

            res.status(200).json(hiveHistoryGetResult)
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    }
)

export default router
