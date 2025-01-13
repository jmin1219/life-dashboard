import ModuleNavbar from "@/components/ModuleNavbar";

const WealthPage = () => {
  const wealthNavItems = [
    { name: "Overview", path: "/wealth" },
    { name: "Transactions", path: "/wealth/transactions" },
  ];
  return (
    <div className="flex">
      <ModuleNavbar navItems={wealthNavItems} />
    </div>
  );
};

export default WealthPage;
