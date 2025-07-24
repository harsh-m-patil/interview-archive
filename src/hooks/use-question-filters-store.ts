import { Company, Group, Role, Tag } from "@/generated/prisma";
import { create } from "zustand";
import { produce } from "immer";

export interface QuestionFilterData {
  Tags: Tag[];
  Companies: Company[];
  Roles: Role[];
  Groups: Group[];
}

interface QuestionFiltersStore {
  filters: QuestionFilterData;
  toggleTag: (tag: Tag) => void;
  toggleCompany: (company: Company) => void;
  toggleGroup: (group: Group) => void;
  resetFilters: () => void;
}

export const useQuestionFilter = create<QuestionFiltersStore>((set, get) => ({
  filters: {
    Tags: [],
    Companies: [],
    Roles: [],
    Groups: [],
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
  toggleCompany: (company) => {
    const exists = get().filters.Companies.some((c) => c.id === company.id);
    if (exists) {
      set(
        produce((state: QuestionFiltersStore) => {
          state.filters.Companies = state.filters.Companies.filter(
            (c) => c.id !== company.id,
          );
        }),
      );
    } else {
      set(
        produce((state: QuestionFiltersStore) => {
          state.filters.Companies.push(company);
        }),
      );
    }
  },
  toggleGroup: (group) => {
    const exists = get().filters.Groups.some((g) => g.id === group.id);
    if (exists) {
      set(
        produce((state: QuestionFiltersStore) => {
          state.filters.Groups = state.filters.Groups.filter(
            (g) => g.id !== group.id,
          );
        }),
      );
    } else {
      set(
        produce((state: QuestionFiltersStore) => {
          state.filters.Groups.push(group);
        }),
      );
    }
  },
  resetFilters: () =>
    set({ filters: { Tags: [], Companies: [], Roles: [], Groups: [] } }),
}));
