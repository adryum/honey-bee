import dotenv from "dotenv";
dotenv.config()

import { eq, sql } from 'drizzle-orm';
import { db } from './config/Database';
import { HistoryActionType, UserRoles } from './DatabaseEnums';
import { historyActionTypes, queenSpecies, whitelist } from './db/schema';
import { withStatus } from './utils';
import species from '../species.json';
import "./type_extensions/DateExtensions"
import "./type_extensions/ObjectExtensions"

async function seed() {
    await withStatus("Seeded history_action_types", () => 
        db.insert(historyActionTypes)
            .values(Object.values(HistoryActionType).map(type => ({ type })))
            .onDuplicateKeyUpdate({ set: { type: sql`type` } }
        )
    )

    await withStatus("Seeded queen_species", () =>
        db.insert(queenSpecies) 
            .values(species.map(item => ({
                knownAsName:    item.knownAsName,
                scientificName: item.scientificName,
                lifeExpectancy: item.lifeExpectancy,
                description:    item.description,
                behavior:       item.behavior,
                preferences:    item.preferences,
            })))
            .onDuplicateKeyUpdate({ set: { scientificName: sql`scientific_name` } })
    )

    const query = db.insert(whitelist).values({
        email:  "adiskir@gmail.com",
        role:   UserRoles.ADMINISTRATOR,
        status: true,
        userId: 0
    }).onDuplicateKeyUpdate({ set: { email: sql`email`, status: sql`VALUES(status)` } })

    console.log(query.toSQL())

    await withStatus("Seeded admin acc", async () => {
        await db.delete(whitelist).where(eq(whitelist.email, "adiskir@gmail.com"));
        await db.insert(whitelist).values({
            email:  "adiskir@gmail.com",
            role:   UserRoles.ADMINISTRATOR,
            status: true
        });
    })
    process.exit(0);
}

seed().catch(console.error);