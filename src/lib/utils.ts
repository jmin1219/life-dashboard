import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toTitleCase = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const transactionTypeColors = {
  income: "#4CAF50", // Green
  expense: "#FF5252", // Red
  investment_buy: "#FFA500", // Orange
  investment_sell: "#2196F3", // Blue
  transfer: "#9E9E9E", // Gray
  liability_payment: "#8E44AD", // Purple
};
