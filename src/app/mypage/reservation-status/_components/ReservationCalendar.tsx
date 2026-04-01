"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { DayPicker, type DayButtonProps } from "react-day-picker";
import { ko } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getReservationDashboard } from "@/apis/myActivities.api";
import type { ReservationCounts } from "@/types/myActivities.type";
import { ReservationDayButton } from "./ReservationDayButton";

interface ReservationCalendarProps {
  activityId: number | undefined;
}

export default function ReservationCalendar({
  activityId,
}: ReservationCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  const year = currentMonth.getFullYear().toString();
  const month = (currentMonth.getMonth() + 1).toString().padStart(2, "0");

  const { data: dashboardData = [] } = useQuery({
    queryKey: ["reservationDashboard", activityId, year, month],
    queryFn: () =>
      getReservationDashboard({ activityId: activityId!, year, month }),
    enabled: !!activityId,
    staleTime: 60 * 1000,
  });

  const reservationMap = useMemo<Record<string, ReservationCounts>>(
    () =>
      Object.fromEntries(
        dashboardData.map((item) => [item.date, item.reservations]),
      ),
    [dashboardData],
  );

  const DayButton = (props: DayButtonProps) => (
    <ReservationDayButton {...props} reservationMap={reservationMap} />
  );

  return (
    <div className="mt-[16px] md:rounded-3xl md:p-4 w-full md:shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
      <DayPicker
        mode="single"
        month={currentMonth}
        onMonthChange={setCurrentMonth}
        onSelect={(date) => alert(date?.toLocaleDateString("ko-KR"))}
        showOutsideDays
        locale={ko}
        formatters={{
          formatCaption: (date) =>
            `${date.getFullYear()}년 ${date.getMonth() + 1}월`,
          formatWeekdayName: (day) =>
            ["S", "M", "T", "W", "T", "F", "S"][day.getDay()],
        }}
        classNames={{
          months: "relative flex flex-col w-full",
          month: "flex w-full flex-col gap-4",
          month_caption: "flex items-center justify-center h-8",
          caption_label: "font-semibold text-md",
          nav: "absolute inset-x-0 top-0 h-8 flex items-center justify-center",
          button_previous: "pr-15 rounded hover:bg-gray-100 text-gray-700",
          button_next: "pl-15 rounded hover:bg-gray-100 text-gray-700",
          weekdays: "flex w-full border-b border-gray-300 pb-3",
          weekday:
            "flex-1 text-center text-[0.8rem] text-muted-foreground select-none ",
          weeks: "w-full",
          week: "flex w-full mt-2",
          day: "aspect-auto h-[90px] md:h-[110px] flex-1",
        }}
        components={{
          Chevron: ({ orientation }) =>
            orientation === "left" ? (
              <ChevronLeft className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            ),
          DayButton,
        }}
      />
    </div>
  );
}
