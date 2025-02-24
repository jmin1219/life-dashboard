import { db } from "@/db";
import { transactions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// Edit a Transaction
export async function PUT(req: NextRequest) {
  try {
    const urlParts = req.nextUrl.pathname.split("/");
    const id = urlParts[urlParts.length - 1];

    if (!id) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 },
      );
    }

    const transaction = await req.json();

    const existingTransaction = await db
      .select()
      .from(transactions)
      .where(eq(transactions.id, Number(id)))
      .get();

    if (!existingTransaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 },
      );
    }

    await db
      .update(transactions)
      .set(transaction)
      .where(eq(transactions.id, Number(id)));

    return NextResponse.json(
      { message: "Transaction udpated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating transaction:", error);
    return NextResponse.json(
      { message: "Failed to update transaction." },
      { status: 500 },
    );
  }
}

// Delete a Transaction
export async function DELETE(req: NextRequest) {
  try {
    const urlParts = req.nextUrl.pathname.split("/");
    const id = urlParts[urlParts.length - 1];

    if (!id) {
      return NextResponse.json(
        { error: "Transaction ID is required." },
        { status: 400 },
      );
    }
    await db.delete(transactions).where(eq(transactions.id, Number(id)));
    return NextResponse.json(
      { message: "Transaction deleted successfully" },
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
