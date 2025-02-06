"use client";

import { JSX } from "react";
import { useTransactionsHook } from "../_hooks/useTransactionsHook";
import { TransactionWithCategoryType } from "../_types/TransactionType";
import WealthTable from "./WealthTable";

const TransactionTable = () => {
  const { transactions, isLoading, error } = useTransactionsHook();

  const transactionColumns = [
    { key: "date", label: "DATE" },
    { key: "title", label: "TITLE" },
    { key: "amount", label: "AMOUNT" },
    {
      key: "category_name",
      label: "CATEGORY",
      render: (row: TransactionWithCategoryType) => (
        <div className="flex items-center">
          <span
            className="mr-2 h-4 w-4 rounded-full"
            style={{ backgroundColor: row.category_color || "#CCCCCC" }}
          />
          <span>{row.category_name || "❓"}</span>
        </div>
      ),
    },
    { key: "type", label: "TYPE" },
    { key: "necessity", label: "NECESSITY" },
  ] as Array<{
    key: keyof TransactionWithCategoryType;
    label: string;
    render?: (row: TransactionWithCategoryType) => JSX.Element | string;
  }>;

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p className="text-red-500">Error loading transactions.</p>;

  return (
    <WealthTable<TransactionWithCategoryType>
      columns={transactionColumns}
      data={transactions}
    />
  );
};

export default TransactionTable;
