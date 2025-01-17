import React from "react";
import ModuleNavbar from "@/components/ModuleNavbar";
import { fetchTransactions } from "@/lib/api";
import { TransactionType } from "@/models/types";

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
  console.log("✅ WealthLayout fetched transactions", transactions);

  return (
    <div className="flex h-full w-full flex-col lg:overflow-hidden">
      <ModuleNavbar navItems={wealthNavItems} />
      <main>{React.cloneElement(children, { transactions })}</main>
    </div>
  );
};

export default WealthLayout;
