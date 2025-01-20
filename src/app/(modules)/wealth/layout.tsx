import React from "react";
import ModuleNavbar from "@/components/ModuleNavbar";
import { fetchAllTransactions, fetchAllCategories } from "@/lib/api";
import { TransactionsProvider } from "@/context/TransactionsContext";

const WealthLayout = async ({ children }: { children: React.ReactNode }) => {
  const wealthNavItems = [
    { name: "Overview", path: "/wealth" },
    { name: "Transactions", path: "/wealth/transactions" },
    { name: "Budget & Goals", path: "/wealth/budget-goals" },
    { name: "Investments", path: "/wealth/investments" },
  ];

  const [transactions, categories] = await Promise.all([
    fetchAllTransactions(),
    fetchAllCategories(),
  ]);

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
