import React from "react";
import ModuleNavbar from "@/components/ModuleNavbar";
import { fetchTransactions } from "@/lib/api";
import { TransactionType } from "@/models/types";
import { TransactionsProvider } from "@/context/TransactionsContext";

const WealthLayout = async ({
  children,
}: {
  children: React.ReactElement<{ transactions: TransactionType[] }>;
}) => {
  const wealthNavItems = [
    { name: "Overview", path: "/wealth" },
    { name: "Transactions", path: "/wealth/transactions" },
    { name: "Budget & Goals", path: "/wealth/budget-goals" },
    { name: "Investments", path: "/wealth/investments" },
  ];

  const transactions: TransactionType[] = await fetchTransactions();

  return (
    <TransactionsProvider initialTransactions={transactions}>
      <div className="flex h-full w-full flex-col lg:overflow-hidden">
        <ModuleNavbar navItems={wealthNavItems} />
        <main>{React.cloneElement(children, { transactions })}</main>
      </div>
    </TransactionsProvider>
  );
};

export default WealthLayout;
