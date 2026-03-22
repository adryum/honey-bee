import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import { requireEnv } from '../utils'
import * as schema from "../db/schema"

export const pool = mysql.createPool({
    host:     requireEnv("MYSQL_HOST"),
    user:     requireEnv("MYSQL_USER"),
    password: requireEnv("MYSQL_PASSWORD"),
    database: requireEnv("MYSQL_DATABASE"),
})

export const db = drizzle(pool, { schema, mode: 'default' })