import { sql } from 'drizzle-orm';
import { db } from './config/Database';
import { HistoryActionType } from './DatabaseEnums';
import { historyActionTypes, queenSpecies } from './db/schema';
import { withStatus } from './utils';
import species from '../species.json';

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
            .onDuplicateKeyUpdate({ set: { scientificName: sql`scientificName` } })
    )
    
    process.exit(0);
}

seed().catch(console.error);