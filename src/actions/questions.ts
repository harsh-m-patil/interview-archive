import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import type z from "zod";
import { db } from "@/db";
import { user } from "@/db/schema/auth";
import { companiesTable, questionsTable } from "@/db/schema/questions";
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
  "use server";
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

export async function getQuestion(questionId: string) {
  "use server";
  try {
    const [question] = await db
      .select({
        title: questionsTable.title,
        description: questionsTable.description,
        company: companiesTable.name,
        aiAnswer: questionsTable.aiAnswer,
        userName: user.name,
        userImage: user.image,
      })
      .from(questionsTable)
      .leftJoin(companiesTable, eq(companiesTable.id, questionsTable.companyId))
      .leftJoin(user, eq(user.id, questionsTable.postedBy))
      .where(eq(questionsTable.id, questionId));

    if (!question) {
      return {
        status: "failed",
        reason: "NOT_FOUND",
        message: "Question not found",
        data: null,
      } as const;
    }

    return {
      status: "success",
      message: "Question fetched successfully",
      data: question,
    } as const;
  } catch (error) {
    console.error(error);
    return {
      status: "failed",
      reason: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch question",
      data: null,
    } as const;
  }
}
