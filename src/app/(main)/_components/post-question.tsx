"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";

export function PostQuestion() {
  const { onOpen } = useModal();
  return (
    <Button onClick={() => onOpen("postQuestion")}>
      <Plus />{" "}
    </Button>
  );
}
