import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ groupId: string }>;
  },
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { groupId } = await params;

    if (!groupId) {
      return new Response("Group ID is required", { status: 400 });
    }

    // Check if user is a member of the group
    const membership = await db.member.findFirst({
      where: {
        groupId,
        userId: user.id,
      },
    });

    if (!membership) {
      return new Response("You are not a member of this group", { status: 403 });
    }

    // Fetch group details with members and questions
    const group = await db.group.findFirst({
      where: {
        id: groupId,
      },
      include: {
        user: true, // Group creator
        members: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        questions: {
          include: {
            createdBy: true,
            Company: true,
            role: true,
            tags: true,
            answers: {
              select: {
                id: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!group) {
      return new Response("Group not found", { status: 404 });
    }

    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    console.error("[GROUP_GET_BY_ID] Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}