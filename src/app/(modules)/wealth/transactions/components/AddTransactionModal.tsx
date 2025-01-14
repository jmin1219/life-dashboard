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

const AddTransactionModal = () => {
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
          <DialogTitle>Add new transaction</DialogTitle>
          <DialogDescription>
            Enter transaction details below.
          </DialogDescription>
        </DialogHeader>
        {/* TODO: Edit add transaction form input data */}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Input id="type" defaultValue="Expense" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="desc" className="text-right">
              Description
            </Label>
            <Input id="desc" defaultValue="12000" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input id="amount" defaultValue="12000" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionModal;
