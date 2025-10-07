import z from "zod";

export const postQuestionSchema = z.object({
  title: z.string(),
  description: z.string(),
  role: z.string(),
  company: z.string(),
  tags: z.array(z.string()),
});
