import { db } from "@/db";
import { budgets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const allBudgets = await db.select().from(budgets);
    return NextResponse.json(allBudgets, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch budgets" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { categoryId, amount, period } = await req.json();

    if (categoryId || !amount || !period) {
      return NextResponse.json(
        { error: "All fields are required to create a budget." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Budget added successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to create budget.",
      },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, ...udpatedData } = await req.json();

    const existingBudget = db
      .select()
      .from(budgets)
      .where(eq(budgets.id, id))
      .get();
    if (!existingBudget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }

    await db.update(budgets).set(udpatedData).where(eq(budgets.id, id));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update budget" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await db.delete(budgets).where(eq(budgets.id, id));

    return NextResponse.json(
      { message: "Budget deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete budget" },
      { status: 500 },
    );
  }
}
