import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllContentTypes } from "@/dal/ContentTypeDTO";
import { RiAddLargeFill } from "@remixicon/react";
import ContentTypeTable from "@/components/content-type-components/content-type-table";

export default async function ContentTypeListingPage() {
  const contentTypes = await getAllContentTypes();

  return (
    <>
      <Button className="ml-370" type="button" data-icon="inline-end">
        <RiAddLargeFill color="rgba(255,255,255,1)" />
        <Link href="/content-type/create">Create New</Link>
      </Button>

      <div className="w-full">
        <ContentTypeTable contentTypes={contentTypes} />
      </div>
    </>
  );
}
