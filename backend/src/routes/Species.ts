import { UserRoles } from "../DatabaseEnums"
import { requireRole } from "../Middleware"
import { Router, type Request, type Response } from "express";
import { withStatus } from "../utils";
import { db } from "../config/Database";
import { eq } from "drizzle-orm";
import { queenSpecies } from "../db/schema";

const router = Router()

router.get(
    "/",
    requireRole([UserRoles.ANY]),
    async (
        req: Request<{},{},{}, { }>, 
        res: Response
) => {
    console.log("# Get species");

    try {
        const species = await withStatus(`Fetching bee species`, () => {
            return db.query.queenSpecies.findMany({})
        })

        res.status(200).json(species)
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
            knownAsDate:    string
            scientificName: string
            lifeExpectancy: string
            description:    string
            behavior:       string
            preferences:    string
        }, {}>, 
        res: Response
) => {
    console.log("# Create specie");
    const { knownAsDate, scientificName, description, behavior, preferences, lifeExpectancy } = req.body

    try {
        const [insertResult] = await withStatus(`Inserting specie`, () => {
            return db.insert(queenSpecies).values({
                knownAsName:    knownAsDate,
                scientificName: scientificName,
                lifeExpectancy: lifeExpectancy,
                description:    description,
                behavior:       behavior,
                preferences:    preferences
            })
        })

        const speciesResult = await withStatus(`Fetching inserted specie`, () => 
            db.query.queenSpecies.findFirst({
                where: eq(queenSpecies.id, insertResult.insertId)
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
    requireRole([UserRoles.ANY]),
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
            return db.update(queenSpecies)
                .set({
                    knownAsName,
                    scientificName,
                    description,
                    behavior,
                    preferences
                })
                .where(eq(queenSpecies.id, id))
        })

        const speciesResult = await withStatus(`Fetching updated specie`, () => 
            db.query.queenSpecies.findFirst({
                where: eq(queenSpecies.id, id)
            })
        )
        
        res.status(200).json(speciesResult)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

export default router
