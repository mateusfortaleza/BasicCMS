import MenuTable from "@/components/menu-table"
import { getAllMenuItems } from "@/dal/MenuDAO"

export default async function MenuListingPage() {
  const menuItems = await getAllMenuItems();
  
  return (
    <>
      <MenuTable menuItems={menuItems}/>
    </>
  )
}
