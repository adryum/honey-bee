import { UserRoles } from "../../DatabaseEnums"
import { requireRole } from "../../Middleware"
import { Router, type Request, type Response } from "express";
import { toNumberArray, withStatus } from "../../utils";
import { db } from "../../config/Database";
import { eq, inArray } from "drizzle-orm";
import { hiveQueenHistory } from "../../db/schema";

const router = Router()

type queenHistoryGetOptions = Parameters<typeof db.query.hiveQueenHistory.findMany>[0];

export const queenHistoryGetStructure = {
    columns: {
        queenSpeciesId: false,
        hiveId:         false
    },
    with: {
        queenSpecy: {
            columns: {
                id:             true,
                knownAsName:    true,
                scientificName: true,
                lifeExpectancy: true,
            }
        },
        hive: {
            columns: {
                id:   true,
                name: true,
            }
        }
    },
} satisfies queenHistoryGetOptions;

router.get(
    "/",
    requireRole([UserRoles.ANY]),
    async (
        req: Request<{}, {}, {}, {
            hiveIds?: string[]
            desc?: string
        }>,
        res: Response
) => {
    console.log("# Get hive queen history");
    const hiveIds = toNumberArray(req.query.hiveIds)
    const descendingOrder = req.query.desc === "true"

    try {
        const hiveQueenHistoryResult = await withStatus(`Fetching hive queen history for hives: ${hiveIds}`, () => {
            return db.query.hiveQueenHistory.findMany({
                ...queenHistoryGetStructure,
                where: hiveIds ? inArray(hiveQueenHistory.hiveId, hiveIds) : undefined,
                orderBy: (table, { desc, asc }) => [
                    descendingOrder ? desc(table.creationTimestamp) : asc(table.creationTimestamp)
                ]
            })
        })

        return res.status(200).json(hiveQueenHistoryResult)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

router.post(
    "/",
    requireRole([UserRoles.ANY]),
    async (
        req: Request<{},{},{
            hiveId:               number
            imageUrl:             string
            bornDate:             Date
            queenSpeciesId:       number
            addedToHiveTimestamp: string
        }, {}>, 
        res: Response
) => {
    console.log("# Create hive queen history");
    const { hiveId, imageUrl, bornDate, queenSpeciesId, addedToHiveTimestamp } = req.body

    try {
        const timeSpentInHive = new Date(addedToHiveTimestamp).getDuration(new Date())
        const [insertResult] = await withStatus("Creating hive queen history entry", () => 
            db.insert(hiveQueenHistory).values({
                timeSpentInHive:     `${timeSpentInHive.years} years, ${timeSpentInHive.months} months, ${timeSpentInHive.days} days`,
                imageUrl:            imageUrl,
                queenSpeciesId:      queenSpeciesId,
                placedHereTimestamp: addedToHiveTimestamp,
                hiveId:              hiveId,
            })
        )

        const hiveQueenHistoryGetResult = await withStatus(`Fetching new history entry`, () => {
            return db.query.hiveQueenHistory.findFirst({
                ...queenHistoryGetStructure,
                where: eq(hiveQueenHistory.id, insertResult.insertId)
            })
        })

        return res.status(200).json(hiveQueenHistoryGetResult)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

export default router