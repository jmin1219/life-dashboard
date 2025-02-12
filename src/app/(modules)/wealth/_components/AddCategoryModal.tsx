"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  useAddCategory,
  useFetchCategories,
} from "../_hooks/useCategoriesHook";
import { CategoryType } from "../_types/CategoryType";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddCategoryModal = ({
  open,
  onClose,
  onCategoryAdded,
}: {
  open: boolean;
  onClose: () => void;
  onCategoryAdded: (newCategory: CategoryType) => void;
}) => {
  const { toast } = useToast();
  const addCategoryMutation = useAddCategory();
  const { data: categories = [] } = useFetchCategories();

  const [form, setForm] = useState({
    name: "",
    color: "#FFFFFF",
    icon: "",
    type: "",
  });

  const handleSubmit = async () => {
    if (form.name.trim() === "") {
      toast({
        title: "Error",
        description: "Category name is required.",
        variant: "destructive",
      });
      return;
    }
    if (
      categories.some((c) => c.name.toLowerCase() === form.name.toLowerCase())
    ) {
      toast({
        title: "Error",
        description: "Category already exists.",
        variant: "destructive",
      });
      return;
    }
    try {
      const newCategory = await addCategoryMutation.mutateAsync(form);
      onCategoryAdded(newCategory);

      toast({
        title: "Category Created",
        description: `Category "${form.name}" was added.`,
      });

      setForm({ name: "", color: "#FFFFFF", icon: "", type: "" });
      onClose();
    } catch (error) {
      console.error("Error adding category:", error);
      toast({
        title: "Error",
        description: "Failed to create category. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose();
      }}
    >
      <DialogContent className="max-w-lg rounded-md p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create a New Category
          </DialogTitle>
          <DialogDescription>
            Select a name and color for the new category.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right font-medium">
              Name
            </Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="col-span-3"
              placeholder="Category Name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right font-medium">
              Type
            </Label>
            <Select
              onValueChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  type: value,
                }))
              }
              value={form.type}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="income">Income</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="icon" className="text-right font-medium">
              Icon
            </Label>
            <Input
              id="icon"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="text-right font-medium">
              Color
            </Label>
            <Input
              id="color"
              type="color"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
