import { getDb } from "./BaseDTO";
import { heroCardFields } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getAllHeroCards() {
  const resultOfQuery = await getDb()?.select({id: heroCardFields.id, image_path: heroCardFields.backgroundImage, title_text: heroCardFields.title, color: heroCardFields.overlayColor, link: heroCardFields.link, lang_code: heroCardFields.language_id}).from(heroCardFields).where(eq(heroCardFields.isDeleted, false));
  return resultOfQuery;
}

export async function getHeroCardById(id: string) {
  const result = await getDb()?.select({id: heroCardFields.id, image_path: heroCardFields.backgroundImage, title_text: heroCardFields.title, color: heroCardFields.overlayColor, link: heroCardFields.link, lang_code: heroCardFields.language_id}).from(heroCardFields).where(and(eq(heroCardFields.id, id), eq(heroCardFields.isDeleted, false))).limit(1);
  return result[0];
}

export async function insertHeroCard(image_path: string, title_text: string, color: string, link: string) {
  return await getDb()?.insert(heroCardFields).values({backgroundImage: image_path, overlayColor: color, title: title_text, link: link})
}

export async function updateHeroCard(id: string, image_path: string, title_text: string, color: string, link: string) {
  return await getDb()?.update(heroCardFields).set({backgroundImage: image_path, overlayColor: color, title: title_text, link: link}).where(eq(heroCardFields.id, id));
}

export async function deleteHeroCard(id: string) {
  return await getDb()?.update(heroCardFields).set({isDeleted: true}).where(eq(heroCardFields.id, id))
}
