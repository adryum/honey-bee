import { db } from './server'

export async function testConnection() {
  try {
    await db.query("SELECT 1");
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
}

export function col(table: string, column: string) {
  return `${table}.${column}`;
}