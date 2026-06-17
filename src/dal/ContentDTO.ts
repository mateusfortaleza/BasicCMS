import { content, contentFields, contentType, contentTypeFields } from "@/db/schema";
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

async function getAllContentWithFieldsByType(contentTypeId: string) {
  const rows = await getDb()
    .select({
      id: content.id,
      name: content.name,
      contentTypeId: content.contentTypeId,
      contentTypeName: contentType.contentTypeName,
      fieldName: contentTypeFields.fieldName,
      fieldValue: contentFields.value,
    })
    .from(content)
    .innerJoin(contentType, eq(content.contentTypeId, contentType.contentTypeId))
    .innerJoin(contentFields, eq(contentFields.contentId, content.id))
    .innerJoin(
      contentTypeFields,
      eq(contentFields.contentTypeFieldId, contentTypeFields.id),
    )
    .where(eq(content.contentTypeId, contentTypeId));

  const contentById = new Map<
    number,
    {
      id: number;
      name: string;
      contentTypeId: string;
      contentTypeName: string;
      fields: Record<string, string>;
    }
  >();

  for (const row of rows) {
    const item = contentById.get(row.id) ?? {
      id: row.id,
      name: row.name,
      contentTypeId: row.contentTypeId,
      contentTypeName: row.contentTypeName,
      fields: {},
    };

    item.fields[row.fieldName] = row.fieldValue;
    contentById.set(row.id, item);
  }

  return Array.from(contentById.values());
}

export async function getAllHeroCardsWithFields() {
  return getAllContentWithFieldsByType("hero_card");
}

export async function getAllMenuWithFields() {
  return getAllContentWithFieldsByType("menu");
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
