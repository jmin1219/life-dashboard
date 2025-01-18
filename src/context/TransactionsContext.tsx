"use client";

import { TransactionType } from "@/models/types";
import React, { createContext, useContext, useState } from "react";

type TransactionsContextType = {
  transactions: TransactionType[];
  setTransactions: React.Dispatch<React.SetStateAction<TransactionType[]>>;
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
}: {
  children: React.ReactNode;
  initialTransactions: TransactionType[];
}) => {
  const [transactions, setTransactions] =
    useState<TransactionType[]>(initialTransactions);

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};
