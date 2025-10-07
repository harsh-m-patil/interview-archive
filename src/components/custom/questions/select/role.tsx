import { trpc } from "@/trpc/client";
import { QuestionsSelect } from ".";

export function RoleSelect() {
  const { data, status } = trpc.roles.get.useQuery();
  return <QuestionsSelect data={data} status={status} title="Role" />;
}
