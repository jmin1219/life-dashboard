import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// ------------------- WEALTH MODULE -------------------
export const accounts = sqliteTable("accounts", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  balance: real("balance").notNull().default(0),
  currency: text("currency").notNull().default("KRW"),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  icon: text("icon").default("default-icon"),
  color: text("color").default("#FFFFFF"),
});

export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey(),
  accountId: integer("account_id")
    .notNull()
    .references(() => accounts.id, { onDelete: "cascade" }),
  categoryId: integer("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  type: text("type")
    .notNull()
    .$type<
      | "income"
      | "expense"
      | "investment_buy"
      | "investment_sell"
      | "transfer"
      | "liability_payment"
    >(),
  amount: real("amount").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  necessity: text("necessity")
    .notNull()
    .$type<"essential" | "optional" | "unexpected but necessary">(),
  date: integer("date")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export const recurringTransactions = sqliteTable("recurring_transactions", {
  id: integer("id").primaryKey(),
  accountId: integer("account_id")
    .notNull()
    .references(() => accounts.id, { onDelete: "cascade" }),
  categoryId: integer("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  type: text("type")
    .notNull()
    .$type<
      | "income"
      | "expense"
      | "investment_buy"
      | "investment_sell"
      | "transfer"
      | "liability_payment"
    >(),
  amount: real("amount").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  necessity: text("necessity")
    .notNull()
    .$type<"essential" | "optional" | "unexpected but necessary">(),
  startDate: integer("start_date").notNull(),
  frequency: text("frequency")
    .notNull()
    .$type<"daily" | "weekly" | "monthly" | "yearly">(),
  nextOccurrence: integer("next_occurrence").notNull(),
  endDate: integer("end_date"),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export const budgets = sqliteTable("budgets", {
  id: integer("id").primaryKey(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  amount: real("amount").notNull(),
  period: text("period")
    .notNull()
    .default("monthly")
    .$type<"monthly" | "weekly">(),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`), // UNIX timestamp
});

export const investments = sqliteTable("investments", {
  id: integer("id").primaryKey(),
  accountId: integer("account_id")
    .notNull()
    .references(() => accounts.id, { onDelete: "cascade" }),
  assetName: text("asset_name").notNull(),
  assetType: text("asset_type").notNull(),
  shares: real("shares").notNull().default(0),
  pricePerShare: real("price_per_share").notNull().default(0),
  totalValue: real("total_value").notNull().default(0),
  datePurchased: integer("date_purchased").notNull(),
});

export const netWorthLogs = sqliteTable("net_worth_logs", {
  id: integer("id").primaryKey(),
  totalAssets: real("total_assets").notNull(),
  totalLiabilities: real("total_liabilities").notNull(),
  netWorth: real("net_worth").notNull(),
  date: integer("date")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`), // UNIX timestamp
});

// ------------------- FITNESS MODULE -------------------

// ------------------- PRODUCTIVITY MODULE -------------------
