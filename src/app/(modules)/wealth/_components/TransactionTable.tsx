"use client";

import { useTransactionsHook } from "../_hooks/useTransactionsHook";
import { TransactionWithCategoryType } from "../_types/TransactionType";

import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/DataTable";
import { toTitleCase } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

// Table Columns and Cells Styling
const columns: ColumnDef<TransactionWithCategoryType>[] = [
  {
    accessorKey: "date",
    header: () => <div className="text-left font-semibold">DATE</div>,
    cell: ({ row }) => (
      <div className="text-left">
        {new Date(row.getValue("date")).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: () => <div className="text-left font-semibold">TITLE</div>,
    cell: ({ row }) => (
      <div className="max-w-xs truncate text-left">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right font-semibold">AMOUNT</div>,
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KRW",
      }).format(row.getValue("amount"));

      return <div className="text-right font-semibold">{formatted}</div>;
    },
  },
  {
    accessorKey: "category_name",
    header: () => <div className="text-center font-semibold">CATEGORY</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <div
          className="inline-flex items-center rounded-full px-2 py-0.5 text-white"
          style={{ backgroundColor: row.original.category_color }}
        >
          {row.getValue("category_name")}
        </div>
      </div>
    ),
  },
  {
    // TODO: Set specific colors for each type; maybe make amount same color
    accessorKey: "type",
    header: () => <div className="text-center font-semibold">TYPE</div>,
    cell: ({ row }) => (
      <div
        className={`text-center font-semibold ${typeColor(row.getValue("type"))}`}
      >
        {toTitleCase(row.getValue("type"))}
      </div>
    ),
  },
  {
    accessorKey: "necessity",
    header: () => <div className="text-center font-semibold">NECESSITY</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {toTitleCase(row.getValue("necessity"))}
      </div>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <div className="flex justify-center gap-0">
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Pencil className="h-2 w-2 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Trash2 className="h-2 w-2 text-gray-400" />
        </Button>
      </div>
    ),
  },
];

const typeColor = (type: string) => {
  switch (type) {
    case "expense":
      return "text-red-500";
    case "income":
      return "text-green-500";
    default:
      return "text-blue-500";
  }
};

const TransactionTable = () => {
  const { transactions, isLoading, error } = useTransactionsHook();

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p className="text-red-500">Error loading transactions.</p>;

  return (
    <div>
      <DataTable columns={columns} data={transactions} />
    </div>
  );
};

export default TransactionTable;
