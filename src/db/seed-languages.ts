import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { language } from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

const db = drizzle(databaseUrl);

await db
  .insert(language)
  .values([
    { language: "English", langCode: "en" },
    { language: "Japanese", langCode: "ja" },
  ])
  .onConflictDoNothing();

console.log("Languages seeded");
