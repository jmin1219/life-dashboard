import { addCategoryToDB, fetchCategoriesFromDB } from "@/db/categories";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = fetchCategoriesFromDB();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new NextResponse("Failed to fetch categories", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, color } = await req.json();

    if (!name || !color) {
      return NextResponse.json(
        {
          error: "Name and color are required.",
        },
        { status: 400 },
      );
    }

    const newCategory = addCategoryToDB({ name, color });
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return new NextResponse("Failed to create category", { status: 500 });
  }
}
