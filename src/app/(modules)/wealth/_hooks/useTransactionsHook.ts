import {
  addTransactionAPI,
  deleteTransactionAPI,
  fetchTransactionsAPI,
} from "../_queries/useTransactionsQuery";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TransactionWithCategoryType } from "../_types/TransactionType";

export const useTransactionsHook = () => {
  const queryClient = useQueryClient();

  // Fetch transactions
  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery<TransactionWithCategoryType[]>({
    queryKey: ["transactions"],
    queryFn: fetchTransactionsAPI,
    staleTime: 60 * 1000, // Data stays fresh for 1 min
  });

  // Add transaction mutation
  const addTransactionMutation = useMutation({
    mutationFn: addTransactionAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] }); //Refresh list after adding
    },
  });

  const deleteTransactionMutation = useMutation({
    mutationFn: deleteTransactionAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  return {
    transactions: transactions || [],
    isLoading,
    error,
    addTransaction: addTransactionMutation.mutateAsync,
    deleteTransaction: deleteTransactionMutation.mutateAsync,
  };
};
