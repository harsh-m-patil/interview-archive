import { Company, Question, Role, Tag, User } from "./generated/prisma";

export type QuestionsType = Question & {
  createdBy: User;
  tags: Tag[];
  Company?: Company | null;
  role: Role | null;
};
