"use client";

import { Button } from "@/components/ui/Buttons/Button";
import { useReservation } from "./lib/useReservation";
import { useRequireAuth } from "@/commons/hooks/useRequireAuth";
import { DatePickerSection } from "./ui/DatePickerSection";
import { TimeSlotSection } from "./ui/TimeSlotSection";
import { HeadcountSection } from "./ui/HeadcountSection";

interface ReservationCalendarProps {
  activityId: number;
  price: number;
}

export function ReservationCalendar({
  activityId,
  price,
}: ReservationCalendarProps) {
  const {
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
    handleReservation,
    isPending,
  } = useReservation(activityId, price);

  const requireAuth = useRequireAuth();

  return (
    <div className="bg-white border border-gray-200 rounded-xl w-full overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
      {/* 가격 헤더 */}
      <div className="px-8 pt-6">
        <span className="text-xl font-bold text-gray-950">
          ₩{price.toLocaleString()}
        </span>
        <span className="text-sm text-gray-500"> / 인</span>
      </div>

      <div className="px-8 py-4 flex flex-col gap-0">
        <div className="mb-8">
          <p className="text-base font-bold text-gray-950">날짜</p>
          <DatePickerSection
            scheduleMap={scheduleMap}
            selectedDate={selectedDate}
            toDateStr={toDateStr}
            onDayClick={handleDayClick}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
          />
        </div>

        <div className="flex justify-between items-center mb-5">
          <p className=" text-md font-bold text-gray-950 ">참여 인원 수</p>
          <HeadcountSection
            headcount={headcount}
            onDecrement={() => setHeadcount((n) => Math.max(1, n - 1))}
            onIncrement={() => setHeadcount((n) => n + 1)}
          />
        </div>

        <TimeSlotSection
          selectedDate={selectedDate}
          timeSlots={timeSlots}
          selectedSlot={selectedSlot}
          onSelectSlot={setSelectedSlot}
        />
      </div>

      <div className="border-t border-gray-300 mx-8 pb-6 pt-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-gray-950">총 합계</span>
          <span className="text-lg font-bold text-gray-950">
            ₩{totalPrice.toLocaleString()}
          </span>
        </div>
        <Button
          size="md"
          disabled={!selectedSlot || isPending}
          onClick={() => requireAuth(handleReservation)}
        >
          {isPending ? "예약 중..." : "예약하기"}
        </Button>
      </div>
    </div>
  );
}
