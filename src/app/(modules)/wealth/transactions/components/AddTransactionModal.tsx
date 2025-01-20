"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CirclePlus as AddIcon } from "lucide-react";
import { useState } from "react";
import { addTransaction } from "@/lib/api";
import { useTransactions } from "@/context/TransactionsContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddTransactionModal = () => {
  const { transactions, setTransactions } = useTransactions();

  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: 0,
    method: "",
    categoryId: 0,
    title: "",
    details: "",
    processed: true,
  });

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setForm((prev) => ({
        ...prev,
        date: date.toISOString().split("T")[0],
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const newTransaction = await addTransaction(form);
      setTransactions((prev) => [newTransaction, ...prev]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-center rounded-xl border border-slate-600 p-0.5">
          <Button variant="ghost" className="m-0.5 rounded-[8px] text-lg">
            <AddIcon />
            <span className="hidden lg:block">Add Transaction</span>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
          <DialogDescription>
            Enter transaction details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Date */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {form.date
                    ? format(new Date(form.date), "PPP")
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={new Date(form.date)}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Title */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="col-span-3"
            />
          </div>

          {/* Amount */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              className="col-span-3"
              value={form.amount}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  amount: parseFloat(e.target.value) || 0,
                }))
              }
            />
          </div>

          {/* Payment Method */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="method" className="text-right">
              Payment Method
            </Label>
            <Input
              id="method"
              className="col-span-3"
              value={form.method}
              onChange={(e) =>
                setForm({
                  ...form,
                  method: e.target.value,
                })
              }
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select
              onValueChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  categoryId: parseInt(value, 10),
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                {transactions.map((item) => (
                  <SelectItem
                    key={item.categoryId}
                    value={item.categoryId.toString()}
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Details */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="details" className="text-right">
              Details
            </Label>
            <Input
              id="method"
              className="col-span-3"
              value={form.details}
              onChange={(e) =>
                setForm({
                  ...form,
                  details: e.target.value,
                })
              }
            />
          </div>

          {/* Processed */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="processed" className="text-right">
              Processed?
            </Label>
            <Input
              id="processed"
              type="checkbox"
              className="col-span-3"
              onChange={(e) =>
                setForm({
                  ...form,
                  processed: e.target.checked,
                })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Add Transaction</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionModal;
