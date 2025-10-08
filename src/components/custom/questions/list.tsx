"use client";

import { useQueryState } from "nuqs";
import { useDebouncedValue } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { QuestionCard } from "./card";

export const QuestionsList = () => {
  const [search] = useQueryState("search");
  const [layout] = useQueryState("layout");
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
    <div
      // TODO: Add animation for layout shifts using framer motion
      className={cn(
        "mt-6 grid gap-4",
        layout === "grid"
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1"
      )}
    >
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
