"use client";

import * as React from "react";
import {
  format,
  parse,
  isValid,
  isBefore,
  isAfter,
  startOfToday,
  addMonths,
} from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/Input/Input";
import { Calendar } from "@/components/ui/Calendar/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover/Popover";
import { cn } from "@/commons/utils/cn";

interface DateInputPickerProps {
  labelTxt?: string;
  errorTxt?: string;
  placeholder?: string;
  value?: Date | null;
  onValueChange: (date: Date | null) => void;
  onBlur?: React.FocusEventHandler;
}

export function DateInputPicker({
  labelTxt,
  errorTxt,
  value,
  onValueChange,
  onBlur,
  placeholder = format(new Date(), "yy/MM/dd"),
  // ...props
}: DateInputPickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value ?? undefined);
  const [inputValue, setInputValue] = React.useState(
    value ? format(value, "yy/MM/dd") : "",
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const [rangeError, setRangeError] = React.useState("");

  const minDate = startOfToday();
  const maxDate = addMonths(new Date(), 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);

    let formattedValue = "";
    if (value.length <= 2) {
      formattedValue = value;
    } else if (value.length <= 4) {
      formattedValue = `${value.slice(0, 2)}/${value.slice(2)}`;
    } else {
      formattedValue = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 6)}`;
    }
    setInputValue(formattedValue);
    setRangeError("");

    if (value.length === 6) {
      const parsedDate = parse(formattedValue, "yy/MM/dd", new Date());
      if (isValid(parsedDate)) {
        if (isBefore(parsedDate, minDate) || isAfter(parsedDate, maxDate)) {
          setRangeError("올바른 날짜 범위를 입력해주세요");
          onValueChange(null);
        } else {
          onValueChange(parsedDate);
        }
      } else {
        setRangeError("유효하지 않은 날짜입니다.");
        onValueChange(null);
      }
    } else {
      setDate(undefined);
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setInputValue(format(selectedDate, "yy/MM/dd"));
      setRangeError("");
      onValueChange(selectedDate);
      setIsOpen(false);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (isOpen) return;
    if (inputValue.length === 0 || inputValue.length < 8) {
      onValueChange(null);
    }
    if (onBlur) onBlur(e);
  };

  return (
    <div className="relative w-full">
      <Input
        labelTxt={labelTxt}
        errorTxt={rangeError || errorTxt}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        inputMode="numeric"
        className="pr-12"
        maxLength={8}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
      />

      <div
        className={cn(
          "absolute right-4 flex items-center",
          labelTxt ? "top-[58px]" : "top-[26px]",
          "transform -translate-y-1/2",
        )}
      >
        <Popover
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open && onBlur) {
              onBlur({} as React.FocusEvent);
            }
          }}
        >
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex items-center justify-center min-w-[44px] min-h-[44px] text-gray-500 hover:text-gray-700 transition-colors"
              aria-label={
                labelTxt ? `${labelTxt} 달력 열기` : "날짜 선택 달력 열기"
              }
            >
              <CalendarIcon className="size-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
              locale={ko}
              disabled={{ before: minDate, after: maxDate }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
