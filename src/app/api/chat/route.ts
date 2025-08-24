import { google } from "@ai-sdk/google";
import {
  stepCountIs,
  tool,
  streamText,
  UIMessage,
  convertToModelMessages,
} from "ai";
import { getSYSTEM_PROMPT_INTERVIEW_AGENT } from "@/lib/prompts";
import { getCompanies, getInterviewQuestions, getTags } from "@/lib/tools";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    model,
    interviewMode,
  }: { messages: UIMessage[]; model: string; interviewMode: boolean } =
    await req.json();

  const providerOptions = {
    google: {
      thinkingConfig: {
        thinkingBudget: 4096,
        includeThoughts: true,
      },
    },
  };

  const result = streamText({
    model: google(model),
    messages: convertToModelMessages(messages),
    providerOptions: model === "gemini-2.5-flash" ? providerOptions : undefined,
    system: getSYSTEM_PROMPT_INTERVIEW_AGENT({
      interviewerMode: interviewMode,
    }),
    tools: {
      getInterviewQuestions,
      getCompanies,
      getTags,
    },
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  });
}
