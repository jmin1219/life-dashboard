import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TransactionType } from "../types/TransactionType";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/wealth/transactions`;

// Make API call for all transactions
export const useFetchTransactions = () => {
  return useQuery<TransactionType[]>({
    queryKey: ["transactions"],
    queryFn: async (): Promise<TransactionType[]> => {
      const res = await fetch(API_URL);
      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Failed to fetch transactions: ${errorMessage}`);
      }
      return res.json();
    },
  });
};

// Add a transaction
export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (transaction: TransactionType) => {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(transaction),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Failed to add transaction: ${errorMessage}`);
      }
      return res.json();
    },
    onSuccess: (newTransaction) => {
      queryClient.setQueryData(
        ["transactions"],
        (oldTransactions: TransactionType[] = []) => [
          newTransaction,
          ...oldTransactions,
        ],
      );
    },
    onError: (error) => {
      console.error("Error adding transaction:", error);
    },
  });
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
