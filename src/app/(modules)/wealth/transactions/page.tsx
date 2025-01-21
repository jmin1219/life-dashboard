"use client";

import DatePicker from "./components/DatePicker";
import { Separator } from "@/components/ui/separator";
import TransactionBarChart from "./components/TransactionBarChart";
import TransactionTable from "./components/TransactionTable";
import TransactionPieCharts from "./components/TransactionPieChart";
import FiltersMenu from "./components/FiltersMenu";
import AddTransactionModal from "./components/AddTransactionModal";
import { useTransactions } from "@/context/TransactionsContext";

const TransactionsTab = () => {
  const { transactions } = useTransactions();

  const totalExpenses = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  );

  return (
    <div className="flex h-full flex-col">
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
      <TransactionBarChart transactions={transactions} />
      <Separator className="my-2" />
      {/* ------------------------ ROW 4 - TABLE & PIE CHART ------------------------ */}
      <div className="flex flex-col lg:flex-row">
        <div className="flex h-auto w-1/4 flex-col">
          <span className="text-muted-foreground">TOTAL EXPENSES</span>
          <span className="text-2xl font-semibold">₩ {totalExpenses}</span>
          <TransactionPieCharts transactions={transactions} />
        </div>
        <Separator orientation="vertical" className="mx-2" />
        <div className="w-3/4 flex-grow flex-col">
          <div className="overflow-y-auto">
            <TransactionTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTab;
