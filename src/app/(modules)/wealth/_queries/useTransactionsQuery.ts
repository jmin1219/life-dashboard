import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TransactionType } from "../_types/TransactionType";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/wealth/transactions`;

// Make API call for all transactions with category details
export const fetchTransactionsAPI = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
};

// Add a transaction
export const addTransactionAPI = async (transaction: TransactionType) => {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(transaction),
    headers: { "Content-Type": "applications/json" },
  });
  if (!res.ok) throw new Error("Failed to add transaction");
  return res.json();
};

// Update a transaction
export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transaction: TransactionType) => {
      const res = await fetch(`${API_URL}/${transaction.id}`, {
        method: "PUT",
        body: JSON.stringify(transaction),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Failed to update transaction: ${errorMessage}`);
      }
      return res.json();
    },
    onSuccess: (updatedTransaction) => {
      queryClient.setQueryData(
        ["transactions"],
        (oldTransactions: TransactionType[] = []) =>
          oldTransactions.map((t) =>
            t.id === updatedTransaction.id ? updatedTransaction : t,
          ),
      );
    },
    onError: (error) => {
      console.error("Error updateing transaction", error);
    },
  });
};

// Delete a transaction
export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(API_URL, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Failed to delete transaction: ${errorMessage}`);
      }
      return res.json();
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        ["transactions"],
        (oldTransactions: TransactionType[] = []) =>
          oldTransactions.filter((t) => t.id != id),
      );
    },
    onError: (error) => {
      console.error("Error deleting transaction", error);
    },
  });
};
