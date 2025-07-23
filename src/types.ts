import { Company, Question, Tag, User } from "./generated/prisma";

export type QuestionsType = Question & {
  createdBy: User;
  tags: Tag[];
  Company?: Company;
};
