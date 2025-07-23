"use client";

import { useQuestionFilter } from "@/hooks/use-question-filters-store";
import { PostQuestion } from "../_components/post-question";
import { Questions } from "../_components/questions";

export default function QuestionsPage() {
  const { filters } = useQuestionFilter();
  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-center">
        Questions Posted By the Community
      </h1>
      <div className="mb-6">
        <PostQuestion />
      </div>
      <Questions filters={filters} />
    </div>
  );
}
