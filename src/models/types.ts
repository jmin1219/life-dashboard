export interface TransactionType {
  id?: number;
  date: string;
  amount: number;
  method: string;
  category: string;
  description?: string;
  details?: string;
  processed?: boolean;
}
