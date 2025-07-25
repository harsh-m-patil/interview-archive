"use client";
import { useQuestionFilter } from "@/hooks/use-question-filters-store";
import { useGroups } from "@/hooks/query/use-groups";
import { CollapsibleSelect } from "./collapsible-selector";
import { Loader, Users } from "lucide-react";
import { useCompanies } from "@/hooks/query/use-companies";
import { useTags } from "@/hooks/query/use-tags";
import { useRouter } from "next/router";
import { useRoles } from "@/hooks/query/use-roles";

const GroupsSelect = () => {
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
      data={{ type: "group", data }}
      queryKey="groups"
      onToggle={toggleGroup}
      icon={<Users className="size-4" />}
    />
  );
};

const CompaniesSelect = () => {
  const { data, isLoading, error, isError } = useCompanies();
  const { toggleCompany } = useQuestionFilter();
  if (isLoading) {
    return (
      <Loader className="size-4 animate-spin text-muted-foreground px-2" />
    );
  }
  if (isError) {
    return (
      <p className="text-red-500 px-2">
        Error loading companies: {error.message}
      </p>
    );
  }
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground px-2">No companies found.</p>;
  }
  return (
    <CollapsibleSelect
      data={{ type: "company", data: data }}
      queryKey="companies"
      onToggle={toggleCompany}
      icon={<Users className="size-4" />}
    />
  );
};

const TagsSelect = () => {
  const { data, isLoading, error, isError } = useTags();
  const { toggleTag } = useQuestionFilter();
  if (isLoading) {
    return (
      <Loader className="size-4 animate-spin text-muted-foreground px-2" />
    );
  }
  if (isError) {
    return (
      <p className="text-red-500 px-2">Error loading tags: {error.message}</p>
    );
  }
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground px-2">No tags found.</p>;
  }
  return (
    <CollapsibleSelect
      data={{ type: "tag", data }}
      queryKey="tags"
      onToggle={toggleTag}
      icon={<Users className="size-4" />}
    />
  );
};

const RolesSelect = () => {
  const { data, isLoading, error, isError } = useRoles();
  const { toggleRole } = useQuestionFilter();

  if (isLoading) {
    return (
      <Loader className="size-4 animate-spin text-muted-foreground px-2" />
    );
  }
  if (isError) {
    return (
      <p className="text-red-500 px-2">Error loading roles: {error.message}</p>
    );
  }
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground px-2">No roles found.</p>;
  }

  return (
    <CollapsibleSelect
      data={{ type: "role", data }}
      queryKey="roles"
      onToggle={toggleRole}
      icon={<Users className="size-4" />}
    />
  );
};

export const QuestionFilters = () => {
  return (
    <>
      <TagsSelect />
      <CompaniesSelect />
      <RolesSelect />
      <GroupsSelect />
    </>
  );
};
