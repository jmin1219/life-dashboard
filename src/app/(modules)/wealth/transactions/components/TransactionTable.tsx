"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { TransactionType } from "@/models/types";

const TransactionTable = ({
  transactions,
}: {
  transactions: TransactionType[];
}) => {
  if (!transactions || transactions.length === 0) {
    return <div>No transactions available.</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {/* TODO: Click column name to sort */}
          <TableHead className="text-muted-foreground">DATE</TableHead>
          <TableHead className="text-muted-foreground">NAME</TableHead>
          <TableHead className="text-muted-foreground">CATEGORY</TableHead>
          <TableHead className="text-muted-foreground">AMOUNT</TableHead>
          <TableHead className="text-muted-foreground">METHOD</TableHead>
          <TableHead className="text-muted-foreground">PROCESSED?</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            {/* TODO: give category color and outline shape */}
            <TableCell>{transaction.category}</TableCell>
            <TableCell>₩ {transaction.amount}</TableCell>
            <TableCell>{transaction.method}</TableCell>
            {/* TODO: use checkbox and automatically update database when clicked. */}
            <TableCell>{transaction.processed ? "Yes" : "No"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
