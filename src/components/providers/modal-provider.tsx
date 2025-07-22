"use client";

import { useEffect, useState } from "react";
import { PostQuestionModal } from "@/components/modals/post-question-modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PostQuestionModal />
    </>
  );
}
