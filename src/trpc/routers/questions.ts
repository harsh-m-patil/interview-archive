import { TRPCError } from "@trpc/server";
import { and, count, eq, type SQL, sql } from "drizzle-orm";
import { db } from "@/db";
import { user } from "@/db/schema/auth";
import { companiesTable, questionsTable } from "@/db/schema/questions";
import { getQuestionsInputSchema, postQuestionSchema } from "@/lib/zod-schemas";
import { baseProcedure, createTRPCRouter, privateProcedure } from "../init";

export const questionRouter = createTRPCRouter({
  get: baseProcedure.input(getQuestionsInputSchema).query(async ({ input }) => {
    const whereConditions: SQL<unknown>[] = [];
    if (input.search && input.search !== "") {
      whereConditions.push(
        sql`to_tsvector('english', ${questionsTable.title}) @@ to_tsquery('english', ${input.search})`
      );
    }

    if (input.company) {
      whereConditions.push(eq(questionsTable.companyId, input.company));
    }

    try {
      // calculate offset using page and limit
      const offset = (input.page - 1) * input.limit;

      const [questions, [total]] = await Promise.all([
        db
          .select({
            id: questionsTable.id,
            title: questionsTable.title,
            description: questionsTable.description,
            companyName: companiesTable.name,
            postedBy: user.name,
            postedByImage: user.image,
            createdAt: questionsTable.createdAt,
            aiAnswer: questionsTable.aiAnswer,
          })
          .from(questionsTable)
          .leftJoin(
            companiesTable,
            eq(companiesTable.id, questionsTable.companyId)
          )
          .leftJoin(user, eq(user.id, questionsTable.postedBy))
          .where(and(...whereConditions))
          .offset(offset)
          .limit(input.limit),
        db
          .select({ count: count() })
          .from(questionsTable)
          .where(and(...whereConditions)),
      ]);

      return {
        status: "success",
        message: "Questions fetched successfully",
        total: total.count,
        data: questions,
      } as const;
    } catch (err) {
      console.error("Error fetching questions:", err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch questions",
        cause: err,
      });
    }
  }),
  create: privateProcedure
    .input(postQuestionSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const [question] = await db
          .insert(questionsTable)
          .values({
            postedBy: ctx.session.userId,
            title: input.title,
            description: input.description,
            companyId: input.company,
          })
          .returning({ id: questionsTable.id });
        return {
          status: "success",
          message: "Question created successfully",
          data: question,
        } as const;
      } catch (err) {
        console.error("Error creating question:", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create question",
          cause: err,
        });
      }
    }),
});
