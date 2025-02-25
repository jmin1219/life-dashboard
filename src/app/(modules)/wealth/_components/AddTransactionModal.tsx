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
import { useTransactionsHook } from "../_hooks/useTransactionsHook";
import { CategoryType } from "../_types/CategoryType";
import { useFetchCategories } from "../_hooks/useCategoriesHook";
import { AddTransactionFormType } from "../_types/TransactionType";
import { useFetchAccounts } from "../_hooks/useAccountsHooks";
import { IconRenderer } from "@/components/IconPicker/icon-picker";

const AddTransactionModal = () => {
  const { toast } = useToast();

  const { addTransaction } = useTransactionsHook();
  const { data: categories = [], isLoading: isCategoryLoading } =
    useFetchCategories();
  const { data: accounts = [], isLoading: isAccountLoading } =
    useFetchAccounts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDatePopover, setShowDatePopover] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState<AddTransactionFormType>({
    date: new Date().toISOString().split("T")[0],
    amount: 0,
    accountId: null,
    categoryId: null,
    title: "",
    description: "",
    necessity: "optional",
    type: "expense",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.title) newErrors.title = "Title is required.";
    if (form.amount <= 0) newErrors.amount = "Amount must be greater than 0.";
    if (form.categoryId === 0 || !form.categoryId)
      newErrors.categoryId = "Please select a category.";
    if (form.accountId === 0 || !form.accountId)
      newErrors.accountId = "Please select an account.";

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleCategoryAdded = async (newCategory: CategoryType) => {
    setForm((prev) => ({
      ...prev,
      categoryId: newCategory.id,
    }));
    setShowAddCategoryModal(false);
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
        accountId: null,
        categoryId: null,
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
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <div className="flex h-8 items-center justify-center rounded-xl border-t border-slate-600 bg-gray-900 p-1">
          <Button variant="ghost" className="text-md h-7 rounded-[8px]">
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
        <div className="grid gap-4">
          {/* Date */}
          <div className="grid grid-cols-4 items-center gap-x-4">
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
          <div className="grid grid-cols-4 items-center gap-x-4">
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
            {formErrors.title && (
              <p className="col-span-3 col-start-2 text-sm text-red-500">
                {formErrors.title}
              </p>
            )}
          </div>

          {/* Type */}
          <div className="grid grid-cols-4 items-center gap-x-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select
              onValueChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  type: value as AddTransactionFormType["type"],
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
          <div className="grid grid-cols-4 items-center gap-x-4">
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
            {formErrors.amount && (
              <p className="col-span-3 col-start-2 text-sm text-red-500">
                {formErrors.amount}
              </p>
            )}
          </div>

          {/* Account Dropdown */}
          <div className="grid grid-cols-4 items-center gap-x-4">
            <Label htmlFor="account" className="text-right">
              Account
            </Label>
            <Select
              onValueChange={(value) => {
                setForm((prev) => ({
                  ...prev,
                  accountId: parseInt(value, 10),
                }));
              }}
              value={form.accountId ? form.accountId.toString() : ""}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue
                  placeholder={
                    isAccountLoading ? "Loading..." : "Select a Account"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id.toString()}>
                    <div className="flex items-center gap-3">
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: account.color }}
                      ></div>
                      {account.name}
                    </div>
                  </SelectItem>
                ))}
                <Separator />
              </SelectContent>
            </Select>
            {formErrors.accountId && (
              <p className="col-span-3 col-start-2 text-sm text-red-500">
                {formErrors.accountId}
              </p>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="grid grid-cols-4 items-center gap-x-4">
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
              {/* Category List should be filtered by the Type if not empty */}
              <SelectTrigger className="col-span-3">
                <SelectValue
                  placeholder={
                    isCategoryLoading ? "Loading..." : "Select a Category"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    <div
                      className="flex items-center gap-2 rounded-xl px-2 py-0.5"
                      style={{ backgroundColor: category.color }}
                    >
                      <IconRenderer icon={category.icon} className="size-5" />
                      {category.name}
                    </div>
                  </SelectItem>
                ))}
                <Separator />
                <SelectItem key="add-new" value="add-new">
                  Add New Category
                </SelectItem>
              </SelectContent>
            </Select>
            {formErrors.categoryId && (
              <p className="col-span-3 col-start-2 text-sm text-red-500">
                {formErrors.categoryId}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="grid grid-cols-4 items-center gap-x-4">
            <Label htmlFor="details" className="text-right">
              Description
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

          {/* Necessity */}
          <div className="grid grid-cols-4 items-center gap-x-4">
            <Label htmlFor="necessity" className="text-right">
              Necessity
            </Label>
            <Select
              onValueChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  necessity: value as AddTransactionFormType["necessity"],
                }))
              }
              value={form.necessity}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="essential">Essential</SelectItem>
                <SelectItem value="optional">Optional</SelectItem>
                <SelectItem value="unexpected but necessary">
                  Unexpected But Necessary
                </SelectItem>
              </SelectContent>
            </Select>
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
          onCategoryAdded={handleCategoryAdded}
        />
      )}
    </Dialog>
  );
};

export default AddTransactionModal;
