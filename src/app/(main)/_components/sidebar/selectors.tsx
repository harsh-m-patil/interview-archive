"use client";
import { useQuestionFilter } from "@/hooks/use-question-filters-store";
import { useGroups } from "@/hooks/query/use-groups";
import { CollapsibleSelect } from "./collapsible-selector";
import { Users } from "lucide-react";

export const GroupsSelect = () => {
  const { data, isLoading, error, isError } = useGroups();

  const { toggleGroup } = useQuestionFilter();

  if (isLoading) {
    return <p className="text-muted-foreground px-2">Loading groups...</p>;
  }
  if (isError) {
    return (
      <p className="text-red-500 px-2">Error loading groups: {error.message}</p>
    );
  }
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground px-2">No groups found.</p>;
  }
  return (
    <CollapsibleSelect
      data={data}
      queryKey="groups"
      onToggle={toggleGroup}
      icon={<Users className="size-4" />}
    />
  );
};
