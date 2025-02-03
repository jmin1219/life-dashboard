"use client";

import { Button } from "@/components/ui/button";
import { X as DeleteIcon, EditIcon } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useTransactions } from "@/app/(modules)/wealth/context/TransactionsContext";
import { TransactionType } from "@/app/(modules)/wealth/types/Transaction";
import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { deleteTransaction } from "@/lib/api";
import EditTransactionModal from "./EditTransactionModal";

const TransactionTable = () => {
  const { transactions, setTransactions, categories } = useTransactions();

  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionType | null>(null);

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        No transactions available.
      </div>
    );
  }

  const handleProcessTransaction = (transactionId: number) => {
    alert(`Processing ${transactionId}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      // TODO: Add toast for delete confirmation
    } catch (error) {
      console.error("Error deleting transaction.", error);
      // TODO: Add toast for delete fail
    }
  };
  // TODO: Add loading skeleton for each of the three sections
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="h-4">
            {/* TODO: Click column name to sort */}
            <TableHead className="text-muted-foreground">DATE</TableHead>
            <TableHead className="text-muted-foreground">TITLE</TableHead>
            <TableHead className="text-muted-foreground">AMOUNT</TableHead>
            <TableHead className="text-muted-foreground">CATEGORY</TableHead>
            <TableHead className="text-muted-foreground">METHOD</TableHead>
            <TableHead className="text-muted-foreground">PROCESSED?</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-auto text-sm">
          {transactions.map((transaction) => {
            const category = categories.find(
              (cat) => cat.id === transaction.category_id,
            );
            return (
              <TableRow key={transaction.id} className="h-3">
                <TableCell className="whitespace-nowrap">
                  {transaction.date}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {transaction.title}
                </TableCell>
                {/* TODO: give category color and outline shape */}
                <TableCell
                  className={`whitespace-nowrap ${
                    transaction.type === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  ₩ {(transaction.amount || 0).toLocaleString()}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {category ? (
                    <span
                      style={{
                        backgroundColor: category.color,
                        padding: "2px 8px",
                        borderRadius: "4px",
                        color: "white",
                      }}
                    >
                      {category.name}
                    </span>
                  ) : (
                    "Unkown"
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {transaction.method}
                </TableCell>
                {/* TODO: use checkbox and automatically update database when clicked. */}
                <TableCell className="whitespace-nowrap">
                  <Checkbox
                    checked={transaction.processed ? true : false}
                    className="border-0 data-[state=checked]:bg-slate-500"
                    onCheckedChange={() =>
                      handleProcessTransaction(transaction.id)
                    }
                  />
                </TableCell>
                {/* ACTIONS: EDIT OR DELETE */}
                <TableCell className="whitespace-nowrap">
                  <div className="flex w-full justify-evenly">
                    {/* Edit Button */}
                    <div>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedTransaction(transaction)}
                        className="rounded-full border-0 hover:bg-blue-700"
                      >
                        <EditIcon />
                      </Button>
                    </div>
                    {/* Delete Button */}
                    <div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="rounded-full border-0 hover:bg-red-700"
                          >
                            <DeleteIcon />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Transaction?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the transaction and remove data
                              from your database.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-xl">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(transaction.id)}
                              className="rounded-xl bg-red-600 font-semibold text-white hover:bg-red-800"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        {selectedTransaction && (
          <EditTransactionModal
            transaction={selectedTransaction}
            open={!!selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
          />
        )}
      </Table>
    </>
  );
};

export default TransactionTable;
