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
import { useTransactions } from "@/app/(modules)/wealth/context/TransactionsContext";
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
import { postTransaction } from "@/lib/api";

const AddTransactionModal = () => {
  const { toast } = useToast();
  const { setTransactions, categories } = useTransactions();

  const [showDatePopover, setShowDatePopover] = useState(false);
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: 0,
    method: "",
    category_id: 0,
    title: "",
    details: "",
    processed: true,
    type: "expense",
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.amount <= 0 || form.category_id === 0 || !form.method) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const preprocessedForm = {
        ...form,
        amount: parseFloat(form.amount.toString()) || 0,
        categoryId: form.category_id || 0,
        date: new Date(form.date).toISOString().split("T")[0],
      };
      const newTransaction = await postTransaction(preprocessedForm);
      setTransactions((prev) => [newTransaction, ...prev]);

      toast({
        title: "Transaction Added!",
        description: "Your transaction has been successfully added.",
      });

      setForm({
        date: new Date().toISOString().split("T")[0],
        amount: 0,
        method: "",
        category_id: 0,
        title: "",
        details: "",
        processed: true,
        type: "",
      });
      setShowAddCategoryModal(false);
      setShowAddTransactionModal(false);
    } catch (error) {
      console.error("Error adding transaction:", error);

      toast({
        title: "Error",
        description: "Failed to add the transaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog
      open={showAddTransactionModal}
      onOpenChange={(isOpen) => {
        setShowAddTransactionModal(isOpen);
        if (!isOpen) {
          setShowAddCategoryModal(false);
        }
      }}
    >
      <DialogTrigger asChild>
        <div className="flex items-center justify-center rounded-xl border border-slate-600 p-0.5">
          <Button variant="ghost" className="text-md m-0.5 rounded-[8px]">
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
            <Select
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, type: value }))
              }
              value={form.type}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
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
                  category_id: parseInt(value, 10),
                }));
              }}
              value={form.category_id ? form.category_id.toString() : ""}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id ? category.id.toString() : ""}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span
                        className="font-medium"
                        style={{ color: category.color }}
                      >
                        {category.name}
                      </span>
                    </div>
                  </SelectItem>
                ))}
                <Separator />
                <SelectItem key="add-new" value="add-new">
                  Add New Category
                </SelectItem>
              </SelectContent>
            </Select>
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
              checked={form.processed}
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
          <Button type="submit" onClick={handleSubmit}>
            Add Transaction
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
