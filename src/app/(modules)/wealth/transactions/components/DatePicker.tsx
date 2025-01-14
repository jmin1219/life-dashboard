import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { ChevronLeft as LeftIcon } from "lucide-react";
import { ChevronRight as RightIcon } from "lucide-react";

const DatePicker = () => {
  const [date, setDate] = useState<Date>();

  return (
    <div className="flex items-center justify-center rounded-xl border border-slate-600 p-1">
      <Button variant="ghost" className="rounded-l-[8px]">
        <LeftIcon />
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="text-lg lg:px-24">
            <CalendarIcon />
            <span className="hidden lg:block">
              {date ? format(date, "PPP") : "Pick a date"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {/* TODO: Change Calendar to Range, and add pre-made options on right side of calendar  */}
          <Calendar
            initialFocus
            mode="single"
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button variant="ghost" className="rounded-r-[8px]">
        <RightIcon />
      </Button>
    </div>
  );
};

export default DatePicker;
