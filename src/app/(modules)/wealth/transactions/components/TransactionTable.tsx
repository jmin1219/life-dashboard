import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const sampleData = [
  {
    Date: "2025-01-01",
    Category: "Groceries",
    Amount: 75.5,
    Method: "Credit Card",
    Processed: true,
    Name: "Weekly grocery shopping",
  },
  {
    Date: "2025-01-02",
    Category: "Transportation",
    Amount: 15.0,
    Method: "Cash",
    Processed: true,
    Name: "Bus fare",
  },
  {
    Date: "2025-01-03",
    Category: "Entertainment",
    Amount: 50.0,
    Method: "Debit Card",
    Processed: false,
    Name: "Movie tickets",
  },
  {
    Date: "2025-01-04",
    Category: "Dining Out",
    Amount: 30.0,
    Method: "Credit Card",
    Processed: true,
    Name: "Lunch with friends",
  },
  {
    Date: "2025-01-05",
    Category: "Utilities",
    Amount: 120.0,
    Method: "Bank Transfer",
    Processed: true,
    Name: "Electricity bill",
  },
  {
    Date: "2025-01-06",
    Category: "Health & Fitness",
    Amount: 45.0,
    Method: "Credit Card",
    Processed: false,
    Name: "Gym membership renewal",
  },
  {
    Date: "2025-01-07",
    Category: "Shopping",
    Amount: 200.0,
    Method: "Debit Card",
    Processed: false,
    Name: "Clothing purchase",
  },
  {
    Date: "2025-01-08",
    Category: "Rent",
    Amount: 1500.0,
    Method: "Bank Transfer",
    Processed: true,
    Name: "Monthly rent payment",
  },
  {
    Date: "2025-01-09",
    Category: "Subscriptions",
    Amount: 12.99,
    Method: "Credit Card",
    Processed: true,
    Name: "Streaming service subscription",
  },
  {
    Date: "2025-01-10",
    Category: "Groceries",
    Amount: 65.3,
    Method: "Debit Card",
    Processed: false,
    Name: "Midweek grocery shopping",
  },
];

const TransactionTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-muted-foreground">DATE</TableHead>
          <TableHead className="text-muted-foreground">NAME</TableHead>
          <TableHead className="text-muted-foreground">CATEGORY</TableHead>
          <TableHead className="text-muted-foreground">AMOUNT</TableHead>
          <TableHead className="text-muted-foreground">METHOD</TableHead>
          <TableHead className="text-muted-foreground">PROCESSED?</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData
          .sort((a, b) => b.Date.localeCompare(a.Date))
          .map((transaction) => (
            <TableRow key={transaction.Name}>
              <TableCell>{transaction.Date}</TableCell>
              <TableCell>{transaction.Name}</TableCell>
              <TableCell>{transaction.Category}</TableCell>
              <TableCell>{transaction.Amount}</TableCell>
              <TableCell>{transaction.Method}</TableCell>
              <TableCell>{transaction.Processed}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
