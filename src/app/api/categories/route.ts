import { getCategories, postCategory } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = getCategories();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new NextResponse("Failed to fetch categories", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newCategory = postCategory(body);
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return new NextResponse("Failed to create category", { status: 500 });
  }
}
