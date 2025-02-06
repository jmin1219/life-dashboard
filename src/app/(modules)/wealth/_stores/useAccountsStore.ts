import { AccountType } from "@/app/(modules)/wealth/_types/AccountType";
import { create } from "zustand";

// Setting up Zustand store to manage accounts globally

type AccountsState = {
  accounts: AccountType[];
  setAccounts: (accounts: AccountType[]) => void;
  addAccount: (account: AccountType) => void;
  updateAccount: (updatedAccount: AccountType) => void;
  deleteAccount: (id: number) => void;
};

export const useAccounts = create<AccountsState>((set) => ({
  accounts: [],
  setAccounts: (accounts) => set({ accounts }),
  addAccount: (account) =>
    set((state) => ({ accounts: [account, ...state.accounts] })),
  updateAccount: (updatedAccount) =>
    set((state) => ({
      accounts: state.accounts.map((a) =>
        a.id === updatedAccount.id ? updatedAccount : a,
      ),
    })),
  deleteAccount: (id) =>
    set((state) => ({
      accounts: state.accounts.filter((a) => a.id !== id),
    })),
}));
