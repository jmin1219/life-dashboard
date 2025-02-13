"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { IconRenderer } from "./icon-picker";
import IconPicker from "./IconPicker";

const IconPickerDialog = ({
  onChange,
}: {
  onChange: (icon: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<null | string>(null);

  return (
    <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[40px] rounded-xl">
          {selected ? (
            <>
              <IconRenderer icon={selected} />
            </>
          ) : (
            "?"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select an Icon</DialogTitle>
        </DialogHeader>
        <IconPicker
          onChange={(icon) => {
            setSelected(icon);
            onChange(icon);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default IconPickerDialog;
