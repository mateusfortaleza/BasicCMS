import { content, contentFields, contentType } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getDb } from "./BaseDTO";

export async function getAllContent() {
  return await getDb()
    .select({
      id: content.id,
      name: content.name,
      contentTypeId: content.contentTypeId,
      contentTypeName: contentType.contentTypeName,
    })
    .from(content)
    .innerJoin(contentType, eq(content.contentTypeId, contentType.contentTypeId));
}

export async function getContentById(id: number) {
  return await getDb()
    .select()
    .from(content)
    .where(eq(content.id, id));
}

export async function getContentFieldsByContentId(contentId: number) {
  return await getDb()
    .select()
    .from(contentFields)
    .where(eq(contentFields.contentId, contentId));
}

export async function insertContent(name: string, contentTypeId: string) {
  return await getDb()
    .insert(content)
    .values({ name, contentTypeId })
    .returning({ id: content.id });
}

export async function insertContentFields(
  contentId: number,
  fields: { contentTypeFieldId: number; value: string }[],
) {
  return await getDb()
    .insert(contentFields)
    .values(fields.map((field) => ({ contentId, ...field })));
}

export async function updateContent(
  id: number,
  name: string,
  contentTypeId: string,
) {
  return await getDb()
    .update(content)
    .set({ name, contentTypeId })
    .where(eq(content.id, id));
}

export async function updateContentField(id: number, value: string) {
  return await getDb()
    .update(contentFields)
    .set({ value })
    .where(eq(contentFields.id, id));
}

export async function deleteContentFieldsByContentId(contentId: number) {
  return await getDb()
    .delete(contentFields)
    .where(eq(contentFields.contentId, contentId));
}

export async function deleteContent(id: number) {
  return await getDb().delete(content).where(eq(content.id, id));
}
