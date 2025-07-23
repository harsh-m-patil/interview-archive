import { useQuestionFilter } from "@/hooks/use-question-filters-store";
import { QuestionsCard } from "./questions-card";
import { useQuestions } from "@/hooks/query/use-questions";

export const Questions = () => {
  const { filters } = useQuestionFilter();
  const { isLoading, data: questions } = useQuestions(filters);

  if (isLoading || !questions) {
    return null;
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-muted-foreground mb-2">
          <svg
            className="mx-auto h-12 w-12 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">
          No questions found
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          {filters.Tags.length > 0
            ? "Try adjusting your filters or be the first to post a question with these tags."
            : "Be the first to post a question to the community."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {questions.map((question) => (
        <QuestionsCard key={question.id} question={question} />
      ))}
    </div>
  );
};
