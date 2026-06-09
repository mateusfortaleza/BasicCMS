import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllHeroCards } from "../../../dal/HeroCardDTO";
import { RiAddLargeFill } from "@remixicon/react";
import HeroCardTable from "@/components/herocard-components/herocard-table";

export default async function editHomePage() {
  const heroCards = await getAllHeroCards();
  // const sortedHeroCards = [...heroCard].sort((a, b) =>
  //   a.id < b.id ? -1 : a.id > b.id ? 1 : 0,
  // );

  return (
    <>
        <Button className="ml-370" type="button" data-icon="inline-end">
          <RiAddLargeFill color="rgba(255,255,255,1)" />
          <Link href="/herocard/create">
            Create New
          </Link>
        </Button>
      <div className="w-full">
        <HeroCardTable heroCards={heroCards}/>
      </div>
    </>
  );
}
