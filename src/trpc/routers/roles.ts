import { db } from "@/db";
import { rolesTable } from "@/db/schema/questions";
import { baseProcedure, createTRPCRouter } from "../init";
export const rolesRouter = createTRPCRouter({
  get: baseProcedure.query(async () => {
    try {
      const roles = await db
        .select({ id: rolesTable.id, name: rolesTable.name })
        .from(rolesTable);

      return {
        status: "success",
        message: "Roles fetched successfully",
        data: roles,
      } as const;
    } catch (err) {
      console.error("Failed to fetch roles", err);
      return {
        status: "failed",
        message: "Failed to fetch roles",
      } as const;
    }
  }),
});
