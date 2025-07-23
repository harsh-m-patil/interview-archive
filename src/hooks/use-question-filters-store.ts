import { Company, Role, Tag } from "@/generated/prisma";
import { create } from "zustand";
import { produce } from "immer";

export interface QuestionFilterData {
  Tags: Tag[];
  Companies: Company[];
  Roles: Role[];
}

interface QuestionFiltersStore {
  filters: QuestionFilterData;
  toggleTag: (tag: Tag) => void;
  resetFilters: () => void;
}

export const useQuestionFilter = create<QuestionFiltersStore>((set, get) => ({
  filters: {
    Tags: [],
    Companies: [],
    Roles: [],
  },
  toggleTag: (tag) => {
    const exists = get().filters.Tags.some((t) => t.id === tag.id);
    if (exists) {
      set(
        produce((state: QuestionFiltersStore) => {
          state.filters.Tags = state.filters.Tags.filter(
            (t) => t.id !== tag.id,
          );
        }),
      );
    } else {
      set(
        produce((state: QuestionFiltersStore) => {
          state.filters.Tags.push(tag);
        }),
      );
    }
  },
  resetFilters: () => set({ filters: { Tags: [], Companies: [], Roles: [] } }),
}));
