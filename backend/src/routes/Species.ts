import { Role } from "../DatabaseEnums"
import { requireRole } from "../Middleware"
import { Router, type Request, type Response } from "express";
import { withStatus } from "../utils";
import { db } from "../config/Database";
import { species } from "../db/schema";
import { eq } from "drizzle-orm";

const router = Router()

router.get(
    "/",
    requireRole([Role.ANY]),
    async (
        req: Request<{},{},{}, { }>, 
        res: Response
) => {
    console.log("# Get species");

    try {
        const species = await withStatus(`Fetching bee species`, () => {
            return db.query.species.findMany({})
        })

        res.status(200).json(species)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

router.post(
    "/",
    requireRole([Role.ANY]),
    async (
        req: Request<{},{},{
            knownAsDate:    string
            scientificName: string
            description:    string
            behavior:       string
            preferences:    string
        }, {}>, 
        res: Response
) => {
    console.log("# Create specie");
    const { knownAsDate, scientificName, description, behavior, preferences } = req.body

    try {
        const [insertResult] = await withStatus(`Inserting specie`, () => {
            return db.insert(species).values({
                knownAsName:    knownAsDate,
                scientificName: scientificName,
                description:    description,
                behavior:       behavior,
                preferences:    preferences
            })
        })

        const speciesResult = await withStatus(`Fetching inserted specie`, () => 
            db.query.species.findFirst({
                where: eq(species.id, insertResult.insertId)
            })
        )

        res.status(200).json(speciesResult)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

router.put(
    "/:id",
    requireRole([Role.ANY]),
    async (
        req: Request<{ id: string },{},{
            knownAsName:    string
            scientificName: string
            description:    string
            behavior:       string
            preferences:    string
        }, {}>, 
        res: Response
) => {
    console.log("# Update specie");
    const id = Number(req.params.id)
    const { knownAsName, scientificName, description, behavior, preferences } = req.body

    try {
        await withStatus(`Updating specie`, () => {
            return db.update(species)
                .set({
                    knownAsName,
                    scientificName,
                    description,
                    behavior,
                    preferences
                })
                .where(eq(species.id, id))
        })

        const speciesResult = await withStatus(`Fetching updated specie`, () => 
            db.query.species.findFirst({
                where: eq(species.id, id)
            })
        )
        
        res.status(200).json(speciesResult)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

export default router
