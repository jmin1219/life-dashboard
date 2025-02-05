import { useEffect } from "react";
import {
  useAddTransaction,
  useDeleteTransaction,
  useFetchTransactions,
  useUpdateTransaction,
} from "../queries/useTransactionsQuery";
import { useTransactions } from "../stores/useTransactionsStore";
import { TransactionType } from "../types/TransactionType";

export const useTransactionsHook = () => {
  const { data, isLoading, error } = useFetchTransactions();
  const {
    setTransactions,
    addTransaction: addLocalTransaction,
    updateTransaction: updateLocalTransaction,
    deleteTransaction: deleteLocalTransaction,
  } = useTransactions();

  const addTransaction = useAddTransaction();
  const updateTransaction = useUpdateTransaction();
  const deleteTransaction = useDeleteTransaction();

  useEffect(() => {
    if (data) setTransactions(data);
  }, [data, setTransactions]);

  return {
    transactions: data || [],
    isLoading,
    error,
    addTransaction: (transaction: TransactionType) => {
      addLocalTransaction(transaction);
      return addTransaction.mutateAsync(transaction);
    },
    updateTransaction: (transaction: TransactionType) => {
      updateLocalTransaction(transaction);
      return updateTransaction.mutateAsync(transaction);
    },
    deleteTransaction: (id: number) => {
      deleteLocalTransaction(id);
      return deleteTransaction.mutateAsync(id);
    },
  };
};
