import { db } from './server'

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