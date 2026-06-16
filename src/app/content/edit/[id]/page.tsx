import EditContent from "@/components/content-components/edit-content";
import {
  getContentById,
  getContentFieldsByContentId,
} from "@/dal/ContentDTO";
import {
  getAllContentTypeFields,
} from "@/dal/ContentTypeDTO";
import { notFound } from "next/navigation";

export default async function ContentEditPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await props.params;
  const id = Number(rawId);

  if (!Number.isInteger(id) || id < 1) {
    notFound();
  }

  const [contentItems, contentItemFields, contentTypeFields] =
    await Promise.all([
      getContentById(id),
      getContentFieldsByContentId(id),
      getAllContentTypeFields(),
    ]);

  const contentItem = contentItems[0];

  if (!contentItem) {
    notFound();
  }

  return (
    <EditContent
      contentItem={contentItem}
      contentItemFields={contentItemFields}
      contentTypeFields={contentTypeFields}
    />
  );
}
