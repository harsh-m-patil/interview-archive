import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const user = await currentUser();

    if (!user) {
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
        createdById: user.id,
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tagIds = searchParams.get("tags")?.split(",").filter(Boolean) || [];
    const companyIds =
      searchParams.get("companies")?.split(",").filter(Boolean) || [];
    const groupIds =
      searchParams.get("groups")?.split(",").filter(Boolean) || [];

    const user = await currentUser();
    const whereClause: Record<string, unknown> = {};

    // Handle tag filtering
    if (tagIds.length > 0) {
      whereClause.tags = {
        some: {
          id: {
            in: tagIds,
          },
        },
      };
    }

    // Handle company filtering
    if (companyIds.length > 0) {
      whereClause.Company = {
        id: {
          in: companyIds,
        },
      };
    }

    // Handle group filtering with proper membership check
    if (!user) {
      // If no user, only show public questions (no group)
      whereClause.groupId = null;
    } else if (groupIds.length > 0) {
      // If specific groups requested, check user is member of those groups
      whereClause.AND = [
        {
          groupId: {
            in: groupIds,
          },
        },
        {
          group: {
            members: {
              some: {
                userId: user.id,
              },
            },
          },
        },
      ];
    } else {
      // If no specific groups requested, show public questions + user's group questions
      whereClause.OR = [
        { groupId: null }, // Public questions
        {
          group: {
            members: {
              some: {
                userId: user.id,
              },
            },
          },
        }, // Questions from user's groups
      ];
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
