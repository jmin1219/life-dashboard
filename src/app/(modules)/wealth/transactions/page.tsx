"use client";

import DatePicker from "./components/DatePicker";
import { Separator } from "@/components/ui/separator";
import TransactionBarChart from "./components/BarChart";
import TransactionTable from "./components/TransactionTable";
import PieChart from "./components/PieChart";
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
        <div className="w-1/4">
          <PieChart />
        </div>
        <Separator orientation="vertical" />
        <div className="w-3/4">
          <TransactionTable />
        </div>
      </div>
    </div>
  );
};

export default TransactionsTab;
