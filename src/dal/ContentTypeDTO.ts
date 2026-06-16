import { contentType, contentTypeFields } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getDb } from "./BaseDTO";

type ContentTypeFieldType = "string" | "number" | "datetime" | "image";

export async function getAllContentTypes() {
  return await getDb().select().from(contentType);
}

export async function getContentTypeById(id: number) {
  return await getDb()
    .select()
    .from(contentType)
    .where(eq(contentType.id, id));
}

export async function getContentTypeFieldsByContentTypeId(
  contentTypeId: number,
) {
  return await getDb()
    .select()
    .from(contentTypeFields)
    .where(eq(contentTypeFields.contentTypeId, contentTypeId));
}

export async function getAllContentTypeFields() {
  return await getDb()
    .select()
    .from(contentTypeFields);
}

export async function insertContentType(
  contentTypeId: string,
  contentTypeName: string,
) {
  return await getDb()
    .insert(contentType)
    .values({ contentTypeId, contentTypeName })
    .returning({ id: contentType.id });
}

export async function insertContentTypeFields(
  contentTypeId: number,
  fields: { fieldName: string; fieldType: ContentTypeFieldType }[],
) {
  return await getDb()
    .insert(contentTypeFields)
    .values(fields.map((field) => ({ contentTypeId, ...field })));
}

export async function updateContentType(
  id: number,
  contentTypeId: string,
  contentTypeName: string,
) {
  return await getDb()
    .update(contentType)
    .set({ contentTypeId, contentTypeName })
    .where(eq(contentType.id, id));
}

export async function updateContentTypeField(
  id: number,
  contentTypeId: number,
  fieldName: string,
  fieldType: ContentTypeFieldType,
) {
  return await getDb()
    .update(contentTypeFields)
    .set({ fieldName, fieldType })
    .where(
      and(
        eq(contentTypeFields.id, id),
        eq(contentTypeFields.contentTypeId, contentTypeId),
      ),
    );
}

export async function deleteContentType(id: number) {
  return await getDb()
    .delete(contentType)
    .where(eq(contentType.id, id));
}
