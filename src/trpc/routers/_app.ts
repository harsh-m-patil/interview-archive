import { baseProcedure, createTRPCRouter } from "../init";
import { questionsRouter } from "./questions";

export const appRouter = createTRPCRouter({
  health: baseProcedure.query(() => {
    return "ok";
  }),
  questions: questionsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
