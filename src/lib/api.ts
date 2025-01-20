import { CategoryType, TransactionType } from "@/models/types";

// TODO: Change baseurl
const baseUrl = "http://localhost:3000";

export const fetchAllTransactions = async (): Promise<TransactionType[]> => {
  try {
    const res = await fetch(baseUrl + "/api/transactions");
    if (!res.ok) {
      throw new Error(`Failed to fetch transactions: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const addTransaction = async (
  transaction: Omit<TransactionType, "id">,
): Promise<TransactionType> => {
  const res = await fetch(baseUrl + "/api/transactions", {
    method: "POST",
    body: JSON.stringify(transaction),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`Failed to add transaction: ${res.statusText}`);

  return res.json();
};

export const updateTransaction = async (transaction: TransactionType) => {
  const res = await fetch(baseUrl + "/api/transactions", {
    method: "PUT",
    body: JSON.stringify(transaction),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to update transaction");
  return res.json();
};

export const deleteTransaction = async (id: number) => {
  const res = await fetch(baseUrl + "/api/transactions", {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to update transaction");
};

export const fetchAllCategories = async (): Promise<CategoryType[]> => {
  const res = await fetch(baseUrl + "/api/categories");
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

export const addCategory = async (
  category: Omit<CategoryType, "id">,
): Promise<CategoryType> => {
  const res = await fetch(baseUrl + "/api/category", {
    method: "POST",
    body: JSON.stringify(category),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`Failed to add transaction: ${res.statusText}`);

  return res.json();
};
