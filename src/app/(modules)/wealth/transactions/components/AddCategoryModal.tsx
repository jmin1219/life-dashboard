"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toast } from "@/components/ui/toast";
import { useTransactions } from "@/context/TransactionsContext";
import { useToast } from "@/hooks/use-toast";
import { addCategory } from "@/lib/api";
import { useState } from "react";

const AddCategoryModal = ({
  onCategoryAdded,
  open,
  onClose,
}: {
  onCategoryAdded: () => void;
  open: boolean;
  onClose: () => void;
}) => {
  const { categories, setCategories } = useTransactions();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    color: "#FFFFFF",
  });

  const handleSubmit = async () => {
    if (form.name.trim() === "") {
      alert("Category name is required");
      return;
    }
    if (
      categories.some((c) => c.name.toLowerCase() === form.name.toLowerCase())
    ) {
      alert("Category already exists.");
      return;
    }
    try {
      const newCategory = await addCategory({
        name: form.name.trim(),
        color: form.color,
      });

      setCategories((prev) => [...prev, newCategory]);
      
      setForm({ name: "", color: "#FFFFFF" });
      onCategoryAdded();

      toast({
        title: "Category Created",
        description: `Category "${newCategory.name}" was created successfully.`,
      });
      onClose();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-md p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create New Category
          </DialogTitle>
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
