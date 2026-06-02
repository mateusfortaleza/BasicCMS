import { getDb } from "./BaseDTO";
import { heroCard } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getAllHeroCards() {
  const resultOfQuery = await getDb()?.select({id: heroCard.id, image_path: heroCard.backgroundImage, title_text: heroCard.title, color: heroCard.overlayColor, link: heroCard.link}).from(heroCard).where(eq(heroCard.isDeleted, false));
  return resultOfQuery;
}

export async function getHeroCardById(id: number) {
  const result = await getDb()?.select({id: heroCard.id, image_path: heroCard.backgroundImage, title_text: heroCard.title, color: heroCard.overlayColor, link: heroCard.link}).from(heroCard).where(and(eq(heroCard.id, id), eq(heroCard.isDeleted, false))).limit(1);
  return result[0];
}

export async function insertHeroCard(image_path: string, title_text: string, color: string, link: string) {
  return await getDb()?.insert(heroCard).values({backgroundImage: image_path, overlayColor: color, title: title_text, link: link})
}

export async function updateHeroCard(id: number, image_path: string, title_text: string, color: string, link: string) {
  return await getDb()?.update(heroCard).set({backgroundImage: image_path, overlayColor: color, title: title_text, link: link}).where(eq(heroCard.id, id));
}

export async function deleteHeroCard(id: number) {
  return await getDb()?.update(heroCard).set({isDeleted: true}).where(eq(heroCard.id, id))
}