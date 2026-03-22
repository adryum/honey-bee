import { defineConfig } from 'drizzle-kit'
import { requireEnv } from '../utils'

export default defineConfig({
    schema:        'backend/src/db/schema.ts',
    out:           './migrations',
    dialect:       'mysql',
    dbCredentials: {
        host:     requireEnv("MYSQL_HOST"),
        user:     requireEnv("MYSQL_USER"),
        password: requireEnv("MYSQL_PASSWORD"),
        database: requireEnv("MYSQL_DATABASE"),
    },
})


