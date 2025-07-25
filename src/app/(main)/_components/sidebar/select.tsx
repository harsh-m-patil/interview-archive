"use client";

import { Company, Role, Tag } from "@/generated/prisma";
import { GroupsSelect } from "./selectors";
import { Suspense } from "react";
import { CollapsibleSelect } from "./collapsible-selector";
import { useQuestionFilter } from "@/hooks/use-question-filters-store";
import { Building, Tags, UserSearch } from "lucide-react";

interface Props {
  companies: Company[];
  tags: Tag[];
  roles: Role[];
}

export const Select = ({ tags, companies, roles }: Props) => {
  const { toggleTag, toggleCompany, toggleRole } = useQuestionFilter();
  return (
    <>
      <Suspense>
        <CollapsibleSelect
          data={{ type: "tag", data: tags }}
          queryKey="tags"
          onToggle={toggleTag}
          icon={<Tags className="size-4" />}
        />
        <CollapsibleSelect
          data={{ type: "company", data: companies }}
          queryKey="companies"
          onToggle={toggleCompany}
          icon={<Building className="size-4" />}
        />
        <CollapsibleSelect
          data={{ type: "role", data: roles }}
          queryKey="roles"
          onToggle={toggleRole}
          icon={<UserSearch className="size-4" />}
        />
        <GroupsSelect />
      </Suspense>
    </>
  );
};
