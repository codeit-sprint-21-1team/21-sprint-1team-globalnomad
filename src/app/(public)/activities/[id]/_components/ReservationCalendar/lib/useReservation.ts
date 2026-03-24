"use client";

import { useState } from "react";
import { format } from "date-fns";
import type { AvailableSchedule, AvailableTime } from "@/types/activities";

export interface SelectedSlot {
  id: number;
  startTime: string;
  endTime: string;
}

export function useReservation(
  availableSchedules: AvailableSchedule[],
  price: number,
) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const [headcount, setHeadcount] = useState(1);

  const scheduleMap = Object.fromEntries(
    availableSchedules.map(({ date, times }) => [date, times]),
  ) as Record<string, AvailableTime[]>;

  const toDateStr = (d: Date) => format(d, "yyyy-MM-dd");

  const timeSlots: AvailableTime[] = selectedDate
    ? (scheduleMap[toDateStr(selectedDate)] ?? [])
    : [];

  const handleDayClick = (day: Date) => {
    if (!scheduleMap[toDateStr(day)]) return;

    if (selectedDate && toDateStr(day) === toDateStr(selectedDate)) {
      setSelectedDate(undefined);
      setSelectedSlot(null);
      return;
    }

    setSelectedDate(day);
    setSelectedSlot(null);
  };

  const totalPrice = price * headcount;

  const reset = () => {
    setSelectedDate(undefined);
    setSelectedSlot(null);
    setHeadcount(1);
  };

  return {
    selectedDate,
    selectedSlot,
    headcount,
    timeSlots,
    scheduleMap,
    toDateStr,
    handleDayClick,
    setSelectedSlot,
    setHeadcount,
    totalPrice,
    reset,
  };
}
