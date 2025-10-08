"use client";

import { useQueryState } from "nuqs";
import { useDebouncedValue } from "@/hooks/useDebounce";
import { trpc } from "@/trpc/client";
import { QuestionCard } from "./card";

export const QuestionsList = () => {
  const [search, _] = useQueryState("search");

  const DEBOUNCE_TIME = 300;
  const debouncedSearch = useDebouncedValue(search, DEBOUNCE_TIME);
  const { data: api, isLoading } = trpc.questions.get.useQuery({
    search: debouncedSearch,
  });

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (api?.status === "failed") {
    return <div>Error: {api.message}</div>;
  }

  if (!api || api.data.length === 0) {
    return <div>No Question found</div>;
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        api.data.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))
      )}
    </div>
  );
};
