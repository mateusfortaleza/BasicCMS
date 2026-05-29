import EditMenu from "@/components/menu-components/edit-menu";
import { getMenuItemsById } from "@/dal/MenuDTO";
import { notFound } from "next/navigation";

export default async function MenuEditPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = Number(params.id);
  const menuItems = await getMenuItemsById(id);
  const menuItem = menuItems?.[0]

  if (!menuItem) {
    notFound();
  }

  return (
    <>
      <EditMenu title="Edit Menu" menuItems={menuItem}/>
    </>
  )
}
