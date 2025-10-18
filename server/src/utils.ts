import { db } from "./config/Database";

export async function testConnection() {
  try {
    await db.query("SELECT 1");
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
    return typeof number === "number"
}

export const toMySQLUTCDateTime = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
};

export function getCurrentUTCDateString(): string {
    return toMySQLUTCDateTime(new Date())
}
