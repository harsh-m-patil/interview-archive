import {
  boolean,
  index,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const questions = pgTable(
  "questions",
  {
    id: uuid("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    aiAnswer: text("ai_answer"),
    companyId: uuid("company_id").references(() => companies.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    isDeleted: boolean("is_deleted").default(false).notNull(),
  },
  (t) => [index("company_idx").on(t.companyId)]
);

export type Question = typeof questions.$inferSelect;
export type QuestionInsert = typeof questions.$inferInsert;

export const answers = pgTable(
  "answers",
  {
    id: uuid("id").primaryKey(),
    questionId: uuid("question_id")
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    isDeleted: boolean("is_deleted").default(false).notNull(),
  },
  (t) => [index("question_idx").on(t.questionId)]
);

export type Answer = typeof answers.$inferSelect;
export type AnswerInsert = typeof answers.$inferInsert;

// tables for filtering
export const companies = pgTable("companies", {
  id: uuid("id").primaryKey().notNull(),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  website: text("website"),
});

export type Company = typeof companies.$inferSelect;
export type CompanyInsert = typeof companies.$inferInsert;

export const roles = pgTable("roles", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
});

export type Role = typeof roles.$inferSelect;
export type RoleInsert = typeof roles.$inferInsert;

export const tags = pgTable("tags", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
});

export type Tag = typeof tags.$inferSelect;
export type TagInsert = typeof tags.$inferInsert;

export const questionTags = pgTable(
  "question_tags",
  {
    questionId: uuid("question_id")
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.questionId, t.tagId] })]
);

export const questionRoles = pgTable(
  "question_roles",
  {
    questionId: uuid("question_id")
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),
    roleId: uuid("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.questionId, t.roleId] })]
);

// TODO: add groups or organisations

