import { getDb } from "./BaseDTO";
import { heroCardFields, heroCard } from "@/db/schema";
import { and, eq } from "drizzle-orm";

// Hero Card Fields Table
export async function getAllHeroCardFields() {
  return await getDb()
    .select({
      id: heroCardFields.id,
      image_path: heroCardFields.backgroundImage,
      title_text: heroCardFields.title,
      color: heroCardFields.overlayColor,
      link: heroCardFields.link,
      lang_code: heroCardFields.languageId,
    })
    .from(heroCardFields)
}

export async function insertHeroCardFields(
  image_path: string,
  title_text: string,
  color: string,
  link: string,
  heroCardId: number,
  languageId: string,
) {
  return await getDb()
    .insert(heroCardFields)
    .values({
      heroCardId: heroCardId,
      backgroundImage: image_path,
      overlayColor: color,
      title: title_text,
      link: link,
      languageId,
    });
}

export async function updateHeroCardFields(
  id: string,
  image_path: string,
  title_text: string,
  color: string,
  link: string,
) {
  return await getDb()
    .update(heroCardFields)
    .set({
      backgroundImage: image_path,
      overlayColor: color,
      title: title_text,
      link: link,
    })
    .where(eq(heroCardFields.id, id));
}

// export async function deleteHeroCardFields(id: string) {
//   return await getDb()
//     .update(heroCardFields)
//     .set({ isDeleted: true })
//     .where(eq(heroCardFields.id, id));
// }

export async function getHeroCardById(id: string, lang_code: string) {
  const result = await getDb()
    .select({
      id: heroCardFields.id,
      heroCardId: heroCard.id,
      heroCardName: heroCard.heroCardName,
      image_path: heroCardFields.backgroundImage,
      title_text: heroCardFields.title,
      color: heroCardFields.overlayColor,
      link: heroCardFields.link,
      lang_code: heroCardFields.languageId,
    })
    .from(heroCardFields)
    .innerJoin(heroCard, eq(heroCardFields.heroCardId, heroCard.id))
    .where(
      and(
        eq(heroCardFields.heroCardId, Number(id)),
        eq(heroCard.isHeroCardDeleted, false),
        eq(heroCardFields.languageId, lang_code)
      )
    )
    .limit(1);

  if (result[0]) return result[0];

  const fallback = await getDb()
    .select({
      heroCardId: heroCard.id,
      heroCardName: heroCard.heroCardName,
      image_path: heroCardFields.backgroundImage,
      title_text: heroCardFields.title,
      color: heroCardFields.overlayColor,
      link: heroCardFields.link,
    })
    .from(heroCardFields)
    .innerJoin(heroCard, eq(heroCardFields.heroCardId, heroCard.id))
    .where(
      and(
        eq(heroCardFields.heroCardId, Number(id)),
        eq(heroCard.isHeroCardDeleted, false)
      )
    )
    .limit(1);

  if (!fallback[0]) return undefined;

  const [createdFields] = await getDb()
    .insert(heroCardFields)
    .values({
      heroCardId: fallback[0].heroCardId,
      backgroundImage: "",
      title: "",
      overlayColor: "",
      link: "",
      languageId: lang_code,
    })
    .returning({ id: heroCardFields.id });

  return {
    id: createdFields.id,
    heroCardId: fallback[0].heroCardId,
    heroCardName: fallback[0].heroCardName,
    image_path: "",
    title_text: "",
    color: "",
    link: "",
    lang_code,
  };
}

// Hero Card Tables
export async function getAllHeroCards() {
  return await getDb().select().from(heroCard).where(eq(heroCard.isHeroCardDeleted, false));
}

export async function updateHeroCardName(id: number, heroCardName: string) {
  return await getDb().update(heroCard).set({ heroCardName }).where(eq(heroCard.id, id))
}

export async function insertHeroCard(heroCardName: string) {
  return await getDb()
    .insert(heroCard)
    .values({ heroCardName })
    .returning({ id: heroCard.id });
}

export async function deleteHeroCard(HeroCardId: number) {
  return await getDb().update(heroCard).set({ isHeroCardDeleted: true }).where(eq(heroCard.id, HeroCardId))
}
