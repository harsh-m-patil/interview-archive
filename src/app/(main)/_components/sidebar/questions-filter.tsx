import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { db } from "@/lib/db";
import { CompaniesSelect, TagsSelect } from "./select";

export const QuestionFilters = async () => {
  const [tags, companies] = await Promise.all([
    db.tag.findMany(),
    db.company.findMany(),
  ]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Filters</SidebarGroupLabel>
      <SidebarMenu className="px-2">
        <TagsSelect tags={tags} />
        <CompaniesSelect companies={companies} />
      </SidebarMenu>
    </SidebarGroup>
  );
};
