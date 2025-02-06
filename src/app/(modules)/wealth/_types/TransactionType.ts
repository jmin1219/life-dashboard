export interface TransactionType {
  id?: number;
  date: string; // use ISO string format (YYYY-MM-DD)
  amount: number;
  categoryId: number;
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
}

export interface TransactionWithCategoryType extends TransactionType {
  category_name: string;
  category_color: string;
  category_icon: string;
}
