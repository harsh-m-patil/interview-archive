"use client";

import { useQueryState } from "nuqs";
import { Loading } from "@/components/custom/loading";
import { useDebouncedValue } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { QuestionCard } from "./card";

export const QuestionsList = () => {
  const [search] = useQueryState("search");
  const [layout] = useQueryState("layout");
  const DEBOUNCE_TIME = 300;

  const debouncedSearch = useDebouncedValue(search, DEBOUNCE_TIME);
  const {
    data: api,
    isLoading,
    error,
    isError,
  } = trpc.questions.get.useQuery({
    search: debouncedSearch,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="flex h-96 items-center justify-center text-5xl text-rose-300 tracking-tighter">
        Error: {error.message}
      </div>
    );
  }

  if (!api || api.data.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center text-5xl text-muted-foreground tracking-tighter">
        No Question found
      </div>
    );
  }

  return (
    <div
      // TODO: Add animation for layout shifts using framer motion
      className={cn(
        "mt-6 grid gap-4",
        layout === "flex"
          ? "grid-cols-1"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
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
