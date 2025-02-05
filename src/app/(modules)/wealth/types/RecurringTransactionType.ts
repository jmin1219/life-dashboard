export interface RecurringTransactionType {
  id: number;
  date: number; // stored as UNIX timestamp
  amount: number;
  categoryId?: number;
  title: string;
  description?: string;
  necessity: "essential" | "optional" | "unexpected but necessary";
  type:
    | "income"
    | "expense"
    | "investment_buy"
    | "investment_sell"
    | "transfer"
    | "liability_payment";
  startDate: number;
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  nextOccurrence: number;
  endDate?: number;
  createdAt: number;
}

export interface RecurringTransactionTypeWithCategory extends RecurringTransactionType {
  category_name: string;
  category_color: string;
  category_icon: string;
}