import { QuestionsType } from "@/types";
import { QuestionFilterData } from "../use-question-filters-store";
import { useQuery } from "@tanstack/react-query";

export const useQuestions = (filters: QuestionFilterData) => {
  return useQuery({
    queryKey: ["questions", filters],
    queryFn: () => fetchQuestions({ filters }),
    staleTime: 1000 * 60 * 1,
  });
};

async function fetchQuestions({
  filters,
}: {
  filters: QuestionFilterData;
}): Promise<QuestionsType[]> {
  try {
    const tags = filters.Tags.map((tag) => tag.id).join(",");
    const companies = filters.Companies.map((company) => company.id).join(",");
    const groups = filters.Groups.map((group) => group.id).join(",");

    const params = new URLSearchParams();
    if (tags) params.set("tags", tags);
    if (companies) params.set("companies", companies);
    if (groups) params.set("groups", groups);

    const url = `/api/questions${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}
