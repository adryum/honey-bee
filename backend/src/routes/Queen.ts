import { Role } from "../DatabaseEnums"
import { requireRole } from "../Middleware"
import { Router, type Request, type Response } from "express";
import { withStatus } from "../utils";
import { db } from "../config/Database";
import { and, eq, inArray } from "drizzle-orm";
import { queens } from "../db/schema";
import { upload } from "../config/Multer";
import { uploadImage } from "../config/image_cloud/Cloudinary";
import { PublicIdBuilder } from "../config/image_cloud/PublicIdBuilder";

const router = Router()

router.get(
    "/",
    requireRole([Role.ANY]),
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
                columns: {
                    speciesId: false,
                    hiveId:    false
                },
                with: {
                    species: {
                        columns: {
                            id:             true,
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
    requireRole([Role.ANY]),
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
        const [insertResult] = await withStatus("Creating queen entry", () => 
            db.insert(queens).values({
                bornDate:  bornDate,
                speciesId: speciesId,
                hiveId:    hiveId
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
                where: eq(queens.id, insertResult.insertId),
                with: {
                    species: {
                        columns: {
                            id: true,
                            knownAsName: true,
                            lifeExpectancy: true
                        }
                    },
                    hive: {
                        columns: {
                            id: true,
                            name: true
                        }
                    }
                }
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

    //     const { data } = await axios.post<QueenGetModel>("/queen/update", formData)
    //     return QueenGetModel_To_QueenModelDB(data)
    // },

export default router