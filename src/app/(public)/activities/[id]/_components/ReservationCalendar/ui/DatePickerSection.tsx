"use client";

import { DayPicker, type DayButtonProps } from "react-day-picker";
import { cn } from "@/commons/utils/cn";

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

const DAY_PICKER_CLASS_NAMES = {
  root: "w-full h-full flex flex-col relative",
  months: "flex-1 flex flex-col",
  month: "flex-1 flex flex-col",
  month_caption: "flex items-center h-8 mb-1 flex-shrink-0",
  caption_label: "text-sm font-semibold text-gray-950",
  nav: "absolute right-0 top-0 h-8 flex items-center gap-0.5",
  button_previous:
    "p-0.5 rounded hover:bg-gray-100 text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed",
  button_next:
    "p-0.5 rounded hover:bg-gray-100 text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed",
  month_grid: "w-full flex-1 border-collapse",
  weekdays: "flex flex-shrink-0",
  weekday: "flex-1 text-center text-sm font-medium text-black py-1 select-none",
  week: "flex w-full mt-2",
  day: "flex-1 flex items-center justify-center",
};

function isDateDisabled(
  day: Date,
  scheduleMap: Record<string, unknown[]>,
  toDateStr: (d: Date) => string,
) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return day < today || !scheduleMap[toDateStr(day)];
}

function CalendarDayButton({ modifiers, ...props }: DayButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "w-9 h-9 rounded-full text-sm font-medium transition-colors select-none",
        modifiers.selected
          ? "bg-blue-500 text-white hover:bg-blue-400"
          : modifiers.disabled || modifiers.outside
            ? "text-gray-300 cursor-default pointer-events-none"
            : "bg-blue-100 text-blue-500 hover:bg-blue-200 cursor-pointer",
        modifiers.today && !modifiers.selected && "font-bold",
      )}
    />
  );
}

interface DatePickerSectionProps {
  scheduleMap: Record<string, unknown[]>;
  selectedDate: Date | undefined;
  toDateStr: (d: Date) => string;
  onDayClick: (day: Date) => void;
  month?: Date;
  onMonthChange?: (month: Date) => void;
}

export function DatePickerSection({
  scheduleMap,
  selectedDate,
  toDateStr,
  onDayClick,
  month,
  onMonthChange,
}: DatePickerSectionProps) {
  return (
    <DayPicker
      mode="single"
      selected={selectedDate}
      onDayClick={onDayClick}
      disabled={(day) => isDateDisabled(day, scheduleMap, toDateStr)}
      showOutsideDays
      month={month}
      onMonthChange={onMonthChange}
      formatters={{
        formatWeekdayName: (day) => WEEKDAY_LABELS[day.getDay()],
      }}
      classNames={DAY_PICKER_CLASS_NAMES}
      components={{ DayButton: CalendarDayButton }}
    />
  );
}
