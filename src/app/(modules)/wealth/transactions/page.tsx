"use client";

import DatePicker from "./components/DatePicker";
import { Separator } from "@/components/ui/separator";
import BarChart from "./components/BarChart";
import TransactionTable from "./components/TransactionTable";
import PieChart from "./components/PieChart";
import FiltersMenu from "./components/FiltersMenu";
import AddTransactionModal from "./components/AddTransactionModal";

const TransactionsTab = () => {
  return (
    <div className="flex h-full w-full flex-col">
      {/* ------------------------ ROW 1 - DATE PICKER, & ADD TRANSACTION BUTTON ------------------------ */}
      <div className="mx-[10%] flex justify-between">
        <DatePicker />
        <AddTransactionModal />
      </div>
      <Separator className="my-3" />
      {/* ------------------------ ROW 2 - FILTERS ------------------------ */}
      <div className="mx-[5%]">
        <FiltersMenu />
      </div>
      <Separator className="my-3" />
      {/* ------------------------ ROW 3 - BAR CHART ------------------------ */}
      <BarChart />
      <Separator className="my-3" />
      {/* ------------------------ ROW 4 - TABLE & PIE CHART ------------------------ */}
      <div className="flex h-full">
        <TransactionTable />
        <Separator orientation="vertical" />
        <PieChart />
      </div>
    </div>
  );
};

export default TransactionsTab;
