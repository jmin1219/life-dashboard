import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";
import { TransactionType } from "@/models/types";

const sampleData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const TransactionPieCharts = ({
  transactions,
}: {
  transactions: TransactionType[];
}) => {
  return (
    <div className="">
      {/* ---------------- TOP CHART: BY CATEGORY ---------------- */}
      <ChartContainer config={chartConfig} className="w-full">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie data={sampleData} dataKey="visitors" innerRadius={40} />
        </PieChart>
      </ChartContainer>
      {/* ---------------- BOTTOM CHART: PROCESSED vs NON-PROCESSED ---------------- */}
      <ChartContainer config={chartConfig} className="w-full">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie data={sampleData} dataKey="visitors" innerRadius={40} />
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default TransactionPieCharts;
