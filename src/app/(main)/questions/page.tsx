"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export default function QuestionsPage() {
  const { onOpen } = useModal();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Questions Page</h1>
      <Button onClick={() => onOpen("postQuestion")}>Post a Question</Button>
    </div>
  );
}
