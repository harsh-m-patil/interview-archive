import { Question, Tag, User } from "./generated/prisma";

export type QuestionsWithUser = Question & {
  createdBy: User;
  tags: Tag[];
};
