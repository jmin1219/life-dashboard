import { TransactionType } from "@/models/types";
import db from "./connection";

export const fetchTransactionsFromDB = (): TransactionType[] => {
  const stmt = db.prepare(`
    SELECT *
    FROM transactions
    ORDER BY transactions.date DESC
  `);
  return stmt.all() as TransactionType[];
};

export const addTransactionToDB = ({
  date,
  amount,
  method,
  categoryId,
  title,
  details,
  processed,
}: Omit<TransactionType, "id">): TransactionType => {
  const stmt =
    db.prepare(`INSERT INTO transactions (date, amount, method, category, description, details, processed)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
  const result = stmt.run(
    date,
    amount,
    method,
    categoryId,
    title,
    details,
    processed,
  );

  return {
    id: result.lastInsertRowid as number,
    date,
    amount,
    method,
    categoryId,
    title,
    details,
    processed,
  };
};

// TODO: Add update and delete functions for SQLite
// export const updateTransactionInDB = (
//   transaction: TransactionType,
// ): TransactionType => {
//   const stmt = db.prepare(`UPDATE transactions
//     SET date = ?, amount = ?, method = ?, category = ?, title = ?, details = ?, processed = ?
//     WHERE id = ?
//     `);
//   stmt.run(
//     transaction.date,
//     transaction.amount,
//     transaction.method,
//     transaction.categoryId,
//     transaction.title || null,
//     transaction.details || null,
//     transaction.processed ? 1 : 0,
//   );

//   return transaction;
// };

// export const deleteTransactionInDB = (id: number) => {
//   const stmt = db.prepare("DELETE FROM transactions WHERE id = ?");
//   stmt.run(id);
// };
