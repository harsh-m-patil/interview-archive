"use client";

import { SidebarMenuItem } from "@/components/ui/sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useQuestionFilter } from "@/hooks/use-question-filters-store";

interface Tag {
  id: string;
  name: string;
}

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
      {tags.map((tag) => {
        const isSelected = selectedTags.has(tag.name);
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
