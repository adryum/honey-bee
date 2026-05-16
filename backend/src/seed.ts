import { sql } from 'drizzle-orm';
import { db } from './config/Database';
import { HistoryActionType } from './DatabaseEnums';
import { historyActionTypes } from './db/schema';

async function seed() {
    await db.insert(historyActionTypes)
        .values(Object.values(HistoryActionType).map(type => ({ type })))
        .onDuplicateKeyUpdate({ set: { type: sql`type` } });
    
    console.log('Seeded history_action_types');
    process.exit(0);
}

seed().catch(console.error);