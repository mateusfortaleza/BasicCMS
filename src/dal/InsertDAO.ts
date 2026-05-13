import { heroCard } from '@/db/schema';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';

export const databaseUrl = process.env.DATABASE_URL!;
let db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set. Add it to .env before querying hero cards.");
  }

  db ??= drizzle(databaseUrl);
  return db;
}

export async function insertion(image_path: string, title_text: string, color: string, link: string) {
  await getDb()?.insert(heroCard).values({backgroundImage: image_path, overlayColor: color, title: title_text, link: link})
}