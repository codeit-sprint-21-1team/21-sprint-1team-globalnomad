"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { AvailableTime, AvailableSchedule } from "@/types/activities";
import { getAvailableSchedule, createReservation } from "@/apis/activities.api";
import { useDialog } from "@/components/ui/Dialog";
import { patchUpdateMyReservation } from "@/apis/myReservations.api";

export interface SelectedSlot {
  id: number;
  startTime: string;
  endTime: string;
}

function parseStartHour(timeStr: string): number {
  return parseInt(timeStr.split(":")[0], 10);
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? fallback;
  }
  return fallback;
}

function filterAvailableSchedules(
  data: AvailableSchedule[],
  todayStr: string,
  currentHour: number,
  initialData?: { date: string },
): AvailableSchedule[] {
  return data
    .map((day): AvailableSchedule | null => {
      if (initialData && day.date === initialData.date && day.date >= todayStr) return day;
      if (day.date < todayStr) return null;
      if (day.date === todayStr) {
        return {
          ...day,
          times: day.times.filter((t) => parseStartHour(t.startTime) > currentHour),
        };
      }
      return day;
    })
    .filter((day): day is AvailableSchedule => day !== null && day.times.length > 0);
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
    throwOnError: true,
    select: (data) => {
      // select는 캐시 히트 시에도 실행되므로 날짜·시각을 항상 fresh하게 계산
      const now = new Date();
      return filterAvailableSchedules(data, format(now, "yyyy-MM-dd"), now.getHours(), initialData);
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
        if (slot) {
          const timer = setTimeout(() => {
            setSelectedSlot((prev) => {
              if (!prev) return slot;
              return prev;
            });
          }, 0);
          return () => clearTimeout(timer);
        }
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
      showDialog({ type: "alert", content: getErrorMessage(error, "예약에 실패했습니다.") });
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
    onError: (error) => {
      showDialog({ type: "alert", content: getErrorMessage(error, "예약 변경에 실패했습니다.") });
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
