import React from "react";
import ModuleNavbar from "@/components/ModuleNavbar";
import { TransactionsProvider } from "@/context/TransactionsContext";
import { fetchTransactionsFromDB } from "@/db/transactions";
import { fetchCategoriesFromDB } from "@/db/categories";

const WealthLayout = async ({ children }: { children: React.ReactNode }) => {
  const wealthNavItems = [
    { name: "Overview", path: "/wealth" },
    { name: "Transactions", path: "/wealth/transactions" },
    { name: "Budget & Goals", path: "/wealth/budget-goals" },
    { name: "Investments", path: "/wealth/investments" },
  ];

  const transactions = fetchTransactionsFromDB();
  const categories = fetchCategoriesFromDB();

  return (
    <TransactionsProvider
      initialTransactions={transactions}
      initialCategories={categories}
    >
      <div className="flex h-full w-full flex-col lg:overflow-hidden">
        <ModuleNavbar navItems={wealthNavItems} />
        <main>{children}</main>
      </div>
    </TransactionsProvider>
  );
};

export default WealthLayout;
