import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { language } from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

const sql = neon(databaseUrl);
const db = drizzle({ client: sql });

await db
  .insert(language)
  .values([
    { language: "English", langCode: "en" },
    { language: "Japanese", langCode: "ja" },
  ])
  .onConflictDoNothing();

console.log("Languages seeded");
