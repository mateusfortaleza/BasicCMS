import EditContentType from "@/components/content-type-components/edit-content-type";
import {
  getContentTypeById,
  getContentTypeFieldsByContentTypeId,
} from "@/dal/ContentTypeDTO";
import { notFound } from "next/navigation";

export default async function ContentTypeEditPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = Number(params.id);

  if (!Number.isInteger(id) || id < 1) {
    notFound();
  }

  const contentTypes = await getContentTypeById(id);
  const contentTypeItem = contentTypes?.[0];

  if (!contentTypeItem) {
    notFound();
  }

  const contentTypeFields =
    await getContentTypeFieldsByContentTypeId(contentTypeItem.contentTypeId);

  return (
    <EditContentType
      title="Edit Content Type"
      contentTypeItem={contentTypeItem}
      contentTypeFields={contentTypeFields}
    />
  );
}
