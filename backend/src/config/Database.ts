import { drizzle, MySql2Database } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import { requireEnv } from '../utils'
import * as schema from "../db/schema"
import * as relations from "../db/relations"

type Schema = typeof schema & typeof relations;

export const pool = mysql.createPool({
    host:     requireEnv("MYSQL_HOST"),
    user:     requireEnv("MYSQL_USER"),
    password: requireEnv("MYSQL_PASSWORD"),
    database: requireEnv("MYSQL_DATABASE"),
})

export const db: MySql2Database<Schema> = drizzle(pool, { 
    schema: { ...schema, ...relations },
    mode:   'default'
})