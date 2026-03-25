"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { AvailableTime } from "@/types/activities";
import { getAvailableSchedule, createReservation } from "@/apis/activities.api";
import { useDialog } from "@/components/ui/Dialog";

export interface SelectedSlot {
  id: number;
  startTime: string;
  endTime: string;
}

export function useReservation(activityId: number, price: number) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const [headcount, setHeadcount] = useState(1);

  const year = format(currentMonth, "yyyy");
  const month = format(currentMonth, "MM");

  const { data: availableSchedules = [] } = useQuery({
    queryKey: ["available-schedules", activityId, year, month],
    queryFn: () => getAvailableSchedule(activityId, year, month),
  });

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

  const { showDialog } = useDialog();

  const { mutate: submitReservation, isPending } = useMutation({
    mutationFn: () =>
      createReservation(activityId, selectedSlot!.id, headcount),
    onSuccess: () => {
      reset();
      showDialog({ type: "alert", content: "예약이 완료되었습니다." });
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message ?? "예약에 실패했습니다.")
        : "예약에 실패했습니다.";
      showDialog({ type: "alert", content: message });
    },
  });

  const handleReservation = () => {
    if (!selectedSlot) return;
    submitReservation();
  };

  return {
    currentMonth,
    setCurrentMonth,
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
    handleReservation,
    isPending,
  };
}
