export type TransactionTypeEnum =
  | "income"
  | "expense"
  | "investment_buy"
  | "investment_sell"
  | "transfer"
  | "liability_payment";

export type TransactionNecessityEnum =
  | "essential"
  | "optional"
  | "unexpected but necessary";

export interface TransactionType {
  id?: number;
  date: string; // use ISO string format (YYYY-MM-DD)
  accountId: number;
  amount: number;
  categoryId: number | null;
  title: string;
  description?: string;
  necessity: TransactionNecessityEnum;
  type: TransactionTypeEnum;
}

export interface TransactionWithCategoryType extends TransactionType {
  category_name: string;
  category_color: string;
  category_icon: string;
}

export interface AddTransactionFormType {
  id?: number | null;
  date: string; // use ISO string format (YYYY-MM-DD)
  amount: number;
  accountId: number | null;
  categoryId: number | null;
  title: string;
  description?: string;
  necessity: TransactionNecessityEnum;
  type: TransactionTypeEnum;
}
