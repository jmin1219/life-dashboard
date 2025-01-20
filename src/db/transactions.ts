import { TransactionType } from "@/models/types";
import db from "./connection";

export const getAllTransactions = () => {
  const stmt = db.prepare(`
    SELECT 
      transactions.id,
      transactions.date,
      transactions.amount,
      transactions.method,
      transactions.category_id AS categoryId,
      transactions.title,
      transactions.details,
      transactions.processed,
      categories.name AS category_name,
      categories.color AS category_color
    FROM transactions
    JOIN categories ON transactions.category_id = categories.id
    ORDER BY transactions.date DESC
  `);
  return stmt.all();
};

export const getAllCategories = () => {
  const stmt = db.prepare("SELECT id, name, color FROM categories");
  return stmt.all();
};

export const addTransaction = (
  transaction: TransactionType,
): TransactionType => {
  const stmt =
    db.prepare(`INSERT INTO transactions (date, amount, method, category, description, details, processed)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
  const result = stmt.run(
    transaction.date,
    transaction.amount,
    transaction.method,
    transaction.categoryId,
    transaction.title || null,
    transaction.details || null,
    transaction.processed ? 1 : 0,
  );

  return { id: result.lastInsertRowid as number, ...transaction };
};

export const updateTransaction = (
  transaction: TransactionType,
): TransactionType => {
  const stmt = db.prepare(`UPDATE transactions
    SET date = ?, amount = ?, method = ?, category = ?, title = ?, details = ?, processed = ?
    WHERE id = ?
    `);
  stmt.run(
    transaction.date,
    transaction.amount,
    transaction.method,
    transaction.categoryId,
    transaction.title || null,
    transaction.details || null,
    transaction.processed ? 1 : 0,
  );

  return transaction;
};

export const deleteTransaction = (id: number) => {
  const stmt = db.prepare("DELETE FROM transactions WHERE id = ?");
  stmt.run(id);
};
