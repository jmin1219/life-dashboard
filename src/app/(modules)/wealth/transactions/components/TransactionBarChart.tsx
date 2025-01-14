import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, CartesianGrid, YAxis } from "recharts";

const sampleData = [
  { month: "January", credit: 2500, debit: 1800 },
  { month: "February", credit: 2700, debit: 1950 },
  { month: "March", credit: 3000, debit: 2100 },
  { month: "April", credit: 3200, debit: 2200 },
  { month: "May", credit: 2800, debit: 2000 },
  { month: "June", credit: 3100, debit: 2300 },
  { month: "July", credit: 2900, debit: 2500 },
  { month: "August", credit: 3400, debit: 2700 },
  { month: "September", credit: 3300, debit: 2600 },
  { month: "October", credit: 3500, debit: 2800 },
  { month: "November", credit: 3000, debit: 2200 },
  { month: "December", credit: 3600, debit: 2900 },
];

const chartConfig = {
  credit: {
    label: "Credit",
    color: "#2469ea",
  },
  debit: {
    label: "Debit",
    color: "#60a800",
  },
} satisfies ChartConfig;

const TransactionBarChart = () => {
  return (
    // Lighter color for non-processed transactions
    <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
      <BarChart
        accessibilityLayer
        data={sampleData}
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
        <Bar
          dataKey="credit"
          radius={0}
          stackId="a"
          fill={chartConfig.credit.color}
        />
        <Bar
          dataKey="debit"
          radius={0}
          stackId="a"
          fill={chartConfig.debit.color}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default TransactionBarChart;
