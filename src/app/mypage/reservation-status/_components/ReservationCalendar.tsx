"use client";

import { DayPicker, type DayButtonProps } from "react-day-picker";
import { ko } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReservationDayButton } from "./ReservationDayButton";
import ReservationDetailDrawer from "./ReservationDetailDrawer";
import { useReservationCalendarState } from "../_libs/useReservationCalendarState";

interface ReservationCalendarProps {
  activityId: number | undefined;
}

export default function ReservationCalendar({
  activityId,
}: ReservationCalendarProps) {
  const {
    currentMonth,
    reservationMap,
    reservations,
    schedules,
    selectedDate,
    selectedScheduleId,
    selectedStatus,
    statusLabels,
    isMutating,
    onDateSelect,
    onMonthChange,
    onReservationAction,
    onScheduleSelect,
    onStatusSelect,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useReservationCalendarState(activityId);

  const DayButton = (props: DayButtonProps) => (
    <ReservationDayButton {...props} reservationMap={reservationMap} />
  );

  return (
    <div className="mt-[16px] w-full md:rounded-3xl md:p-4 md:shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
      <DayPicker
        mode="single"
        month={currentMonth}
        onMonthChange={onMonthChange}
        onSelect={onDateSelect}
        showOutsideDays
        locale={ko}
        formatters={{
          formatCaption: (date) =>
            `${date.getFullYear()}년 ${date.getMonth() + 1}월`,
          formatWeekdayName: (day) =>
            ["S", "M", "T", "W", "T", "F", "S"][day.getDay()],
        }}
        classNames={{
          months: "relative flex w-full flex-col",
          month: "flex w-full flex-col gap-4",
          month_caption: "flex h-8 items-center justify-center",
          caption_label: "text-md font-semibold",
          nav: "absolute inset-x-0 top-0 flex h-8 items-center justify-center",
          button_previous: "rounded pr-15 text-gray-700 hover:text-[#3D9EF2]",
          button_next: "rounded pl-15 text-gray-700 hover:text-[#3D9EF2]",
          weekdays: "flex w-full border-b border-gray-300 pb-3",
          weekday:
            "flex-1 select-none text-center text-[0.8rem] text-muted-foreground",
          weeks: "w-full",
          week: "mt-2 flex w-full",
          day: "aspect-auto h-[90px] flex-1 md:h-[110px]",
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

      <ReservationDetailDrawer
        selectedDate={selectedDate}
        onClose={() => onDateSelect(undefined)}
        isMutating={isMutating}
        reservations={reservations}
        schedules={schedules}
        selectedScheduleId={selectedScheduleId}
        selectedStatus={selectedStatus}
        statusLabels={statusLabels}
        onScheduleSelect={onScheduleSelect}
        onStatusSelect={onStatusSelect}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        onReservationAction={onReservationAction}
      />
    </div>
  );
}
