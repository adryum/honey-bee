import { pool } from "./config/Database";
import { redisClient } from "./config/RedisClient";
import { Role } from "./DatabaseEnums";

export async function testConnection() {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
}

export function handleSearchWord(word: string): string {
    return (!word) ? '%' : (word.charAt(0) != '%') ? word = word.concat('%') : word
}

export function col(table: string, column: string): string {
  return `${table}.${column}`;
}

export function isNumber(number: unknown) {
    return typeof number === "number" && Number.isFinite(number)
}

export const toMySQLUTCDateTime = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
};

export function getCurrentUTCDateString(): string {
    return toMySQLUTCDateTime(new Date())
}

export function isValidValue(value: unknown): value is NonNullable<typeof value> {
    if (value === null || value === undefined) return false
    if (typeof value === 'number') return !Number.isNaN(value)
    if (typeof value === 'string') return value !== ''
    if (typeof value === 'boolean') return value
    return true
}

export function requireEnv(name: string): string {
    const value = process.env[name]
    if (value === undefined) throw new Error(`Missing environment variable: ${name}`)
    return value
}

export async function withStatus<T>(label: string, fn: () => T |Promise<T>): Promise<T> {
    const start = Date.now()
    try {
        const result = await Promise.resolve(fn())
        // if (isDev) 
        console.log(`✓ ${label} (${Date.now() - start}ms)`)
        return result
    } catch (err) {
        console.log(`✗ ${label} failed (${Date.now() - start}ms)`)  // always log errors
        throw err
    }
}