import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllMenuItems } from "@/dal/MenuDAO";
import { RiAddLargeFill } from "@remixicon/react";
import MenuTable from "@/components/menu-table";

export default async function MenuListingPage() {
  const menuItems = await getAllMenuItems();
  const sortedMenuItems = [...menuItems].sort((a, b) => a.id - b.id);

  return (
    <>
      <div className="w-full">
        <Link href="/menu/create">
          <Button type="button" data-icon="inline-end">
            Create New
            <RiAddLargeFill color="rgba(255,255,255,1)" />
          </Button>
        </Link>
        <MenuTable menuItems={sortedMenuItems} />
      </div>
    </>
  );
}
