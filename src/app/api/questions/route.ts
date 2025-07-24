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
      return NextResponse.json("Login Please", { status: 401 });
    }

    const { title, link, content, tags, companyId, groupId } =
      await request.json();

    const createdQuestion = await db.question.create({
      data: {
        title,
        content,
        link,
        groupId,
        createdById: session.user.id,
        tags: tags?.length
          ? {
              connect: tags.map((tagId: string) => ({ id: tagId })),
            }
          : undefined,
        companyId,
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

// FIX: Should check if is in the group before gettings questions
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tagIds = searchParams.get("tags")?.split(",").filter(Boolean) || [];
    const companyIds =
      searchParams.get("companies")?.split(",").filter(Boolean) || [];
    const groupIds =
      searchParams.get("groups")?.split(",").filter(Boolean) || [];

    const whereClause: Record<string, unknown> = {};

    if (tagIds.length > 0) {
      whereClause.tags = {
        some: {
          id: {
            in: tagIds,
          },
        },
      };
    }

    if (companyIds.length > 0) {
      whereClause.Company = {
        id: {
          in: companyIds,
        },
      };
    }

    if (groupIds.length > 0) {
      whereClause.groupId = {
        in: groupIds,
      };
    } else {
      whereClause.groupId = {
        equals: null,
      };
    }

    const questions = await db.question.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
        Company: {
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
