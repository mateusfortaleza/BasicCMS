import { getAllContent } from "@/dal/ContentDTO";
import { getAllContentTypes } from "@/dal/ContentTypeDTO";
import ContentTable from "@/components/content-components/content-table";
import SelectContentTypeDialog from "@/components/content-components/select-content-type-dialog";

export default async function ContentListingPage() {
  const [contentItems, contentTypes] = await Promise.all([
    getAllContent(),
    getAllContentTypes(),
  ]);

  return (
    <>
      <SelectContentTypeDialog contentTypes={contentTypes} />

      <div className="w-full">
        <ContentTable contentItems={contentItems} />
      </div>
    </>
  );
}
