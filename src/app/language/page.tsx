import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllLanguages } from "@/dal/LanguageDTO";
import { RiAddLargeFill } from "@remixicon/react";
import LanguageTable from "@/components/language-components/language-table";

export default async function LanguageListingPage() {
  const languages = await getAllLanguages();
  const sortedLanguages = [...languages].sort((a, b) =>
    a.langCode.localeCompare(b.langCode),
  );

  return (
    <div className="w-full">
      <Button asChild className="ml-370" type="button" data-icon="inline-end">
        <Link href="/language/create">
          Create New
          <RiAddLargeFill color="rgba(255,255,255,1)" />
        </Link>
      </Button>
      <LanguageTable languages={sortedLanguages} />
    </div>
  );
}
