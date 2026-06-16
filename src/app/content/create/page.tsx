import CreateContent from "@/components/content-components/create-content";
import {
  getContentTypeById,
  getContentTypeFieldsByContentTypeId,
} from "@/dal/ContentTypeDTO";
import { notFound } from "next/navigation";

export default async function ContentCreatePage(props: {
  searchParams: Promise<{ contentTypeId?: string }>;
}) {
  const searchParams = await props.searchParams;
  const contentTypeId = Number(searchParams.contentTypeId);

  if (!Number.isInteger(contentTypeId) || contentTypeId < 1) {
    notFound();
  }

  const [contentTypes, contentTypeFields] = await Promise.all([
    getContentTypeById(contentTypeId),
    getContentTypeFieldsByContentTypeId(contentTypeId),
  ]);

  const contentTypeItem = contentTypes[0];

  if (!contentTypeItem) {
    notFound();
  }

  return (
    <CreateContent
      contentType={contentTypeItem}
      contentTypeFields={contentTypeFields}
    />
  );
}
