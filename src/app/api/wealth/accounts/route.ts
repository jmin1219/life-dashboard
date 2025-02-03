import { db } from "@/db";
import { accounts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const allAccounts = await db.select().from(accounts);
    return NextResponse.json(allAccounts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch accounts" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, type, balance, currency } = await req.json();

    if (!name || !type || !balance || !currency) {
      return NextResponse.json(
        { error: "All fields are required to create an account." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Account added successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to create account.",
      },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, ...udpatedData } = await req.json();

    const existingAccount = db
      .select()
      .from(accounts)
      .where(eq(accounts.id, id))
      .get();
    if (!existingAccount) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    await db.update(accounts).set(udpatedData).where(eq(accounts.id, id));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update account" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await db.delete(accounts).where(eq(accounts.id, id));

    return NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 },
    );
  }
}
