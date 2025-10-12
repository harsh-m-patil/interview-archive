import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { answersTable } from "@/db/schema/questions";
import { aiEvaluationSchema } from "@/lib/zod-schemas";

export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    question,
    answer,
    answerId,
  }: { question: string; answer: string; answerId: string } = await req.json();

  const result = streamObject({
    model: google("gemini-2.0-flash"),
    providerOptions: {
      google: {
        structuredOutputs: true,
      },
    },
    schema: aiEvaluationSchema,
    messages: [
      {
        role: "system",
        content:
          "Evaluate the answer to the question based on the following criteria: clarity, accuracy, relevance, and completeness.",
      },
      {
        role: "user",
        content: `Question: ${question}\n\nAnswer: ${answer}`,
      },
    ],
    onFinish: async ({ object, error }) => {
      if (!error) {
        await db
          .update(answersTable)
          .set({
            aiEvaluation: object,
          })
          .where(eq(answersTable.id, answerId));
      }
    },
  });

  return result.toTextStreamResponse();
}
