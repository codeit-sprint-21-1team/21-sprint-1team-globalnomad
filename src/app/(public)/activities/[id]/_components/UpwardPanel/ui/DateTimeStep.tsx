"use client";

import type { AvailableTime } from "@/types/activities";
import type { SelectedSlot } from "../../ReservationCalendar/lib/useReservation";
import { DatePickerSection } from "../../ReservationCalendar/ui/DatePickerSection";
import { TimeSlotSection } from "../../ReservationCalendar/ui/TimeSlotSection";

interface DateTimeStepProps {
  scheduleMap: Record<string, unknown[]>;
  selectedDate: Date | undefined;
  toDateStr: (d: Date) => string;
  onDayClick: (day: Date) => void;
  timeSlots: AvailableTime[];
  selectedSlot: SelectedSlot | null;
  onSelectSlot: (slot: SelectedSlot) => void;
}

export function DateTimeStep({
  scheduleMap,
  selectedDate,
  toDateStr,
  onDayClick,
  timeSlots,
  selectedSlot,
  onSelectSlot,
}: DateTimeStepProps) {
  return (
    <>
      <p className="text-base font-bold text-gray-950 mb-1">날짜</p>
      <div className="w-full flex flex-col md:flex-row gap-5 ">
        <div className="[flex:2]">
          <DatePickerSection
            scheduleMap={scheduleMap}
            selectedDate={selectedDate}
            toDateStr={toDateStr}
            onDayClick={onDayClick}
          />
        </div>
        <div className="[flex:3]">
          <TimeSlotSection
            selectedDate={selectedDate}
            timeSlots={timeSlots}
            selectedSlot={selectedSlot}
            onSelectSlot={onSelectSlot}
          />
        </div>
      </div>
    </>
  );
}
