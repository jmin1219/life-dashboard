"use client";

import DatePicker from "./components/DatePicker";
import { Separator } from "@/components/ui/separator";
import TransactionBarChart from "./components/TransactionBarChart";
import TransactionTable from "./components/TransactionTable";
import TransactionPieCharts from "./components/TransactionPieChart";
import FiltersMenu from "./components/FiltersMenu";
import AddTransactionModal from "./components/AddTransactionModal";

const TransactionsTab = () => {
  return (
    <div className="flex h-full flex-col overflow-auto">
      {/* ------------------------ ROW 1 - DATE PICKER, & ADD TRANSACTION BUTTON ------------------------ */}
      <div className="mx-[10%] my-2 flex justify-between">
        <DatePicker />
        <AddTransactionModal />
      </div>
      <Separator className="my-2" />
      {/* ------------------------ ROW 2 - FILTERS ------------------------ */}
      <div className="mx-[5%]">
        <FiltersMenu />
      </div>
      <Separator className="my-2" />
      {/* ------------------------ ROW 3 - BAR CHART ------------------------ */}
      <TransactionBarChart />
      <Separator className="my-2" />
      {/* ------------------------ ROW 4 - TABLE & PIE CHART ------------------------ */}
      <div className="flex h-full flex-col lg:flex-row">
        <div className="flex w-1/4 flex-col">
          <span className="text-muted-foreground">TOTAL EXPENSES</span>
          <span className="text-2xl font-semibold">₩ 15,550,320</span>
          <TransactionPieCharts />
        </div>
        <Separator orientation="vertical" className="mx-2" />
        <div className="w-3/4">
          <TransactionTable />
        </div>
      </div>
    </div>
  );
};

export default TransactionsTab;
