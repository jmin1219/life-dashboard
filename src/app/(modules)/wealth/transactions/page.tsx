"use client";

import DatePicker from "../_components/DatePicker";
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
    <div className="flex h-full flex-col px-3">
      {/* ------------------------ ROW 1 - DATE PICKER, & ADD TRANSACTION BUTTON ------------------------ */}
      <div className="mx-[5%] mb-2 flex justify-between">
        <DatePicker />
        <AddTransactionModal />
      </div>
      {/* ------------------------ ROW 2 - FILTERS ------------------------ */}
      <div className="mb-2 flex justify-center">
        <FiltersMenu />
      </div>
      {/* ------------------------ ROW 3 - BAR CHART ------------------------ */}
      <div className="mb-3 rounded-xl border-t border-slate-600 bg-gray-900">
        <TransactionBarChart transactions={transactions} />
      </div>
      {/* ------------------------ ROW 4 - TABLE & PIE CHART ------------------------ */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        {/* LEFT: TRANSACTION PIE CHARTS */}
        <div className="flex flex-col rounded-xl border-t border-slate-600 bg-gray-900 p-2">
          {/* Total Stats */}
          <div className="flex justify-between">
            {/* Total Expenses */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-muted-foreground">
                TOTAL EXPENSES
              </span>
              <span className="text-right text-xl font-semibold">
                ₩ {totalExpenses.toLocaleString()}
              </span>
            </div>
            {/* Total Income */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-muted-foreground">
                TOTAL INCOME
              </span>
              <span className="text-right text-xl font-semibold">
                ₩ {totalIncome.toLocaleString()}
              </span>
            </div>
          </div>
          {/* Charts */}
          <TransactionPieCharts transactions={transactions} />
        </div>
        {/* RIGHT: TRANSACTION TABLE */}
        <div className="col-span-3 flex flex-col rounded-xl border-t border-slate-600 bg-gray-900 p-2">
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
