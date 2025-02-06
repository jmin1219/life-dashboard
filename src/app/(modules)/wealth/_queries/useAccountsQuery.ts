import { AccountType } from "../_types/AccountType";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/wealth/accounts`;

// Fetch all categories
export const fetchAccountsApi = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch accounts.");
  return res.json();
};

// Add a transaction
export const addAccountAPI = async (account: Omit<AccountType, "id">) => {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(account),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to add account");
  return res.json();
};
