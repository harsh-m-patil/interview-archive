"use client";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import { cn } from "@/lib/utils";
import { useQuestionFilter } from "@/hooks/use-question-filters-store";
import { Company, Tag } from "@/generated/prisma";

interface Props {
  tags: Tag[];
}

export const TagsSelect = ({ tags }: Props) => {
  const [selectedTagNames, setSelectedTagNames] = useQueryState(
    "tags",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const { toggleTag } = useQuestionFilter();

  const onToggleTag = (tag: Tag) => {
    toggleTag(tag);

    setSelectedTagNames((prev) => {
      if (prev.includes(tag.name)) {
        return prev.filter((name) => name !== tag.name);
      } else {
        return [...prev, tag.name];
      }
    });
  };

  return (
    <>
      <p className="text-foreground px-2 text-md border p-2 rounded-md bg-background/20">
        Tags
      </p>
      {tags.map((tag) => {
        const isSelected = selectedTagNames.includes(tag.name);
        return (
          <SidebarMenuItem
            key={tag.id}
            className={cn(
              "cursor-pointer text-sm px-2 py-1 rounded-md",
              isSelected && "bg-muted font-semibold",
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
  const [selectedCompanyNames, setSelectedCompanyNames] = useQueryState(
    "companies",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const { toggleCompany } = useQuestionFilter();

  const onToggleCompany = (company: Company) => {
    toggleCompany(company);

    setSelectedCompanyNames((prev) => {
      if (prev.includes(company.name)) {
        return prev.filter((name) => name !== company.name);
      } else {
        return [...prev, company.name];
      }
    });
  };

  return (
    <>
      <p className="text-foreground px-2 text-md border p-2 rounded-md bg-background/20">
        Companies
      </p>
      {companies.map((company) => {
        const isSelected = selectedCompanyNames.includes(company.name);
        return (
          <SidebarMenuItem
            key={company.id}
            className={cn(
              "cursor-pointer text-sm px-2 py-1 rounded-md",
              isSelected && "bg-muted font-semibold",
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
