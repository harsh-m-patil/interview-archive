"use server";

import { headers } from "next/headers";
import { db } from "@/db";
import { questionsTable } from "@/db/schema/questions";
import { auth } from "@/lib/auth";

export async function createQuestion(prevState: unknown, formData: FormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        status: "failed",
        message: "Please log in",
      };
    }

    const [question] = await db
      .insert(questionsTable)
      .values({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        companyId: formData.get("company") as string,
        postedBy: session?.session.userId,
        isDeleted: false,
      })
      .returning({ id: questionsTable.id });

    return {
      question,
    };
  } catch (error) {
    console.error(error);
  }
}
