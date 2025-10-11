import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { questionsTable } from "@/db/schema/questions";
import { completionsSchema } from "@/lib/zod-schemas";

export const maxDuration = 30;

export async function POST(req: Request) {
  const rawBody = await req.json();

  const validatedBody = completionsSchema.safeParse(rawBody);

  if (validatedBody.error) {
    return new Response("Invalid request body", { status: 400 });
  }

  const { prompt, questionId } = validatedBody.data;

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system:
      "Answer this interview question as if you are a interviewee and provide an ideal answer. Do not",
    prompt,
    providerOptions: {
      google: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    },
    onFinish: async ({ text }) => {
      await db
        .update(questionsTable)
        .set({ aiAnswer: text })
        .where(eq(questionsTable.id, questionId));
    },
  });

  return result.toUIMessageStreamResponse();
}
