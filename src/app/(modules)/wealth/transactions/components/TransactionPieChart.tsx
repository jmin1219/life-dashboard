"use client";

import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TransactionType } from "@/models/Transaction";
import { Pie, PieChart } from "recharts";

const TransactionPieCharts = ({
  transactions,
}: {
  transactions: TransactionType[];
}) => {
  const chartConfig = {} as ChartConfig;
  return (
    <div className="">
      {/* ---------------- TOP CHART: BY CATEGORY ---------------- */}
      <ChartContainer config={chartConfig} className="w-full">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie data={transactions} dataKey="visitors" innerRadius={40} />
        </PieChart>
      </ChartContainer>
      {/* ---------------- BOTTOM CHART: PROCESSED vs NON-PROCESSED ---------------- */}
      <ChartContainer config={chartConfig} className="w-full">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie data={transactions} dataKey="visitors" innerRadius={40} />
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default TransactionPieCharts;
