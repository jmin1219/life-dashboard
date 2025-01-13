import ModuleNavbar from "@/components/ModuleNavbar";

const WealthLayout = ({ children }: { children: React.ReactNode }) => {
  const wealthNavItems = [
    { name: "Overview", path: "/wealth" },
    { name: "Transactions", path: "/wealth/transactions" },
    { name: "Budget & Goals", path: "/wealth/budget-goals" },
    { name: "Investments", path: "/wealth/investments" },
  ];
  return (
    <div className="flex w-full flex-col">
      <ModuleNavbar navItems={wealthNavItems} />
      <main>{children}</main>
    </div>
  );
};

export default WealthLayout;
