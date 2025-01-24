"use client";

import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TransactionType } from "@/app/(modules)/wealth/types/Transaction";
import { Bar, BarChart, XAxis, CartesianGrid, YAxis } from "recharts";

const TransactionBarChart = ({
  transactions,
}: {
  transactions: TransactionType[];
}) => {
  const chartConfig = {};
  return (
    // Lighter color for non-processed transactions
    <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
      <BarChart
        accessibilityLayer
        data={transactions}
        height={100}
        margin={{ top: 20, left: -20, right: 15 }}
        maxBarSize={75}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickFormatter={(value) => value.slice(0, 3)}
          tickLine={false}
        />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="credit" radius={0} stackId="a" />
        <Bar dataKey="debit" radius={0} stackId="a" />
      </BarChart>
    </ChartContainer>
  );
};

export default TransactionBarChart;
