import { create } from "zustand";

// Setting up Zustand store to manage UI-related states

type TransactionsState = {
  isAddTransactionModalOpen: boolean;
  setAddTransactionModalOpen: (open: boolean) => void;
};

export const useTransactionsUIStore = create<TransactionsState>((set) => ({
  isAddTransactionModalOpen: false,
  setAddTransactionModalOpen: (open) =>
    set({ isAddTransactionModalOpen: open }),
}));
