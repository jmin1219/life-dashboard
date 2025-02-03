"use client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { TransactionType } from "../../types/Transaction";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
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

const EditTransactionModal = ({
  transaction,
  open,
  onClose,
}: {
  transaction: TransactionType;
  open: boolean;
  onClose: () => void;
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const [form, setForm] = useState(transaction);

  const [errors, setErrors] = useState({
    title: "",
    amount: "",
    method: "",
    type: "",
    category_id: "",
  });

  const validateForm = () => {
    const newErrors: {
      title: string;
      amount: string;
      type: string;
      method: string;
      category_id: string;
    } = {} as {
      title: string;
      type: string;
      amount: string;
      method: string;
      category_id: string;
    };
    if (!form.title) newErrors.title = "Title is required.";
    if (form.amount <= 0) newErrors.amount = "Amount must be greater than 0.";
    if (!form.type) newErrors.type = "Transaction type is required.";
    if (!form.method) newErrors.method = "Payment method is required.";
    if (form.category_id === 0)
      newErrors.category_id = "Please select a category.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [showDatePopover, setShowDatePopover] = useState(false);

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

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      await putTransaction(transaction.id, form);
      setTransactions(await getTransactions());

      toast({
        title: "Transaction Updated",
        description: "The transaction has been successfully updated.",
      });

      onClose();
    } catch (error) {
      console.error("Error updating transaction:", error);

      toast({
        title: "Error",
        description: "Failed to update transaction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>
            Edit the details of the transaction.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Date */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
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
              value={form.title ?? ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="col-span-3"
            />
            {errors.title && (
              <p className="col-span-4 text-right text-sm text-red-500">
                {errors.title}
              </p>
            )}
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
              value={form.type ?? ""}
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
            {errors.type && (
              <p className="col-span-4 text-right text-sm text-red-500">
                {errors.type}
              </p>
            )}
          </div>

          {/* Amount */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              className="col-span-3"
              value={form.amount ?? ""}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  amount: parseFloat(e.target.value) || 0,
                }))
              }
            />
            {errors.amount && (
              <p className="col-span-4 text-right text-sm text-red-500">
                {errors.amount}
              </p>
            )}
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
            {errors.category_id && (
              <p className="col-span-4 text-right text-sm text-red-500">
                {errors.category_id}
              </p>
            )}
          </div>

          {/* Payment Method */}
          {/* TODO: Add dropdown of previously used list */}
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
            {errors.method && (
              <p className="col-span-4 text-right text-sm text-red-500">
                {errors.method}
              </p>
            )}
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
              className="col-span-3 h-5 w-5"
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
          <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <span className="loader"></span> : "Edit Transaction"}
          </Button>
        </DialogFooter>
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
      </DialogContent>
    </Dialog>
  );
};

export default EditTransactionModal;
