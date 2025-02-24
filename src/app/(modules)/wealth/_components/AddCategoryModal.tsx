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
import IconPickerDialog from "@/components/IconPicker/IconPickerDialog";

// TODO: Change icon set to allow more options related to categories
// TODO: Filter out already used icons from the icons list
// TODO: Maybe just use preset colors for color picker
// TODO: Filter categories based on type and the category's type

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

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Category name is required.";
    if (
      categories.some((c) => c.name.toLowerCase() === form.name.toLowerCase())
    )
      newErrors.name = "A category with the same name already exists.";
    if (!form.icon || form.icon === "")
      newErrors.icon = "Please select an icon.";
    if (!form.type) newErrors.type = "Please select a category type.";

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

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
          <div className="grid grid-cols-4 items-center gap-x-4">
            <Label htmlFor="name" className="text-right font-medium">
              Name
            </Label>
            <div className="col-span-3 flex gap-3">
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Category Name"
              />
              <IconPickerDialog
                onChange={(icon) => setForm({ ...form, icon })}
              />
            </div>
            {formErrors.name && (
              <p className="col-span-3 col-start-2 text-sm text-red-500">
                {formErrors.name}
              </p>
            )}
            {formErrors.icon && (
              <p className="col-span-3 col-start-2 text-sm text-red-500">
                {formErrors.icon}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-x-4">
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
              {formErrors.type && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {formErrors.type}
                </p>
              )}
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-x-4">
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
