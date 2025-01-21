import {
  deleteTransaction,
  getTransactions,
  postTransaction,
  putTransaction,
} from "@/lib/api";
import { NextResponse } from "next/server";

// Fetch All Transactions
export async function GET() {
  try {
    const transactions = getTransactions();
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
    const newTransaction = postTransaction(body);
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
    const updatedTransaction = putTransaction(body);
    return NextResponse.json(updatedTransaction, { status: 200 });
  } catch (error) {
    console.error("Error updating transaction:", error);
    return new NextResponse("Failed to update transaction", { status: 500 });
  }
}

// Delete a Transaction
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    deleteTransaction(id);
    return new NextResponse("Transaction deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return new NextResponse("Failed to delete transaction", { status: 500 });
  }
}
