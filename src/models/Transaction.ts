export interface TransactionType {
  id: number; // This is optional for new transactions
  date: string; // Stored as YYYY-MM-DD
  amount: number;
  method: string;
  category_id: number; // Matches category_id in the database
  title?: string;
  details?: string;
  processed: boolean;
  type: string;
}

export interface CategoryType {
  id: number;
  name: string;
  color: string;
}
