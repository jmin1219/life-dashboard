"use client";

import { Button } from "@/components/ui/button";
import { X as DeleteIcon } from "lucide-react";
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

const TransactionTable = () => {
  const { transactions, categories, deleteTransaction, updateTransaction } =
    useTransactions();

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionType>();

  if (!transactions || transactions.length === 0) {
    return <div>No transactions available.</div>;
  }

  const handleEdit = (transaction: TransactionType) => {
    setSelectedTransaction(transaction);
    setShowEditModal(true);
  };

  const handleProcessTransaction = (transactionId: number) => {};

  const handleDelete = (transactionId: number) => {
    alert(`Deleting ${transactionId}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {/* TODO: Click column name to sort */}
          <TableHead className="text-muted-foreground">DATE</TableHead>
          <TableHead className="text-muted-foreground">TITLE</TableHead>
          <TableHead className="text-muted-foreground">TYPE</TableHead>
          <TableHead className="text-muted-foreground">AMOUNT</TableHead>
          <TableHead className="text-muted-foreground">CATEGORY</TableHead>
          <TableHead className="text-muted-foreground">METHOD</TableHead>
          <TableHead className="text-muted-foreground">PROCESSED?</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => {
          const category = categories.find(
            (cat) => cat.id === transaction.category_id,
          );
          return (
            <TableRow
              key={transaction.id}
              onClick={() => handleEdit(transaction)}
            >
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.title}</TableCell>
              {/* TODO: give category color and outline shape */}
              <TableCell
                className={
                  transaction.type === "income"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                ₩ {transaction.amount.toLocaleString()}
              </TableCell>
              <TableCell>
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
              <TableCell>{transaction.method}</TableCell>
              {/* TODO: use checkbox and automatically update database when clicked. */}
              <TableCell>
                <Checkbox
                  checked={transaction.processed ? true : false}
                  className="border-0 data-[state=checked]:bg-slate-500"
                  onCheckedChange={() =>
                    handleProcessTransaction(transaction.id)
                  }
                />
              </TableCell>
              {/* DELETE TRANSACTION BUTTON */}
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-full border-0 hover:bg-red-700"
                    >
                      <DeleteIcon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-full">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Transaction?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the transaction and remove data from your
                        database.
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
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
