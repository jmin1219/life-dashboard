"use client";

import { CategoryType, TransactionType } from "@/models/types";
import React, { createContext, useContext, useState } from "react";

type TransactionsContextType = {
  transactions: TransactionType[];
  setTransactions: React.Dispatch<React.SetStateAction<TransactionType[]>>;
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
};

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined,
);

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider",
    );
  }
  return context;
};

export const TransactionsProvider = ({
  children,
  initialTransactions,
  initialCategories,
}: {
  children: React.ReactNode;
  initialTransactions: TransactionType[];
  initialCategories: CategoryType[];
}) => {
  const [transactions, setTransactions] =
    useState<TransactionType[]>(initialTransactions);
  const [categories, setCategories] =
    useState<CategoryType[]>(initialCategories);

  return (
    <TransactionsContext.Provider
      value={{ transactions, setTransactions, categories, setCategories }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
