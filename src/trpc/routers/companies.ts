import { db } from "@/db";
import { companiesTable } from "@/db/schema/questions";
import { baseProcedure, createTRPCRouter } from "../init";
export const companiesRouter = createTRPCRouter({
  get: baseProcedure.query(async () => {
    try {
      const companies = await db
        .select({ id: companiesTable.id, name: companiesTable.name })
        .from(companiesTable);

      return {
        status: "success",
        message: "Companies fetched successfully",
        data: companies,
      } as const;
    } catch (err) {
      console.error("Failed to fetch companies", err);
      return {
        status: "failed",
        message: "Failed to fetch companies",
      } as const;
    }
  }),
});
