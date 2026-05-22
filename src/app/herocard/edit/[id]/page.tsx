import EditPage from "../../../../components/edit-page";
import { getHeroCardById } from "@/dal/HeroCardDAO";

/**
 * Renders the edit page for a hero card identified by route parameters.
 *
 * @param props - Component props.
 * @param props.params - A promise that resolves to an object containing the route `id` as a string; the `id` is converted to a number and used to load the hero card.
 * @returns A React element that displays an EditPage populated with the hero card fetched for the given `id`.
 */
export default async function HeroCardEditPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = Number(params.id);
  const heroCard = await getHeroCardById(id);

  return (
    <>
        <EditPage title="Edit Page" heroCard={heroCard} />
    </>
  );
}
