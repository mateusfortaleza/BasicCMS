import EditLanguage from "@/components/language-components/edit-language";
import { getLanguageById } from "@/dal/LanguageDTO";
import { notFound } from "next/navigation";

export default async function LanguageEditPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const languageItems = await getLanguageById(params.id);
  const languageItem = languageItems?.[0];

  if (!languageItem) {
    notFound();
  }

  return <EditLanguage title="Edit Language" languageItem={languageItem} />;
}
