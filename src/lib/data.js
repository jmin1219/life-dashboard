import { Transactions } from "../models/transactionsSchema";
import { connectDB } from "./db";

export const fetchTransactions = async () => {
  try {
    await connectDB("wealth-module");
    const transactions = await Transactions.find();
    return transactions;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users");
  }
};
