"use client";

import { useCompletion } from "@ai-sdk/react";

import { Button } from "./ui/button";
import MarkdownRenderer from "@/components/ui/markdown-renderer";
import { Sparkles } from "lucide-react";
import { Question } from "@/generated/prisma";
import { toast } from "sonner";

export function AI({ question }: { question: Question }) {
  const { completion, complete, error, isLoading } = useCompletion({
    api: "/api/completion",
  });

  const prompt = `Title: ${question.title},Content: ${question.content}`;

  return (
    <div className="border p-2 rounded-md shadow-md bg-background">
      <div className="flex justify-between px-4 py-2">
        <p className="flex gap-2 items-center justify-center">
          <Sparkles /> AI Generated Answer
        </p>
        <Button
          onClick={async () => {
            toast.success("Generating AI answer...");
            await complete(prompt, {
              body: {
                questionId: question.id,
              },
            });
          }}
          disabled={isLoading || typeof question.aiAnswer === "string"}
        >
          Generate
        </Button>
      </div>

      <div className="p-4">
        {question.aiAnswer ? (
          <MarkdownRenderer content={question.aiAnswer} id="content" />
        ) : (
          <MarkdownRenderer content={completion} id="ai" />
        )}
        {error && (
          <div className="text-red-500 mt-2">
            <p>Error: {error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
