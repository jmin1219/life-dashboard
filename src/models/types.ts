export interface TransactionType {
  id?: number; // This is optional for new transactions
  date: string; // Stored as YYYY-MM-DD
  amount: number;
  method: string;
  categoryId: number; // Matches category_id in the database
  category_name?: string;
  category_color?: string;
  title?: string;
  details?: string;
  processed: boolean;
}

export interface CategoryType {
  id?: number;
  name: string;
  color: string;
}
