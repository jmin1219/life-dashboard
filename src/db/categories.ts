import { CategoryType } from "@/models/types";
import db from "./connection";

export const fetchCategoriesFromDB = (): CategoryType[] => {
  const stmt = db.prepare("SELECT id, name, color FROM categories");
  return stmt.all() as CategoryType[];
};

export const addCategoryToDB = ({
  name,
  color,
}: {
  name: string;
  color: string;
}) => {
  const stmt = db.prepare("INSERT INTO categories (name, color) VALUES (?, ?)");
  const result = stmt.run(name, color);
  return { id: result.lastInsertRowid as number, name, color };
};
