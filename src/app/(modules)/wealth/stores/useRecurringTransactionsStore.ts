import { RecurringTransactionType } from "@/app/(modules)/wealth/types/RecurringTransactionType";
import { create } from "zustand";

// Setting up Zustand store to manage recurringTransactions globally

type RecurringTransactionsState = {
  recurringTransactions: RecurringTransactionType[];
  setRecurringTransactions: (
    recurringTransactions: RecurringTransactionType[],
  ) => void;
  addRecurringTransaction: (
    recurringTransaction: RecurringTransactionType,
  ) => void;
  updateRecurringTransaction: (
    updatedRecurringTransaction: RecurringTransactionType,
  ) => void;
  deleteRecurringTransaction: (id: number) => void;
};

export const useRecurringTransactions = create<RecurringTransactionsState>(
  (set) => ({
    recurringTransactions: [],
    setRecurringTransactions: (recurringTransactions) =>
      set({ recurringTransactions }),
    addRecurringTransaction: (recurringTransaction) =>
      set((state) => ({
        recurringTransactions: [
          recurringTransaction,
          ...state.recurringTransactions,
        ],
      })),
    updateRecurringTransaction: (updatedRecurringTransaction) =>
      set((state) => ({
        recurringTransactions: state.recurringTransactions.map((r) =>
          r.id === updatedRecurringTransaction.id
            ? updatedRecurringTransaction
            : r,
        ),
      })),
    deleteRecurringTransaction: (id) =>
      set((state) => ({
        recurringTransactions: state.recurringTransactions.filter(
          (r) => r.id !== id,
        ),
      })),
  }),
);
