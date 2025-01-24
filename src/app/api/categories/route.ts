import {
  addCategoryToDB,
  getAllCategories,
} from "@/app/(modules)/wealth/db/queries";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = getAllCategories();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
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

    const newCategory = addCategoryToDB(name, color);
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return new NextResponse("Failed to create category", { status: 500 });
  }
}
