import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

// ------------------- WEALTH MODULE -------------------
export const accounts = sqliteTable("accounts", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  color: text("color").notNull(),
  balance: real("balance").notNull().default(0),
  currency: text("currency").notNull().default("KRW"),
  createdAt: text("created_at").notNull(),
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
  date: text("date").notNull(),
});

export const scheduledTransactions = sqliteTable("scheduled_transactions", {
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
  startDate: text("start_date").notNull(),
  frequency: text("frequency")
    .notNull()
    .$type<"daily" | "weekly" | "monthly" | "yearly">(),
  nextOccurrence: integer("next_occurrence").notNull(),
  endDate: text("end_date"),
  createdAt: text("created_at").notNull(),
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
  createdAt: text("created_at").notNull(),
});

export const savingsGoals = sqliteTable("savings_goals", {
  id: integer("id").primaryKey(),
  title: text("title"),
  targetAmount: real("target_amount"),
  savedAmount: real("saved_amount"),
  targetDate: text("target_date").notNull(),
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
  datePurchased: text("date_purchased").notNull(),
});

export const netWorthLogs = sqliteTable("net_worth_logs", {
  id: integer("id").primaryKey(),
  totalAssets: real("total_assets").notNull(),
  totalLiabilities: real("total_liabilities").notNull(),
  netWorth: real("net_worth").notNull(),
  date: text("date").notNull(),
});

// ------------------- FITNESS MODULE -------------------

// ------------------- PRODUCTIVITY MODULE -------------------
