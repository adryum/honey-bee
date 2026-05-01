import { Router, type Request, type Response } from "express";
import { db, pool } from "../config/Database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { uploadImage } from "../config/image_cloud/Cloudinary";
import { PublicIdBuilder } from "../config/image_cloud/PublicIdBuilder";
import { upload } from "../config/Multer";
import { requireRole } from "../Middleware";
import { UserRoles } from "../DatabaseEnums";
import { getSessionUserRole } from "../config/RedisClient";
import { and, eq, getTableColumns, inArray, gte, lte } from "drizzle-orm";
import { userHiveAccess, hives, userApiaryAccess, apiaries, hiveHoneyYield } from "../db/schema";
import { isValidValue, withStatus } from "../utils";
import { count } from "drizzle-orm";

const router = Router()

router.get('/', requireRole([UserRoles.ANY]), async (
    req: Request<{},{},{}>, 
    res: Response
) => {
    console.log("# Get apiaries");
    const userId = req.session.userId!
    const role   = await getSessionUserRole(userId)

    try {
        console.log("Getting apiaries you have access to " + role);

        var apiariesResult
        switch (role) {
            case UserRoles.ADMINISTRATOR:
                apiariesResult = await db
                    .select({
                        ...getTableColumns(apiaries),
                        hiveCount: count(hives.id)
                    })
                    .from(apiaries)
                    .leftJoin(hives, eq(hives.apiaryId, apiaries.id))
                    .groupBy(apiaries.id)
                break
            default:
                const apiaryAccess = await db.query.userApiaryAccess.findMany({
                    where: eq(userApiaryAccess.userId, userId)
                })

                apiariesResult = await db
                    .select({
                        ...getTableColumns(apiaries),
                        hiveCount: count(hives.id)
                    })
                    .from(apiaries)
                    .leftJoin(hives, eq(hives.apiaryId, apiaries.id))
                    .where(inArray(apiaries.id, apiaryAccess.map(item => item.apiaryId)))
                    .groupBy(apiaries.id)
                break;
        }

        res.status(200).json(apiariesResult)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

router.get(
    "/:id", 
    requireRole([UserRoles.ANY]), 
    async (
        req: Request<{ id: string }>, 
        res: Response
) => {
    console.log("# Get apiary");
    const apiaryId  = parseInt(req.params.id)
    const reqUserId = req.session.userId!
    const role      = await getSessionUserRole(reqUserId)

    try {
        console.log("Checking if user has access to apiary...");
        var hasAccess = true

        if (role !== UserRoles.ADMINISTRATOR) {
            const accessQuery = await db.query.userApiaryAccess.findFirst({
                where: and(
                    eq(userApiaryAccess.userId, reqUserId), 
                    eq(userApiaryAccess.apiaryId, apiaryId)
                )
            })
            hasAccess = Boolean(accessQuery)
        }
        console.log("Done! access: ", hasAccess);
        
        if (!hasAccess) {
            return res.status(403).json({ message: 'Access denied' })
        }

        const apiary = await db.query.apiaries.findFirst({
            where: eq(apiaries.id, apiaryId)
        })

        return res.status(200).json(apiary)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

router.get(
    "/:id/hives",
    requireRole([UserRoles.ANY]),
    async (
        req: Request<{ id: string }>, 
        res: Response
) => {
    console.log("# Get all apiary hives");
    const userId   = req.session.userId!
    const role     = await getSessionUserRole(userId)
    const apiaryId = parseInt(req.params.id)

    try {
        console.log("Getting hives user has access to...");

        var hivesResult
        switch (role) {
            case UserRoles.ADMINISTRATOR:
                hivesResult = await db.query.hives.findMany({
                    where: eq(hives.apiaryId, apiaryId)
                });
                break;
            default:
                const hiveAccess = await db.query.userHiveAccess.findMany({
                    where: eq(userHiveAccess.userId, userId)
                });

                hivesResult = await db.query.hives.findMany({
                    where: and(
                        eq(hives.apiaryId, apiaryId), 
                        inArray(hives.id, hiveAccess.map(item => item.hiveId))
                    )
                });
                break;
        }
        console.log("Done!");

        return res.status(200).json(hivesResult)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

// creates apiary
router.post('/', upload.single("image"), async (req: Request<{},{},{
    name: string
    location: string
    description: string
}>, res: Response) => {
    console.log("# Create apiary");
    const { name, location, description } = req.body
    const image = req.file;

    // missing credentials
    if (!name) 
        return res.status(400).send('incorrect information!') 

    try {
        const [result] = await withStatus("Inserting apirary entry", () =>
            db.insert(apiaries).values({
                name: name,
                description: description,
                location: location,
                userIdCreator: req.session.userId
            })
        )
    
        if (image) {
            // insert image
            const url = await withStatus("Uploading image", async () => {
                const imageKey = new PublicIdBuilder(req.session.userId!.toString()).Apiary(result.insertId.toString()).getResource()
                return await uploadImage(image, imageKey)
            })

            await withStatus("Assigning image url to DB entry", () =>
                db.update(apiaries)
                .set({ imageUrl: url })
                .where(eq(apiaries.id, result.insertId))
            )
        }

        const apiaryGetResult = await withStatus("Getting new entry data", () => db.query.apiaries.findFirst({
            where: eq(apiaries.id, result.insertId)
        }))
        
        res.status(201).json(apiaryGetResult)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})


// creates apiary
router.post(
    "/assignHive", 
    requireRole([UserRoles.ADMINISTRATOR, UserRoles.APIARY_MAINTAINER]),
    async (
        req: Request<{},{},{
            hiveId:   number
            apiaryId: number
        }>, 
        res: Response
) => {
    console.log("# Assign hive to apiary");
    const { hiveId, apiaryId } = req.body

    if (!isValidValue(hiveId) || !isValidValue(apiaryId)) {
        return res.status(400).send('incorrect information!') 
    }

    try {
        const oldHiveData = await withStatus("Getting hive data", 
            () => db.query.hives.findFirst({ 
                where: eq(hives.id, hiveId),
                with: {
                    apiary: {
                        columns: {
                            id: true,
                            name: true
                        }
                    }
                }
            })
        )

        await withStatus("Changing hive apiary", () => db.update(hives)
            .set({ apiaryId: apiaryId })
            .where(eq(hives.id, hiveId))
        )

        const updatedHive = await withStatus("Getting updated entry", 
            () => db.query.hives.findFirst({ 
                columns: {
                    id: true,
                    name: true
                },
                where: eq(hives.id, hiveId),
                with: {
                    apiary: {
                        columns: {
                            id: true,
                            name: true
                        }
                    }
                } 
            })
        )

        const assignGetResult = {
            previousApiary: oldHiveData?.apiary ? {
                id:   oldHiveData.apiary.id,
                name: oldHiveData.apiary.name,
            } : undefined,
            newApiary: {
                id:   updatedHive?.apiary?.id,
                name: updatedHive?.apiary?.name,
            },
            hive: {
                id:   updatedHive?.id,
                name: updatedHive?.name,
            }
        }

        res.status(201).json(assignGetResult)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

router.get(
    "/:id/yields",
    requireRole([UserRoles.ANY]),
    async (
        req: Request<{ id: string }, {}, {}, {
            fromISO: string
            toISO: string
        }>, 
        res: Response
) => {
    console.log("# Get apiary hive yields");
    const apiaryId = parseInt(req.params.id)
    const { toISO, fromISO } = req.query;

    if (!toISO || !fromISO) return res.status(400).send("Invalid credentials!")

    const fromDate = fromISO.split('T')[0]!;
    const toDate   = toISO.split('T')[0]!;

    try {
        // TODO: need to fech hives user has access to
        const hivesResult = await withStatus("Getting apiary hives", 
            () => db.query.hives.findMany({
                columns: { id: true }, 
                where: eq(hives.apiaryId, apiaryId)
            })
        )

        const yieldsGetResult = await withStatus("Getting yields",
            () => db.query.hiveHoneyYield.findMany({
                columns: {
                    hiveId: false
                },
                with: {
                    hive: {
                        columns: {
                            id: true,
                            name: true
                        }
                    }
                },
                where: and(
                    inArray(hiveHoneyYield.hiveId, hivesResult.map(item => item.id)),
                    gte(hiveHoneyYield.creationTimestamp, fromDate),
                    lte(hiveHoneyYield.creationTimestamp, toDate)
                )
            })
        )

        return res.status(200).json(yieldsGetResult);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

export default router
