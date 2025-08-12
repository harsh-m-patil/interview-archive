import { google } from "@ai-sdk/google";
import {
  stepCountIs,
  tool,
  streamText,
  UIMessage,
  convertToModelMessages,
} from "ai";
import { getSYSTEM_PROMPT_INTERVIEW_AGENT } from "@/lib/prompts";
import z from "zod";
import { db } from "@/lib/db";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    model,
    interviewMode,
  }: { messages: UIMessage[]; model: string; interviewMode: boolean } =
    await req.json();

  const result = streamText({
    model: google(model),
    messages: convertToModelMessages(messages),
    system: getSYSTEM_PROMPT_INTERVIEW_AGENT({
      interviewerMode: interviewMode,
    }),
    tools: {
      getInterviewQuestions: tool({
        description: "Get interview questions from the database",
        inputSchema: z.object({
          role: z
            .string()
            .describe("The role for which to get interview questions"),
          company: z
            .string()
            .optional()
            .describe("The company for which to get interview questions"),
          tags: z
            .array(z.string())
            .optional()
            .describe("Tags to filter interview questions"),
        }),
        execute: async ({ role, company, tags }) => {
          const whereClause: Record<string, unknown> = {};
          if (tags && tags.length > 0) {
            whereClause.tags = {
              some: {
                name: {
                  in: tags,
                },
              },
            };
          }
          if (role) {
            whereClause.role = {
              name: role.toLowerCase(),
            };
          }
          if (company) {
            whereClause.Company = {
              name: company,
            };
          }

          console.log(whereClause);
          const questions = await db.question.findMany({
            where: whereClause,
            include: {
              role: true,
              Company: true,
              tags: true,
            },
          });

          return questions;
        },
      }),
    },
    stopWhen: stepCountIs(5),
  });

  // send sources and reasoning back to the client
  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  });
}
