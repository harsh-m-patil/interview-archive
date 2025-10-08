import { and, eq, type SQL, sql } from "drizzle-orm";
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
    try {
      const questions = await db
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
        .where(and(...whereConditions));

      return {
        status: "success",
        message: "Questions fetched successfully",
        data: questions,
      } as const;
    } catch (err) {
      console.error("Error fetching questions:", err);
      return {
        status: "failed",
        message: "Failed to fetch questions",
      } as const;
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
        return {
          status: "failed",
          message: "failed to post question",
        } as const;
      }
    }),
});
