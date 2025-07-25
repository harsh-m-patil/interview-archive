"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/query/use-user";
import { useModal } from "@/hooks/use-modal-store";
import { QuestionsType } from "@/types";

interface EditQuestionButtonProps {
  question: QuestionsType;
}
export function EditQuestionButton({ question }: EditQuestionButtonProps) {
  const { data: user, isLoading } = useUser();
  const { onOpen } = useModal();

  if (!user || isLoading || question.createdById !== user.id) {
    return null;
  }

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <Button
      onClick={() => onOpen("editQuestion", { questionComplete: question })}
      variant="secondary"
    >
      Edit Question
    </Button>
  );
}
