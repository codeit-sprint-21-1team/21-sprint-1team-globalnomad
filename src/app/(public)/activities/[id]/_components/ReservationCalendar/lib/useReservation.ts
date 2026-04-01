"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { AvailableTime } from "@/types/activities";
import { getAvailableSchedule, createReservation } from "@/apis/activities.api";
import { useDialog } from "@/components/ui/Dialog";
import { patchUpdateMyReservation } from "@/apis/myReservations.api";

export interface SelectedSlot {
  id: number;
  startTime: string;
  endTime: string;
}

export function useReservation(
  activityId: number,
  price: number,
  initialData?: {
    reservationId: number;
    scheduleId: number;
    headcount: number;
    date: string;
  },
) {
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const isValidInitialDate = initialData ? initialData.date >= todayStr : false;

  const [currentMonth, setCurrentMonth] = useState(
    initialData ? new Date(initialData.date) : new Date(),
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    isValidInitialDate ? new Date(initialData!.date) : undefined,
  );
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const [headcount, setHeadcount] = useState(initialData?.headcount ?? 1);
  const queryClient = useQueryClient();

  const year = format(currentMonth, "yyyy");
  const month = format(currentMonth, "MM");

  const { data: availableSchedules = [] } = useQuery({
    queryKey: ["available-schedules", activityId, year, month],
    queryFn: () => getAvailableSchedule(activityId, year, month),
    select: (data) => {
      const now = new Date();
      const todayStr = format(now, "yyyy-MM-dd");
      const currentHour = now.getHours();

      return data
        .map((day) => {
          if (initialData && day.date === initialData.date) {
            return day;
          }

          if (day.date < todayStr) return null;

          if (day.date === todayStr) {
            return {
              ...day,
              times: day.times.filter((t) => {
                const startHour = parseInt(t.startTime.split(":")[0], 10);
                return startHour > currentHour;
              }),
            };
          }
          return day;
        })
        .filter(
          (day): day is NonNullable<typeof day> =>
            day !== null && day.times.length > 0,
        );
    },
  });

  useEffect(() => {
    if (isValidInitialDate && availableSchedules.length > 0) {
      const daySchedule = availableSchedules.find(
        (s) => s.date === initialData!.date,
      );
      if (daySchedule) {
        const slot = daySchedule.times.find(
          (t) => t.id === initialData!.scheduleId,
        );
        if (slot) setSelectedSlot(slot);
      }
    }
  }, [availableSchedules, initialData, isValidInitialDate]);

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
      queryClient.invalidateQueries({ queryKey: ["myReservations"] });
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

  const { mutate: updateReservation, isPending: isUpdating } = useMutation({
    mutationFn: (updateData: { scheduleId: number; headCount: number }) => {
      if (!initialData?.reservationId || !updateData.scheduleId) {
        throw new Error("필수 정보가 누락되었습니다.");
      }

      return patchUpdateMyReservation({
        reservationId: initialData.reservationId,
        updateData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myReservations"] });
      showDialog({ type: "alert", content: "예약이 변경되었습니다." });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "서버 오류가 발생했습니다.";
      showDialog({ type: "alert", content: msg });
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
    updateReservation,
    isUpdating,
  };
}
