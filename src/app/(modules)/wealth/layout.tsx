import React from "react";
import ModuleNavbar from "@/components/ModuleNavbar";

const WealthLayout = async ({ children }: { children: React.ReactNode }) => {
  const wealthNavItems = [
    { name: "Overview", path: "/wealth" },
    { name: "Transactions", path: "/wealth/transactions" },
    { name: "Budget & Goals", path: "/wealth/budgeting" },
    { name: "Investments", path: "/wealth/investments" },
  ];

  return (
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
              ₩ 12,345,678
            </span>
            <span className="text-sm text-gray-500">Updated: Jan 23, 2025</span>
          </div>
          {/* Wealth Module Navbar */}
          <div className="">
            <ModuleNavbar navItems={wealthNavItems} />
          </div>
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
};

export default WealthLayout;
