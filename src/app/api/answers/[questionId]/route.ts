import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ questionId: string }> },
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json("Login Please", { status: 401 });
    }

    const { questionId } = await params;

    if (!questionId) {
      return NextResponse.json("QuestionId is required", { status: 400 });
    }

    const { content, contentLink } = await request.json();

    const answer = await db.answer.create({
      data: {
        questionId,
        content,
        contentLink,
        createdById: session.user.id,
      },
    });

    return NextResponse.json(answer, { status: 201 });
  } catch (error) {
    console.error("[ANSWERS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
