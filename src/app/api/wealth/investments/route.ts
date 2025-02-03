import { db } from "@/db";
import { investments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const allInvestments = await db.select().from(investments);
    return NextResponse.json(allInvestments, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch investments" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      accountId,
      assetName,
      assetType,
      shares,
      pricePerShare,
      totalValue,
      datePurchased,
    } = await req.json();

    if (
      !accountId ||
      !assetName ||
      !assetType ||
      !shares ||
      !pricePerShare ||
      !totalValue ||
      !datePurchased
    ) {
      return NextResponse.json(
        { error: "All fields are required to create an investment." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Investment added successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to create investment.",
      },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, ...udpatedData } = await req.json();

    const existingInvestment = db
      .select()
      .from(investments)
      .where(eq(investments.id, id))
      .get();
    if (!existingInvestment) {
      return NextResponse.json(
        { error: "Investment not found" },
        { status: 404 },
      );
    }

    await db.update(investments).set(udpatedData).where(eq(investments.id, id));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update investment" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await db.delete(investments).where(eq(investments.id, id));

    return NextResponse.json(
      { message: "Investment deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete Investment" },
      { status: 500 },
    );
  }
}
