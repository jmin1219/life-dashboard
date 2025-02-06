import {
  addTransactionAPI,
  fetchTransactionsAPI,
} from "../_queries/useTransactionsQuery";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTransactionsHook = () => {
  const queryClient = useQueryClient();

  // Fetch transactions
  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery({
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

  return {
    transactions: transactions || [],
    isLoading,
    error,
    addTransaction: addTransactionMutation.mutateAsync,
  };
};
