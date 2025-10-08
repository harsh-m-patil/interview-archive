"use client";

import { trpc } from "@/trpc/client";
import { QuestionsSelect } from ".";

export function CompanySelect() {
  const { data, status } = trpc.companies.get.useQuery();
  return <QuestionsSelect data={data} status={status} title="Company" />;
}
