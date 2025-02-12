import {
  AddTransactionFormType,
  TransactionWithCategoryType,
} from "../_types/TransactionType";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/wealth/transactions`;

// Make API call for all transactions with category details
export const fetchTransactionsAPI = async (): Promise<
  TransactionWithCategoryType[]
> => {
  const res = await fetch(API_URL); // Transactions with Category Details
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
};

// Add a transaction
export const addTransactionAPI = async (
  transaction: AddTransactionFormType,
) => {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(transaction),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to add transaction");
  return res.json();
};

// Update a transaction
export const editTransactionAPI = async (
  transaction: AddTransactionFormType,
) => {
  const res = await fetch(`${API_URL}/${transaction.id}`, {
    method: "PUT",
    body: JSON.stringify(transaction),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to update transaction");
  return res.json();
};

// Delete a transaction
export const deleteTransactionAPI = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete transaction");
  return res.json();
};
