"use client";

import { Streamdown } from "streamdown";
import { Button } from "@/components/ui/button";

export function AiAnswer({
  questionId,
  aiAnswer,
}: {
  questionId: string;
  aiAnswer: string | null;
}) {
  return (
    <div className="border-t px-4 py-3">
      <div className="flex items-center justify-between">
        <h3 className="mr-2 font-semibold text-lg md:text-xl">
          AI Generated Answer
        </h3>
        <Button disabled={!!aiAnswer} variant="secondary">
          Generate
        </Button>
      </div>
      {aiAnswer ? (
        <Streamdown className="max-w-5xl text-foreground/80">
          {aiAnswer}
        </Streamdown>
      ) : null}
    </div>
  );
}
