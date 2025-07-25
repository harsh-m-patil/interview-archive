import { db } from "@/lib/db";
import { Select } from "./select";

export const QuestionFilters = async () => {
  const [tags, companies, roles] = await Promise.all([
    db.tag.findMany(),
    db.company.findMany(),
    db.role.findMany(),
  ]);

  return <Select tags={tags} companies={companies} roles={roles} />;
};
