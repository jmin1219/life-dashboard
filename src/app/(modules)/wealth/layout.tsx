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
        <div className="flex flex-col">
          {/* Net Worth Summary */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-foreground-muted text-md text-gray-500">
                NET WORTH
              </h2>
              <span className="text-2xl font-bold tracking-wide">
                ₩ (Add Calculation)
              </span>
              <span className="text-sm text-gray-500">
                Updated: (Add today&apos;s date)
              </span>
            </div>
            {/* Wealth Module Navbar */}
            <div className="">
              <ModuleNavbar navItems={wealthNavItems} />
            </div>
          </div>
        </div>

        <main>{children}</main>
      </div>
    </QueryClientProvider>
  );
};

export default WealthLayout;
