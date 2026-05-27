import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { PgTable, TableConfig } from 'drizzle-orm/pg-core';

const databaseUrl = process.env.DATABASE_URL!;
let db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set. Add it to .env before querying hero cards.");
  }

  db ??= drizzle(databaseUrl);
  return db;
}

export async function getTableData(tableName: PgTable<TableConfig>) {
  return await getDb()?.select().from(tableName);
}