import EditPage from "../../../../../components/herocard-components/edit-herocard";
import { getHeroCardById } from "@/dal/HeroCardDTO";

export default async function HeroCardEditPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang_code?: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const id = params.id;
  const lang = searchParams.lang_code ?? "en";
  const heroCard = await getHeroCardById(id, lang);

  return (
    <>
        <EditPage title="Edit Page" heroCard={heroCard} />
    </>
  );
}
