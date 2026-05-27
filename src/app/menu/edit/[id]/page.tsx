export default async function MenuEditPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  return <h1>Edit Menu Item {params.id}</h1>;
}
