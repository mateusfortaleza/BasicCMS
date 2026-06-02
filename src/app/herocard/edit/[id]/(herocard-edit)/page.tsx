import EditPage from "../../../../../components/herocard-components/edit-herocard";
import { getHeroCardById } from "@/dal/HeroCardDTO";

export default async function HeroCardEditPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const heroCard = await getHeroCardById(id);

  return (
    <>
        <EditPage title="Edit Page" heroCard={heroCard} />
    </>
  );
}
