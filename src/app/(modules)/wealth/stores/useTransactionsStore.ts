import { TransactionType } from "@/app/(modules)/wealth/types/TransactionType";
import { create } from "zustand";

// Setting up Zustand store to manage transactions globally

type TransactionsState = {
  transactions: TransactionType[];
  setTransactions: (transactions: TransactionType[]) => void;
  addTransaction: (transaction: TransactionType) => void;
  updateTransaction: (updatedTransaction: TransactionType) => void;
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
