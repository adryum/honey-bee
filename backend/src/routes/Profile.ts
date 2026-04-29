import { Router, type Request, type Response } from "express";
import { db } from "../config/Database";
import { UserRoles } from "../DatabaseEnums";
import { requireRole } from "../Middleware";
import { isValidValue } from "../utils";
import { eq } from "drizzle-orm";
import { users } from "../db/schema";

const router = Router()

router.get(
    '/me',
    requireRole([UserRoles.ANY]), 
    async (
        req: Request, 
        res: Response
) => {
    console.log("# Get other user profile");
    const userId = req.session.userId!

    if (!isValidValue(userId)) {
        return res.status(401).send('incorrect credentials!')
    }

    try {
        const userResult = await db.query.users.findFirst({
            where: eq(users.id, userId),
            columns: {
                id:       true,
                username: true,
                email:    true,
                role:     true,
                imageUrl: true
            }
        })

        return res.status(200).json(userResult);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

router.get(
    '/:id',
    requireRole([UserRoles.ANY]), 
    async (
        req: Request<{ id: string }>, 
        res: Response
) => {
    console.log("# Get other user profile");
    const userId = parseInt(req.params.id)

    if (!isValidValue(userId)) {
        return res.status(401).send('incorrect credentials!')
    }

    try {
        const userResult = await db.query.users.findFirst({
            where: eq(users.id, userId),
            columns: {
                id:       true,
                username: true,
                email:    true,
                role:     true,
                imageUrl: true
            }
        })

        return res.status(200).json(userResult);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

export default router
