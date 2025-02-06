"use client";

import DatePicker from "../_components/DatePicker";
import { Separator } from "@/components/ui/separator";
import TransactionBarChart from "../_components/TransactionBarChart";
import TransactionTable from "../_components/TransactionTable";
import TransactionPieCharts from "../_components/TransactionPieChart";
import FiltersMenu from "../_components/FiltersMenu";
import AddTransactionModal from "../_components/AddTransactionModal";
import { useTransactionsHook } from "../_hooks/useTransactionsHook";

const TransactionsTab = () => {
  // Fetch transactions from Zustand and TanStack Query
  const { transactions, isLoading } = useTransactionsHook();

  const totalExpenses = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="flex h-full flex-col">
      {/* ------------------------ ROW 1 - DATE PICKER, & ADD TRANSACTION BUTTON ------------------------ */}
      <div className="mx-[8%] my-3 flex justify-between">
        <DatePicker />
        <AddTransactionModal />
      </div>
      <Separator className="my-2" />
      {/* ------------------------ ROW 2 - FILTERS ------------------------ */}
      <div className="">
        <FiltersMenu />
      </div>
      <Separator className="my-2" />
      {/* ------------------------ ROW 3 - BAR CHART ------------------------ */}
      <TransactionBarChart transactions={transactions} />
      <Separator className="my-2" />
      {/* ------------------------ ROW 4 - TABLE & PIE CHART ------------------------ */}
      <div className="flex flex-col lg:flex-row">
        {/* TRANSACTION PIE CHARTS */}
        <div className="flex h-auto w-1/4 flex-col">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">
                TOTAL EXPENSES
              </span>
              <span className="text-right text-xl font-semibold">
                ₩ {totalExpenses.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">
                TOTAL INCOME
              </span>
              <span className="text-right text-xl font-semibold">
                ₩ {totalIncome.toLocaleString()}
              </span>
            </div>
          </div>
          <TransactionPieCharts transactions={transactions} />
        </div>
        <Separator orientation="vertical" className="mx-2" />
        {/* TRANSACTION TABLE */}
        <div className="w-3/4 flex-grow flex-col">
          <div className="overflow-y-auto">
            {isLoading ? (
              <p className="text-center">Loading Transactions...</p>
            ) : (
              <TransactionTable />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTab;
