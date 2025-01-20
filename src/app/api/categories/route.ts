import { getAllCategories } from "@/db/transactions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = getAllCategories();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new NextResponse("Failed to fetch categories", { status: 500 });
  }
}
