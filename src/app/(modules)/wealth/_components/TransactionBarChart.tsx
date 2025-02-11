"use client";

import { TransactionWithCategoryType } from "@/app/(modules)/wealth/_types/TransactionType";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { transactionTypeColors } from "@/lib/utils";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TransactionChartDataType = {
  date: string;
  income: number;
  expense: number;
  investmentBuy: number;
  investmentSell: number;
  liability: number;
  transfer: number;
  netBalance: number;
};

const TransactionBarChart = ({
  transactions,
}: {
  transactions: TransactionWithCategoryType[];
}) => {
  const data = transactions.reduce<Record<string, TransactionChartDataType>>(
    (acc, tx) => {
      const date = tx.date;
      if (!acc[date]) {
        acc[date] = {
          date,
          income: 0,
          expense: 0,
          investmentBuy: 0,
          investmentSell: 0,
          liability: 0,
          transfer: 0,
          netBalance: 0,
        };
      }
      if (tx.type === "income") acc[date].income += tx.amount;
      if (tx.type === "expense") acc[date].expense += tx.amount;
      if (tx.type === "investment_buy") acc[date].investmentBuy += tx.amount;
      if (tx.type === "investment_sell") acc[date].investmentSell += tx.amount;
      if (tx.type === "liability_payment") acc[date].liability += tx.amount;
      if (tx.type === "transfer") acc[date].transfer += tx.amount; // Transfers included

      acc[date].netBalance +=
        tx.type === "income" || tx.type === "investment_sell"
          ? tx.amount
          : -tx.amount;

      return acc;
    },
    {},
  );

  const chartData = Object.values(data).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const chartConfig = {
    income: {
      label: "Income",
      color: transactionTypeColors.income,
    },
    expense: {
      label: "Expense",
      color: transactionTypeColors.expense,
    },
    transfer: {
      label: "Transfer",
      color: transactionTypeColors.transfer,
    },
    investment_sell: {
      label: "Investment (Sell)",
      color: transactionTypeColors.investment_sell,
    },
    investment_buy: {
      label: "Investment (Buy)",
      color: transactionTypeColors.investment_buy,
    },
    liability_payment: {
      label: "Liability Payment",
      color: transactionTypeColors.liability_payment,
    },
    netBalance: {
      label: "Net Balance",
      color: "white",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickLine={false} stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" stackId="a" fill={transactionTypeColors.income} />
        <Bar
          dataKey="investmentSell"
          stackId="a"
          fill={transactionTypeColors.investment_sell}
        />
        <Bar
          dataKey="expense"
          stackId="b"
          fill={transactionTypeColors.expense}
        />
        <Bar
          dataKey="investmentBuy"
          stackId="b"
          fill={transactionTypeColors.investment_buy}
        />
        <Bar
          dataKey="liability"
          stackId="b"
          fill={transactionTypeColors.liability_payment}
        />
        <Line type="monotone" dataKey="netBalance" />
      </BarChart>
    </ChartContainer>
  );
};

export default TransactionBarChart;
