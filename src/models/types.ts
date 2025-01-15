export interface TransactionType {
  _id: string;
  date: string; // ISO date string from MongoDB
  amount: number;
  method: string;
  category: string;
  description: string;
  details?: string;
  processed: boolean;
}
