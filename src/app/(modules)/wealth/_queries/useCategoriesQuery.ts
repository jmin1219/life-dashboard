import { CategoryType } from "../_types/CategoryType";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/wealth/categories`;

// Fetch all categories
export const fetchCategoriesAPI = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch categories.");
  return res.json();
};

// Add a transaction
export const addCategoryAPI = async (category: Omit<CategoryType, "id">) => {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(category),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to add category");
  return res.json();
};
