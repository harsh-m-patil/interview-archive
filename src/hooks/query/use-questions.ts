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
    const tags = filters.Tags.map((tag) => tag.name).join(",");
    const companies = filters.Companies.map((company) => company.name).join(
      ",",
    );
    let url = `/api/questions`;

    if (tags || companies) {
      url += `?`;
    }

    if (tags) {
      url += `tags=${tags}`;
    }

    if (companies) {
      if (tags) {
        url += `&`;
      }
      url += `companies=${companies}`;
    }

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
