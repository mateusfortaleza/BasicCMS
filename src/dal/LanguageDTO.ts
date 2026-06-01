import { language } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getDb } from "./BaseDTO";

export async function getAllLanguages() {
  return await getDb().select().from(language);
}

export async function getLanguageById(id: string) {
  return await getDb().select().from(language).where(eq(language.id, id));
}

export async function insertLanguage(languageName: string, langCode: string) {
  return await getDb()
    .insert(language)
    .values({ language: languageName, langCode });
}

export async function updateLanguage(
  id: string,
  languageName: string,
  langCode: string,
) {
  return await getDb()
    .update(language)
    .set({ language: languageName, langCode })
    .where(eq(language.id, id));
}

export async function deleteLanguage(id: string) {
  return await getDb().delete(language).where(eq(language.id, id));
}
