"use client";

import {
  CategoryType,
  TransactionType,
} from "@/app/(modules)/wealth/types/Transaction";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCategories, getTransactions } from "@/lib/api";

type TransactionsContextType = {
  transactions: TransactionType[];
  setTransactions: React.Dispatch<React.SetStateAction<TransactionType[]>>;
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
};

const TransactionsContext = createContext<TransactionsContextType | null>(null);

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
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchTransactions();
    fetchCategories();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, setTransactions, categories, setCategories }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
