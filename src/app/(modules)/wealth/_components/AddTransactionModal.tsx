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
import { Separator } from "@/components/ui/separator";
import AddCategoryModal from "./AddCategoryModal";
import { useToast } from "@/hooks/use-toast";
import { useTransactionsUIStore } from "../_stores/useTransactionsStore";
import { useTransactionsHook } from "../_hooks/useTransactionsHook";

const AddTransactionModal = () => {
  // TODO: Fix Toast
  const { toast } = useToast();

  const { addTransaction } = useTransactionsHook();

  const [isModaleOpen, setIsModalOpen] = useState(false);
  const [showDatePopover, setShowDatePopover] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: 0,
    categoryId: 0,
    title: "",
    description: "",
    necessity: "optional" as
      | "essential"
      | "optional"
      | "unexpected but necessary",
    type: "expense" as
      | "income"
      | "expense"
      | "investment_buy"
      | "investment_sell"
      | "transfer"
      | "liability_payment",
  });

  const validateForm = () => {
    if (!form.title)
      return toast({ title: "Title is requried", variant: "destructive" });
    if (form.amount <= 0)
      return toast({
        title: "Amount must be greater than 0",
        variant: "destructive",
      });
    if (form.categoryId === 0 || !form.categoryId)
      return toast({
        title: "Please select a category",
        variant: "destructive",
      });
    return true;
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000,
      )
        .toISOString()
        .split("T")[0];
      setForm((prev) => ({
        ...prev,
        date: localDate,
      }));
      setShowDatePopover(false);
    }
  };

  const handleSubmit = async (addAnother: boolean = false) => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      await addTransaction(form);

      toast({
        title: "Transaction Added!",
        description: "Your transaction has been successfully added.",
      });

      setForm({
        date: new Date().toISOString().split("T")[0],
        amount: 0,
        categoryId: 0,
        title: "",
        description: "",
        type: "expense",
        necessity: "optional",
      });
      if (!addAnother) {
        setShowAddCategoryModal(false);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast({
        title: "Error",
        description: "Failed to add the transaction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModaleOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center justify-center rounded-xl border border-slate-600 p-0.5">
          <Button variant="ghost" className="text-md m-0.5 rounded-[8px]">
            <AddIcon />
            <span className="hidden lg:block">Add Transaction</span>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
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
            <Popover open={showDatePopover} onOpenChange={setShowDatePopover}>
              <PopoverTrigger asChild className="col-span-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDatePopover((prev) => !prev)}
                >
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
              autoFocus
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="col-span-3"
            />
          </div>

          {/* Type */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            {/* TODO: Select Dropdown */}
            <Select
              onValueChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  type: value as
                    | "income"
                    | "expense"
                    | "investment_buy"
                    | "investment_sell"
                    | "transfer"
                    | "liability_payment",
                }))
              }
              value={form.type}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="investment_buy">Investment - Buy</SelectItem>
                <SelectItem value="investment_sell">
                  Investment - Sell
                </SelectItem>
                <SelectItem value="transfer">transfer</SelectItem>
                <SelectItem value="liability_payment">
                  Liability Payment
                </SelectItem>
              </SelectContent>
            </Select>
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

          {/* Category Dropdown */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select
              onValueChange={(value) => {
                if (value === "add-new") {
                  setShowAddCategoryModal(true);
                  return;
                }
                setForm((prev) => ({
                  ...prev,
                  categoryId: parseInt(value, 10),
                }));
              }}
              value={form.categoryId ? form.categoryId.toString() : ""}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                {/* TODO: Import Categories based on type */}
                <Separator />
                <SelectItem key="add-new" value="add-new">
                  Add New Category
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="details" className="text-right">
              Details
            </Label>
            <Input
              id="method"
              className="col-span-3"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            variant="secondary"
            onClick={() => handleSubmit(true)}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loader"></span>
            ) : (
              "Save & Add Another"
            )}
          </Button>
          <Button
            type="submit"
            onClick={() => handleSubmit(false)}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Add Transaction"}
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <AddCategoryModal
          open={showAddCategoryModal}
          onClose={() => setShowAddCategoryModal(false)}
          onCategoryAdded={() => {
            setShowAddCategoryModal(false);
          }}
        />
      )}
    </Dialog>
  );
};

export default AddTransactionModal;
