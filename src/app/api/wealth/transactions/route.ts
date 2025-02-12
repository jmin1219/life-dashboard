import { db } from "@/db";
import { categories, transactions } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

// Fetch All Transactions
export async function GET() {
  try {
    const fullTransactions = await db
      .select({
        id: transactions.id,
        date: transactions.date,
        title: transactions.title,
        amount: transactions.amount,
        type: transactions.type,
        necessity: transactions.necessity,
        accountId: transactions.accountId,
        category_name: categories.name,
        category_color: categories.color,
        category_icon: categories.icon,
        categoryId: transactions.categoryId,
      })
      .from(transactions)
      .leftJoin(categories, eq(transactions.categoryId, categories.id));
    return NextResponse.json(fullTransactions, { status: 200 });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return new NextResponse("Failed to fetch transactions", { status: 500 });
  }
}

// Add a New Transaction
export async function POST(req: NextRequest) {
  try {
    const {
      accountId,
      categoryId,
      type,
      amount,
      title,
      description,
      necessity,
      date,
    } = await req.json();

    if (
      !title ||
      !amount ||
      !date ||
      !type ||
      !categoryId ||
      !accountId ||
      !necessity
    ) {
      return NextResponse.json(
        { error: "All fields are required to create a transaction." },
        { status: 400 },
      );
    }

    await db.insert(transactions).values({
      accountId,
      categoryId,
      type,
      amount,
      title,
      description,
      necessity,
      date,
    });
    return NextResponse.json(
      { message: "Transaction added successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding transaction:", error);
    return new NextResponse("Failed to add transaction", { status: 500 });
  }
}
