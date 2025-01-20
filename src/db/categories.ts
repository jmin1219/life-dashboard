import db from "./connection";

export const getAllCategories = () => {
  const stmt = db.prepare("SELECT id, name, color FROM categories");
  return stmt.all();
};

export const addCategory = ({
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
