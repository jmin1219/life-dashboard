import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    method: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, default: "" },
    details: { type: String, default: "" },
    processed: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Transactions =
  mongoose.models.Transactions ||
  mongoose.model("Transactions", transactionsSchema);
