import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const { question, questionLink } = await request.json();

    const createdQuestion = await db.question.create({
      data: {
        question,
        questionLink,
        createdById: session.user.id,
      },
    });

    return NextResponse.json(createdQuestion, { status: 201 });
  } catch (error) {
    console.log("[QUESTIONS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const questions = await db.question.findMany();

    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.log("[QUESTIONS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
