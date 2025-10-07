import {
  boolean,
  index,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const questionsTable = pgTable(
  "questions",
  {
    id: uuid("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    aiAnswer: text("ai_answer"),
    companyId: uuid("company_id").references(() => companiesTable.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    isDeleted: boolean("is_deleted").default(false).notNull(),
  },
  (t) => [index("company_idx").on(t.companyId)]
);

export type Question = typeof questionsTable.$inferSelect;
export type QuestionInsert = typeof questionsTable.$inferInsert;

export const answersTable = pgTable(
  "answers",
  {
    id: uuid("id").primaryKey(),
    questionId: uuid("question_id")
      .notNull()
      .references(() => questionsTable.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    isDeleted: boolean("is_deleted").default(false).notNull(),
  },
  (t) => [index("question_idx").on(t.questionId)]
);

export type Answer = typeof answersTable.$inferSelect;
export type AnswerInsert = typeof answersTable.$inferInsert;

// tables for filtering
export const companiesTable = pgTable("companies", {
  id: uuid("id").primaryKey().notNull(),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  website: text("website"),
});

export type Company = typeof companiesTable.$inferSelect;
export type CompanyInsert = typeof companiesTable.$inferInsert;

export const rolesTable = pgTable("roles", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
});

export type Role = typeof rolesTable.$inferSelect;
export type RoleInsert = typeof rolesTable.$inferInsert;

export const tagsTable = pgTable("tags", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
});

export type Tag = typeof tagsTable.$inferSelect;
export type TagInsert = typeof tagsTable.$inferInsert;

export const questionTagsTable = pgTable(
  "question_tags",
  {
    questionId: uuid("question_id")
      .notNull()
      .references(() => questionsTable.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tagsTable.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.questionId, t.tagId] })]
);

export const questionRolesTable = pgTable(
  "question_roles",
  {
    questionId: uuid("question_id")
      .notNull()
      .references(() => questionsTable.id, { onDelete: "cascade" }),
    roleId: uuid("role_id")
      .notNull()
      .references(() => rolesTable.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.questionId, t.roleId] })]
);

// TODO: add groups or organisations
