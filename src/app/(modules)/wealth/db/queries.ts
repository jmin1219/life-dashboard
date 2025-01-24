import {
  CategoryType,
  TransactionType,
  TransactionWithCategory,
} from "../types/Transaction";
import db from "./connection";

// Fetch all transactions joined with categories
export const getAllTransactions = (): TransactionWithCategory[] => {
  return db
    .prepare(
      `
    SELECT t.*, c.name AS category_name, c.color AS category_color
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    ORDER BY t.date DESC
    `,
    )
    .all() as TransactionWithCategory[];
};

// Add a transaction
export const addTransactionToDB = (
  transaction: Omit<TransactionType, "id">,
): TransactionType => {
  try {
    const {
      title,
      amount,
      date,
      type,
      category_id,
      method,
      details,
      processed,
    } = transaction;

    // Sanitize inputs
    const sanitizedTransaction = {
      title: title || "",
      amount: parseFloat(amount.toString()) || 0,
      date: date || "",
      type: type || "expense",
      category_id: category_id || null,
      method: method || null,
      details: details || null,
      processed: processed ? 1 : 0, // Convert boolean to SQLite-compatible integer
    };
    const result = db
      .prepare(
        `INSERT INTO transactions (title, amount, date, type, category_id, method, details, processed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        sanitizedTransaction.title,
        sanitizedTransaction.amount,
        sanitizedTransaction.date,
        sanitizedTransaction.type,
        sanitizedTransaction.category_id,
        sanitizedTransaction.method,
        sanitizedTransaction.details,
        sanitizedTransaction.processed,
      );

    return {
      id: result.lastInsertRowid as number,
      ...transaction,
    };
  } catch (error) {
    console.error("Database Error: Failed to add transaction", error);
    throw new Error("Failed to add transactionto the database");
  }
};

// Fetch all categories
export const getAllCategories = (): CategoryType[] => {
  return db
    .prepare(`SELECT * FROM categories ORDER BY id`)
    .all() as CategoryType[];
};

export const addCategoryToDB = (name: string, color: string): CategoryType => {
  try {
    const result = db
      .prepare(`INSERT INTO categories (name, color) VALUES (?, ?)`)
      .run(name, color);

    return {
      id: result.lastInsertRowid as number,
      name,
      color,
    };
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("UNIQUE constraint failed")
    ) {
      throw new Error("Category with the same name already exists.");
    }
    console.error("Database Error: Failed to add category", error);
    throw new Error("Failed to add category to the database.");
  }
};
