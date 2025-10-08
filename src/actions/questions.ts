"use server";

import { headers } from "next/headers";
import type z from "zod";
import { db } from "@/db";
import { questionsTable } from "@/db/schema/questions";
import { auth } from "@/lib/auth";
import type { postQuestionSchema } from "@/lib/zod-schemas";

// biome-ignore lint/correctness/noUnusedVariables: Will be fixed after adding multiselect for tags
type postQuestionFormData = z.infer<typeof postQuestionSchema>;

type createQuestionResponse =
  | {
      status: "success";
      message: string;
      prevState?: {
        title: string | null;
        description: string | null;
        company: string | null;
        role: string | null;
      };
      data: {
        id: string;
      };
    }
  | {
      status: "failed";
      message: string;
      prevState?: {
        title: string | null;
        description: string | null;
        company: string | null;
        role: string | null;
      };
    };

// TODO: change to a api endpoint later to be able to return http status codes like 400,401
// By default server actions only return 200 and 500 and 404 and be returned using the
// notFound() function from "next/navigation"
export async function createQuestion(
  _: unknown,
  formData: FormData
): Promise<createQuestionResponse> {
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
      status: "success",
      message: "Question created successfully",
      data: question,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "failed",
      message: "Failed to create question",
      prevState: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        company: formData.get("company") as string,
        role: formData.get("role") as string,
      },
    };
  }
}
