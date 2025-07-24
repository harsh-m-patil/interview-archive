"use client";
import { useQuestionFilter } from "@/hooks/use-question-filters-store";
import { useGroups } from "@/hooks/query/use-groups";
import { CollapsibleSelect } from "./collapsible-selector";
import { Loader, Users } from "lucide-react";

export const GroupsSelect = () => {
  const { data, isLoading, error, isError } = useGroups();

  const { toggleGroup } = useQuestionFilter();

  if (isLoading) {
    return (
      <Loader className="size-4 animate-spin text-muted-foreground px-2" />
    );
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
      // @ts-expect-error
      data={data}
      queryKey="groups"
      // @ts-expect-error
      onToggle={toggleGroup}
      icon={<Users className="size-4" />}
    />
  );
};
