import {
  addTransactionToDB,
  deleteTransactionFromDB,
  getAllTransactions,
  updateTransactionInDB,
} from "@/app/(modules)/wealth/db/queries";
import { NextResponse } from "next/server";

// Fetch All Transactions
export async function GET() {
  try {
    const transactions = getAllTransactions();
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return new NextResponse("Failed to fetch transactions", { status: 500 });
  }
}

// Add a New Transaction
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, amount, date, type, category_id } = body;
    if (!title || !amount || !date || !type || !category_id) {
      return NextResponse.json(
        { error: "All field are required to create a transaction." },
        { status: 400 },
      );
    }

    const newTransaction = addTransactionToDB(body);
    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    console.error("Error adding transaction:", error);
    return new NextResponse("Failed to add transaction", { status: 500 });
  }
}

// Update a Transaction
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updatedTransaction } = body;

    if (!id || !updatedTransaction) {
      return NextResponse.json(
        { error: "Transaction ID and updated data are required." },
        { status: 400 },
      );
    }

    const updated = updateTransactionInDB(id, updatedTransaction);
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error updating transaction:", error);
    return new NextResponse("Failed to update transaction", { status: 500 });
  }
}

// Delete a Transaction
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Transaction ID is required." },
        { status: 400 },
      );
    }
    deleteTransactionFromDB(id);
    return NextResponse.json(
      { message: "Transaction deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json(
      { message: "Failed to delete transaction." },
      { status: 500 },
    );
  }
}
