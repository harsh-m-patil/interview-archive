import { db } from "@/lib/db";
import { Select } from "./select";

export const QuestionFilters = async () => {
  const [tags, companies] = await Promise.all([
    db.tag.findMany(),
    db.company.findMany(),
  ]);

  return <Select tags={tags} companies={companies} />;
};
