import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllHeroCards } from "../../../dal/HeroCardDTO";
import { RiAddLargeFill } from "@remixicon/react";
import HeroCardTable from "@/components/herocard-components/herocard-table";

export default async function editHomePage() {
  const heroCards = await getAllHeroCards();
  const sortedHeroCards = [...heroCards].sort((a, b) =>
    a.id < b.id ? -1 : a.id > b.id ? 1 : 0,
  );

  return (
    <>
      <div className="w-full">
        <Link href="/herocard/create">
          <Button className="ml-370" type="button" data-icon="inline-end">
            Create New<RiAddLargeFill color="rgba(255,255,255,1)" />
          </Button>
        </Link>
        <HeroCardTable heroCards={sortedHeroCards} />
      </div>
    </>
  );
}
