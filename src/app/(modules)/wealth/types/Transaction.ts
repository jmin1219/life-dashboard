export interface TransactionType {
  id: number;
  date: number; // stored as UNIX timestamp
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

export interface TransactionWithCategory extends TransactionType {
  category_name: string;
  category_color: string;
}

export interface CategoryType {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export interface TransactionForm {
  date: number;
  amount: number;
  type:
    | "expense"
    | "income"
    | "investment_buy"
    | "investment_sell"
    | "transfer"
    | "liability_payment";
  categoryId: number;
  title: string;
  description?: string;
  necessity: "essential" | "optional" | "unexpected but necessary";
}
