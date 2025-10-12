/** biome-ignore-all lint/style/noMagicNumbers: Strict rule not needed */
import z from "zod";

export const postQuestionSchema = z.object({
  title: z.string(),
  description: z.string(),
  role: z.string(),
  company: z.string(),
  tags: z.array(z.string()),
});

const MAX_LENGTH = 30;
const LIMIT = 30;

export const getQuestionsInputSchema = z.object({
  search: z.string().min(2).max(MAX_LENGTH).optional().nullable(),
  role: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(LIMIT).optional().default(10),
});

export const getQuestionInputSchema = z.object({
  id: z.uuid(),
});

export const completionsSchema = z.object({
  prompt: z.string(),
  questionId: z.uuid(),
});

export const answerSchema = z.object({
  content: z
    .string()
    .min(2)
    .max(5000, "Answer must be between 2 and 5000 characters"),
  questionId: z.uuid(),
});

export const aiEvaluationSchema = z.object({
  score: z.number().min(0).max(10).describe("Score from 0 to 10"),
  verdict: z.string().min(1).max(1000).describe("Verdict of the answer"),
  strengths: z.array(z.string()).describe("Strengths of the answer"),
  issues: z.array(z.string()).describe("Issues with the answer"),
  suggestions: z.array(z.string()).describe("Suggestions for improvement"),
  isCorrect: z.boolean(),
});

export type AIEvaluation = z.infer<typeof aiEvaluationSchema>;
