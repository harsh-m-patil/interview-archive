"use client";

import { trpc } from "@/trpc/client";
import { QuestionCard } from "./card";

export const QuestionsList = () => {
  const { data: api, isLoading } = trpc.questions.get.useQuery();

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
          <QuestionCard key={question.id} question={question} tags={[]} />
        ))
      )}
    </div>
  );
};
