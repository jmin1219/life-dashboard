import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import {
  addDays,
  addMonths,
  addQuarters,
  addYears,
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  format,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
} from "date-fns";
import { ChevronLeft as LeftIcon } from "lucide-react";
import { ChevronRight as RightIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Separator } from "@/components/ui/separator";

const DatePicker = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });
  const [granularity, setGranularity] = useState<string>("Week");
  const granularOptions = ["Week", "Month", "Quarter", "Semester", "Year"];

  const applyPreset = (preset: string) => {
    const now = new Date();

    switch (preset) {
      case "Today":
        setDate({ from: now, to: undefined });
        break;
      case "Yesterday":
        setDate({ from: addDays(now, -1), to: undefined });
        break;
      case "This":
        switch (granularity) {
          case "Week":
            setDate({ from: startOfWeek(now), to: endOfWeek(now) });
            break;
          case "Month":
            setDate({ from: startOfMonth(now), to: endOfMonth(now) });
            break;
          case "Quarter":
            setDate({ from: startOfQuarter(now), to: endOfQuarter(now) });
            break;
          case "Semester":
            const isSecondHalf = now.getMonth() >= 6;
            setDate({
              from: new Date(now.getFullYear(), isSecondHalf ? 6 : 0, 1),
              to: new Date(now.getFullYear(), isSecondHalf ? 11 : 5, 30),
            });
            break;
          case "Year":
            setDate({
              from: new Date(now.getFullYear(), 0, 1),
              to: new Date(now.getFullYear(), 11, 31),
            });
            break;
        }
        break;
      case "Last":
        switch (granularity) {
          case "Week":
            setDate({
              from: startOfWeek(addDays(now, -7)),
              to: endOfWeek(addDays(now, -7)),
            });
            break;
          case "Month":
            setDate({
              from: startOfMonth(addMonths(now, -1)),
              to: endOfMonth(addMonths(now, -1)),
            });
            break;
          case "Quarter":
            setDate({
              from: startOfQuarter(addMonths(now, -3)),
              to: endOfQuarter(addMonths(now, -3)),
            });
            break;
          case "Semester":
            const lastSemesterStart =
              now.getMonth() >= 6
                ? new Date(now.getFullYear(), 0, 1) // first half of year
                : new Date(now.getFullYear() - 1, 6, 1); // second half of previous year
            const lastSemesterEnd =
              now.getMonth() >= 6
                ? new Date(now.getFullYear(), 5, 30)
                : new Date(now.getFullYear() - 1, 11, 31);
            setDate({ from: lastSemesterStart, to: lastSemesterEnd });
            break;
          case "Year":
            setDate({
              from: new Date(now.getFullYear() - 1, 0, 1),
              to: new Date(now.getFullYear() - 1, 11, 31),
            });
            break;
        }
        break;
      default:
        break;
    }
  };

  const handleBackward = () => {
    if (!date?.from) return;

    if (!date.to) {
      setDate({ from: addDays(date.from, -1) });
    } else {
      switch (granularity) {
        case "Week":
          setDate({ from: addDays(date.from, -7), to: addDays(date.to, -7) });
          break;
        case "Month":
          setDate({
            from: startOfMonth(addMonths(date.from, -1)),
            to: endOfMonth(addMonths(date.to, -1)),
          });
          break;
        case "Quarter":
          setDate({
            from: startOfQuarter(addQuarters(date.from, -1)),
            to: endOfQuarter(addQuarters(date.to, -1)),
          });
          break;
        case "Semester":
          setDate({
            from: addMonths(date.from, -6),
            to: addMonths(date.to, -6),
          });
          break;
        case "Year":
          setDate({
            from: addYears(date.from, -1),
            to: addYears(date.to, -1),
          });
          break;
      }
    }
  };

  const handleForward = () => {
    if (!date?.from) return;

    if (!date.to) {
      setDate({ from: addDays(date.from, 1) });
    } else {
      switch (granularity) {
        case "Week":
          setDate({ from: addDays(date.from, 7), to: addDays(date.to, 7) });
          break;
        case "Month":
          setDate({
            from: startOfMonth(addMonths(date.from, 1)),
            to: endOfMonth(addMonths(date.to, 1)),
          });
          break;
        case "Quarter":
          setDate({
            from: startOfQuarter(addQuarters(date.from, 1)),
            to: endOfQuarter(addQuarters(date.to, 1)),
          });
          break;
        case "Semester":
          setDate({
            from: addMonths(date.from, 6),
            to: addMonths(date.to, 6),
          });
          break;
        case "Year":
          setDate({
            from: addYears(date.from, 1),
            to: addYears(date.to, 1),
          });
          break;
      }
    }
  };

  return (
    <div className="flex items-center justify-center rounded-xl border border-slate-600 p-1">
      <Button
        variant="ghost"
        className="rounded-l-[8px]"
        onClick={handleBackward}
      >
        <LeftIcon />
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="text-md overflow-hidden lg:w-[260px]"
          >
            <CalendarIcon />
            <span className="hidden lg:block">
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                "Pick a date"
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto flex-col space-y-2 rounded border border-blue-300">
          {/* Preset Options */}
          <div className="flex items-center justify-evenly">
            <Button
              variant="outline"
              onClick={() => applyPreset("Today")}
              className="rounded focus:ring-2 focus:ring-blue-300"
            >
              Today
            </Button>
            <Button
              variant="outline"
              onClick={() => applyPreset("Yesterday")}
              className="rounded focus:ring-2 focus:ring-blue-300"
            >
              Yesterday
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="rounded">
                  This <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[120px] rounded">
                <div className="flex flex-col">
                  {granularOptions.map((option) => (
                    <Button
                      key={option}
                      variant="ghost"
                      onClick={() => {
                        setGranularity(option);
                        applyPreset("This");
                      }}
                      className="rounded focus:ring-2 focus:ring-blue-300"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="rounded">
                  Last <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[120px] rounded">
                <div className="flex flex-col">
                  {granularOptions.map((option) => (
                    <Button
                      key={option}
                      variant="ghost"
                      onClick={() => {
                        setGranularity(option);
                        applyPreset("Last");
                      }}
                      className="rounded focus:ring-2 focus:ring-blue-300"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Separator />
          {/* Calendar */}
          <Calendar
            mode="range"
            selected={date}
            defaultMonth={date?.from}
            onSelect={setDate}
            numberOfMonths={2}
            showOutsideDays={false}
          />
        </PopoverContent>
      </Popover>
      <Button
        variant="ghost"
        className="rounded-r-[8px]"
        onClick={handleForward}
      >
        <RightIcon />
      </Button>
    </div>
  );
};

export default DatePicker;
