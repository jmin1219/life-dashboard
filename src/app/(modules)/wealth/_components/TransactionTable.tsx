"use client";

import { useTransactionsHook } from "../_hooks/useTransactionsHook";
import { TransactionWithCategoryType } from "../_types/TransactionType";

import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/DataTable";
import { toTitleCase } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const { transactions, isLoading, error, deleteTransaction } =
    useTransactionsHook();

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p className="text-red-500">Error loading transactions.</p>;

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
        <div className="max-w-xs truncate text-left">
          {row.getValue("title")}
        </div>
      ),
    },
    {
      // TODO: Change amounts to color based on transactionTypeColor in utils. And remove transaction type from columns (?)
      accessorKey: "amount",
      header: () => <div className="text-right">AMOUNT</div>,
      cell: ({ row }) => {
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "KRW",
        }).format(row.getValue("amount"));

        return <div className="text-right">{formatted}</div>;
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
      cell: ({ row }) => {
        const transactionId = row.original.id;
        return (
          <div className="flex items-center justify-center gap-1">
            {/* EDIT BUTTON */}
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Pencil className="h-2 w-2 text-gray-400" />
            </Button>
            {/* DELETE BUTTON */}
            <AlertDialog>
              <AlertDialogTrigger>
                <div className="rounded-xl p-3 hover:bg-red-600 hover:bg-opacity-50">
                  <Trash2 className="h-4 w-4 text-gray-400" />
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 text-white hover:bg-red-800 hover:text-black"
                    onClick={() =>
                      transactionId !== undefined && handleDelete(transactionId)
                    }
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];
  const sortedTransactions = transactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const handleDelete = (id: number) => {
    deleteTransaction(id);
  };

  return (
    <div>
      <DataTable columns={columns} data={sortedTransactions} />
    </div>
  );
};

export default TransactionTable;
