import { CategoryType, TransactionType } from "@/models/Transaction";

// TODO: Change baseurl to .env
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const getTransactions = async (): Promise<TransactionType[]> => {
  try {
    console.log("Fetching transactions from API...");
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

export const postTransaction = async (
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

export const putTransaction = async (transaction: TransactionType) => {
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

// ----------------------- CATEGORIES -----------------------

export const getCategories = async (): Promise<CategoryType[]> => {
  try {
    console.log("Fetching categories from API...");
    const res = await fetch(baseUrl + "/api/categories");

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const postCategory = async (
  category: Omit<CategoryType, "id">,
): Promise<CategoryType> => {
  const res = await fetch(baseUrl + "/api/categories", {
    method: "POST",
    body: JSON.stringify(category),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`Failed to add transaction: ${res.statusText}`);

  return res.json();
};
