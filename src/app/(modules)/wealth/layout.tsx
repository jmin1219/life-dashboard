"use client";

import React, { useState } from "react";
import ModuleNavbar from "@/components/ModuleNavbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const WealthLayout = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  const wealthNavItems = [
    { name: "Overview", path: "/wealth" },
    { name: "Transactions", path: "/wealth/transactions" },
    { name: "Budget & Goals", path: "/wealth/budgeting" },
    { name: "Investments", path: "/wealth/investments" },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-full w-full flex-col text-gray-200">
        {/* HEADER */}
        <div className="flex flex-col p-4 md:flex-row md:items-center md:justify-between">
          {/* Net Worth Summary */}
          <div className="flex flex-col">
            <h2 className="text-foreground-muted text-sm font-semibold text-gray-500">
              NET WORTH
            </h2>
            <span className="text-xl font-bold">₩ (Add Calculation)</span>
            <span className="text-sm text-gray-500">
              Updated: (Add today&apos;s date)
            </span>
          </div>
          {/* Wealth Module Navbar */}
          <div className="mt-3 md:mt-0">
            <ModuleNavbar navItems={wealthNavItems} />
          </div>
        </div>

        <main>{children}</main>
      </div>
    </QueryClientProvider>
  );
};

export default WealthLayout;
