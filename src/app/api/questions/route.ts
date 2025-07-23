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

    const { title, link, content, tags } = await request.json();

    const createdQuestion = await db.question.create({
      data: {
        title,
        content,
        link,
        createdById: session.user.id,
        tags: tags?.length
          ? {
              connect: tags.map((tagId: string) => ({ id: tagId })),
            }
          : undefined,
      },
      include: {
        tags: true,
        createdBy: true,
      },
    });

    return NextResponse.json(createdQuestion, { status: 201 });
  } catch (error) {
    console.error("[QUESTIONS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tags = searchParams.get("tags")?.split(",").filter(Boolean) || [];

    const questions = await db.question.findMany({
      where:
        tags.length > 0
          ? {
              tags: {
                some: {
                  name: {
                    in: tags,
                  },
                },
              },
            }
          : {},
      include: {
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error("[QUESTIONS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
