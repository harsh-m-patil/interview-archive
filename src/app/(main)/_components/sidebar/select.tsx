"use client";

import { SidebarMenuItem } from "@/components/ui/sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useQuestionFilter } from "@/hooks/use-question-filters-store";
import { Company, Tag } from "@/generated/prisma";

interface Props {
  tags: Tag[];
}

export const TagsSelect = ({ tags }: Props) => {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const { toggleTag } = useQuestionFilter();

  const onToggleTag = (tag: Tag) => {
    toggleTag(tag);
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag.name)) {
        next.delete(tag.name);
      } else {
        next.add(tag.name);
      }
      return next;
    });
  };

  return (
    <>
      <p className="text-foreground px-2 text-md border p-2 rounded-md bg-background/20">
        Tags
      </p>
      {tags.map((tag) => {
        const isSelected = selectedTags.has(tag.name);
        return (
          <SidebarMenuItem
            key={tag.id}
            className={cn(
              "cursor-pointer text-sm px-2 py-1 rounded-md",
              isSelected && "bg-muted font-semibold"
            )}
            onClick={() => onToggleTag(tag)}
          >
            {tag.name}
          </SidebarMenuItem>
        );
      })}
    </>
  );
};

export const CompaniesSelect = ({ companies }: { companies: Company[] }) => {
  const [selectedCompanies, setSelectedCompanies] = useState<Set<string>>(
    new Set()
  );
  const { toggleCompany } = useQuestionFilter();

  const onToggleCompany = (company: Company) => {
    toggleCompany(company);
    setSelectedCompanies((prev) => {
      const next = new Set(prev);
      if (next.has(company.name)) {
        next.delete(company.name);
      } else {
        next.add(company.name);
      }
      return next;
    });
  };

  return (
    <>
      <p className="text-foreground px-2 text-md border p-2 rounded-md bg-background/20">
        Companies
      </p>
      {companies.map((company) => {
        const isSelected = selectedCompanies.has(company.name);
        return (
          <SidebarMenuItem
            key={company.id}
            className={cn(
              "cursor-pointer text-sm px-2 py-1 rounded-md",
              isSelected && "bg-muted font-semibold"
            )}
            onClick={() => onToggleCompany(company)}
          >
            {company.name}
          </SidebarMenuItem>
        );
      })}
    </>
  );
};
