"use client";

import { useUser } from "@/hooks/query/use-user";
import { redirect } from "next/navigation";

export default function Home() {
  const { isLoading, data } = useUser();

  if (isLoading) {
    return null;
  }

  if (!data) {
    return redirect("/sign-in");
  }

  return redirect("/questions");
}
