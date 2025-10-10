import z from "zod";

export const postQuestionSchema = z.object({
  title: z.string(),
  description: z.string(),
  role: z.string(),
  company: z.string(),
  tags: z.array(z.string()),
});

const MAX_LENGTH = 30;
const LIMIT = 10;
export const getQuestionsInputSchema = z.object({
  search: z.string().min(2).max(MAX_LENGTH).optional().nullable(),
  role: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(LIMIT).optional(),
});

export const getQuestionInputSchema = z.object({
  id: z.uuid(),
});

export const completionsSchema = z.object({
  prompt: z.string(),
  questionId: z.uuid(),
});
