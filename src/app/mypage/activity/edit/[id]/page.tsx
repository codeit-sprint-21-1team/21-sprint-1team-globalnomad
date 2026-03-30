import MyactivityForm from "../../create/_components/MyactivityForm";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <MyactivityForm mode="edit" activityId={Number(id)} />;
}
