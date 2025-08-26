import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/current-user";

export const questionsRouter = createTRPCRouter({
  get: baseProcedure
    .input(
      z.object({
        tags: z.array(z.string()).optional(),
        companies: z.array(z.string()).optional(),
        roles: z.array(z.string()).optional(),
        groups: z.array(z.string()).optional(),
      }),
    )
    .query(async ({ input }) => {
      const user = await currentUser();
      const whereClause: Record<string, unknown> = {};
      const { tags, companies, roles, groups } = input;

      if (tags && tags.length > 0) {
        whereClause.tags = {
          some: {
            name: {
              in: tags,
            },
          },
        };
      }

      if (roles && roles.length > 0) {
        whereClause.role = {
          name: {
            in: roles,
          },
        };
      }

      if (companies && companies.length > 0) {
        whereClause.Company = {
          name: {
            in: companies,
          },
        };
      }

      if (!user) {
        whereClause.groupId = null;
      } else if (groups && groups.length > 0) {
        whereClause.AND = [
          {
            group: {
              name: {
                in: groups,
              },
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
        whereClause.OR = [
          { groupId: null },
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
      return {
        questions,
      };
    }),
});
