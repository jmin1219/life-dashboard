import { BudgetType } from "@/app/(modules)/wealth/_types/BudgetType";
import { create } from "zustand";

// Setting up Zustand store to manage budgets globally

type BudgetsState = {
  budgets: BudgetType[];
  setBudgets: (budgets: BudgetType[]) => void;
  addBudget: (budget: BudgetType) => void;
  updateBudget: (updatedBudget: BudgetType) => void;
  deleteBudget: (id: number) => void;
};

export const useBudgets = create<BudgetsState>((set) => ({
  budgets: [],
  setBudgets: (budgets) => set({ budgets }),
  addBudget: (budget) =>
    set((state) => ({ budgets: [budget, ...state.budgets] })),
  updateBudget: (updatedBudget) =>
    set((state) => ({
      budgets: state.budgets.map((b) =>
        b.id === updatedBudget.id ? updatedBudget : b,
      ),
    })),
  deleteBudget: (id) =>
    set((state) => ({
      budgets: state.budgets.filter((b) => b.id !== id),
    })),
}));
