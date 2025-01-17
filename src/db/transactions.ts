import { TransactionType } from "@/models/types";
import db from "./connection";

export const getAllTransactions = () => {
  const stmt = db.prepare("SELECT * FROM transactions");
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
    transaction.category,
    transaction.description || null,
    transaction.details || null,
    transaction.processed ? 1 : 0,
  );

  return { id: result.lastInsertRowid as number, ...transaction };
};

export const updateTransaction = (
  transaction: TransactionType,
): TransactionType => {
  const stmt = db.prepare(`UPDATE transactions
    SET date = ?, amount = ?, method = ?, category = ?, description = ?, details = ?, processed = ?
    WHERE id = ?
    `);
  stmt.run(
    transaction.date,
    transaction.amount,
    transaction.method,
    transaction.category,
    transaction.description || null,
    transaction.details || null,
    transaction.processed ? 1 : 0,
  );

  return transaction;
};

export const deleteTransaction = (id: number) => {
  const stmt = db.prepare("DELETE FROM transactions WHERE id = ?");
  stmt.run(id);
};
