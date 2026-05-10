import { UserRoles } from "../DatabaseEnums"
import { requireRole } from "../Middleware"
import { Router, type Request, type Response } from "express";
import { withStatus } from "../utils";
import { db } from "../config/Database";
import { and, eq, inArray } from "drizzle-orm";
import { hiveQueenHistory, queens } from "../db/schema";
import { upload } from "../config/Multer";
import { uploadImage } from "../config/image_cloud/Cloudinary";
import { PublicIdBuilder } from "../config/image_cloud/PublicIdBuilder";

const router = Router()

type queenGetOptions = Parameters<typeof db.query.queens.findMany>[0];

export const queenGetStructure = {
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
} satisfies queenGetOptions;

router.get(
    "/",
    requireRole([UserRoles.ANY]),
    async (
        req: Request<{},{},{}, { queenIds: string[], hiveIds: string[] }>, 
        res: Response
) => {
    console.log("# Get queens ");
    const queenIds = req.query.queenIds ? [].concat(req.query.queenIds as any).map(Number) : []
    const hiveIds  = req.query.hiveIds  ? [].concat(req.query.hiveIds as any).map(Number)  : []
    console.log({ queenIds, hiveIds })

    try {
        const queenGetResult = await withStatus(`Fetching queens`, () => {
            return db.query.queens.findMany({
                ...queenGetStructure,
                where: and(
                    queenIds.length ? inArray(queens.id, queenIds) : undefined,
                    hiveIds.length  ? inArray(queens.hiveId, hiveIds) : undefined
                )
            })
        })

        res.status(200).json(queenGetResult)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

router.post(
    "/",
    requireRole([UserRoles.ANY]),
    upload.single("image"),
    async (
        req: Request<{},{},{
            bornDate:  string
            hiveId:    number
            speciesId: number
        }, {}>, 
        res: Response
) => {
    console.log("# Create queen");
    const { bornDate, hiveId, speciesId } = req.body
    const image = req.file

    try {
        const existingQueen = await withStatus("Checking if hive already has a queen", () =>
            db.query.queens.findFirst({
                where: eq(queens.hiveId, hiveId)
            })
        )

        if (existingQueen) {
            // making queen history entry
            const timeSpentInHive = new Date(existingQueen.addedToHiveTimestamp).getDuration(new Date())
            await withStatus("Creating hive history entry for existing queen", () => 
                db.insert(hiveQueenHistory).values({
                    timeSpentInHive:     `${timeSpentInHive.years} years, ${timeSpentInHive.months} months, ${timeSpentInHive.days} days`,
                    imageUrl:            existingQueen.imageUrl,
                    // bornDate:            existingQueen.bornDate,
                    queenSpeciesId:      existingQueen.queenSpeciesId,
                    placedHereTimestamp: existingQueen.addedToHiveTimestamp,
                    hiveId:              existingQueen.hiveId,
                })
            )

            // delete existing queen
            await withStatus("Deleting existing queen", () => 
                db.delete(queens).where(eq(queens.id, existingQueen.id))
            )
        }

        const [insertResult] = await withStatus("Creating queen entry", () => 
            db.insert(queens).values({
                bornDate:       bornDate,
                queenSpeciesId: speciesId,
                hiveId:         hiveId
            })
        )

        if (image) {
            // insert image
            const url = await withStatus("Uploading image to cloud", async () => {
                const imageKey = new PublicIdBuilder(req.session.userId!.toString()).Apiary(insertResult.insertId.toString()).getResource()
                return await uploadImage(image, imageKey)
            })

            await withStatus("Inserting image url to entry", () =>
                db.update(queens)
                .set({ imageUrl: url })
                .where(eq(queens.id, insertResult.insertId))
            )
        }

        const queenResult = await withStatus(`Fetching bee species`, () => 
            db.query.queens.findFirst({
                ...queenGetStructure,
                where: eq(queens.id, insertResult.insertId),
            })
        )

        res.status(200).json(queenResult)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})



    // updateQueen: async (model: QueenUpdateModel): Promise<QueenModelDB> => {
    //     const { image, bornDate, id, speciesId } = model

    //     const formData = new FormData()
    //     formData.append("id", id.toString())
    //     if (isValidValue(bornDate))  formData.append("bornDate",  bornDate.toString())
    //     if (isValidValue(speciesId)) formData.append("speciesId", speciesId.toString())
    //     if (image) formData.append("image", image)

    //     const { data } = await api.post<QueenGetModel>("/queen/update", formData)
    //     return QueenGetModel_To_QueenModelDB(data)
    // },

export default router