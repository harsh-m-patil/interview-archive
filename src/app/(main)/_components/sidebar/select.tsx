"use client";

import { Company, Tag } from "@/generated/prisma";
import { GroupsSelect } from "./selectors";
import { Suspense } from "react";
import { CollapsibleSelect } from "./collapsible-selector";
import { useQuestionFilter } from "@/hooks/use-question-filters-store";
import { Building, Tags } from "lucide-react";

interface Props {
  companies: Company[];
  tags: Tag[];
}

export const Select = ({ tags, companies }: Props) => {
  const { toggleTag, toggleCompany } = useQuestionFilter();
  return (
    <>
      <Suspense>
        <div>
          <CollapsibleSelect
            data={tags}
            queryKey="tags"
            onToggle={toggleTag}
            icon={<Tags className="size-4" />}
          />
          <CollapsibleSelect
            data={companies}
            queryKey="companies"
            onToggle={toggleCompany}
            icon={<Building className="size-4" />}
          />
          <GroupsSelect />
        </div>
      </Suspense>
    </>
  );
};
