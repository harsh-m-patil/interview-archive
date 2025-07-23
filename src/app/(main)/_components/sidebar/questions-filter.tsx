import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { db } from "@/lib/db";
import { TagsSelect } from "./tags-select";

export const QuestionFilters = async () => {
  const tags = await db.tag.findMany();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Filters</SidebarGroupLabel>
      <SidebarMenu className="px-2">
        <TagsSelect tags={tags} />
      </SidebarMenu>
    </SidebarGroup>
  );
};
