import { InvestmentType } from "@/app/(modules)/wealth/_types/InvestmentType";
import { create } from "zustand";

// Setting up Zustand store to manage investments globally

type InvestmentsState = {
  investments: InvestmentType[];
  setInvestments: (investments: InvestmentType[]) => void;
  addInvestment: (investment: InvestmentType) => void;
  updateInvestment: (updatedInvestment: InvestmentType) => void;
  deleteInvestment: (id: number) => void;
};

export const useInvestments = create<InvestmentsState>((set) => ({
  investments: [],
  setInvestments: (investments) => set({ investments }),
  addInvestment: (investment) =>
    set((state) => ({ investments: [investment, ...state.investments] })),
  updateInvestment: (updatedInvestment) =>
    set((state) => ({
      investments: state.investments.map((i) =>
        i.id === updatedInvestment.id ? updatedInvestment : i,
      ),
    })),
  deleteInvestment: (id) =>
    set((state) => ({
      investments: state.investments.filter((i) => i.id !== id),
    })),
}));
