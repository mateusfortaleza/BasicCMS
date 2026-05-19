import 'dotenv/config';
import { heroCard } from '@/db/schema';
import { eq } from 'drizzle-orm';
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

export async function getAllHeroCards() {
  const resultOfQuery = await getDb()?.select({id: heroCard.id, image_path: heroCard.backgroundImage, title_text: heroCard.title, color: heroCard.overlayColor, link: heroCard.link}).from(heroCard);
  return resultOfQuery;
}

export async function getHeroCardById(id: number) {
  const result = await getDb()?.select({id: heroCard.id, image_path: heroCard.backgroundImage, title_text: heroCard.title, color: heroCard.overlayColor, link: heroCard.link}).from(heroCard).where(eq(heroCard.id, id)).limit(1);
  return result[0];
}

export async function insertion(image_path: string, title_text: string, color: string, link: string) {
  return await getDb()?.insert(heroCard).values({backgroundImage: image_path, overlayColor: color, title: title_text, link: link})
}

export async function updateHeroCard(id: number, image_path: string, title_text: string, color: string, link: string) {
  return await getDb()?.update(heroCard).set({backgroundImage: image_path, overlayColor: color, title: title_text, link: link}).where(eq(heroCard.id, id));
}