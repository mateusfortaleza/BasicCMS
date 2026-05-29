import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllMenuItems } from "@/dal/MenuDTO";
import { RiAddLargeFill } from "@remixicon/react";
import MenuTable from "@/components/menu-components/menu-table";

export default async function MenuListingPage() {
  const menuItems = await getAllMenuItems();
  const sortedMenuItems = [...menuItems].sort((a, b) => a.id - b.id);

  return (
    <>
      <div className="w-full">
        <Button type="button" data-icon="inline-end">
          <Link href="/menu/create">
            Create New
            <RiAddLargeFill color="rgba(255,255,255,1)" />
          </Link>
        </Button>
        <MenuTable menuItems={sortedMenuItems} />
      </div>
    </>
  );
}
