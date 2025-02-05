import { TransactionWithCategory } from "@/app/(modules)/wealth/types/TransactionType";
import { create } from "zustand";

// Setting up Zustand store to manage transactions globally

type TransactionsState = {
  transactions: TransactionWithCategory[];
  setTransactions: (transactions: TransactionWithCategory[]) => void;
  addTransaction: (transaction: TransactionWithCategory) => void;
  updateTransaction: (updatedTransaction: TransactionWithCategory) => void;
  deleteTransaction: (id: number) => void;
};

export const useTransactions = create<TransactionsState>((set) => ({
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),
  addTransaction: (transaction) =>
    set((state) => ({ transactions: [transaction, ...state.transactions] })),
  updateTransaction: (updatedTransaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t,
      ),
    })),
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
}));
