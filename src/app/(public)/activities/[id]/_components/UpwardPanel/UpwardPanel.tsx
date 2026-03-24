"use client";

import { useRef, useState } from "react";
import { format } from "date-fns";
import { cn } from "@/commons/utils/cn";
import type { AvailableSchedule } from "@/types/activities";
import { useReservation } from "../ReservationCalendar/lib/useReservation";
import { DateTimeStep } from "./ui/DateTimeStep";
import { HeadcountStep } from "./ui/HeadcountStep";
import { SelectionInfo } from "./ui/SelectionInfo";
import { PanelButton } from "./ui/PanelButton";

const CLOSE_THRESHOLD = 80;

interface UpwardPanelProps {
  price: number;
  availableSchedules: AvailableSchedule[];
}

export function UpwardPanel({ price, availableSchedules }: UpwardPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef(0);

  const {
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
  } = useReservation(availableSchedules, price);

  const handlePointerDown = (e: React.PointerEvent) => {
    startYRef.current = e.clientY;
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setDragY(Math.max(0, e.clientY - startYRef.current));
  };

  const handlePointerUp = () => {
    if (dragY > CLOSE_THRESHOLD) setIsOpen(false);
    setDragY(0);
    setIsDragging(false);
  };

  const openSheet = () => {
    setStep(1);
    setDragY(0);
    setIsOpen(true);
  };

  const closeSheet = () => setIsOpen(false);

  const selectionLabel =
    selectedSlot && selectedDate
      ? `${format(selectedDate, "yy/MM/dd")} ${selectedSlot.startTime}~${selectedSlot.endTime}`
      : null;

  const priceLabel = price === 0 ? "FREE" : `₩${price.toLocaleString()}`;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-90 xl:hidden touch-pan-y"
          onClick={closeSheet}
        />
      )}

      {/* 바텀시트 */}
      <div
        className="fixed bottom-[84px] left-0 right-0 z-100 xl:hidden bg-white rounded-t-3xl flex flex-col overflow-hidden"
        style={{
          transform: isOpen ? `translateY(${dragY}px)` : "translateY(100%)",
          transition: isDragging
            ? "none"
            : "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* 드래그 핸들 */}
        <div
          className={cn(
            "flex justify-center py-3 flex-shrink-0 touch-none",
            isDragging ? "cursor-grabbing" : "cursor-grab",
          )}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/*컨텐츠 */}
        <div className="flex-1 overflow-y-auto px-4 no-scrollbar pb-4">
          {step === 1 && (
            <DateTimeStep
              scheduleMap={scheduleMap}
              selectedDate={selectedDate}
              toDateStr={toDateStr}
              onDayClick={handleDayClick}
              timeSlots={timeSlots}
              selectedSlot={selectedSlot}
              onSelectSlot={setSelectedSlot}
            />
          )}
          {step === 2 && (
            <HeadcountStep
              headcount={headcount}
              onDecrement={() => setHeadcount((n) => Math.max(1, n - 1))}
              onIncrement={() => setHeadcount((n) => n + 1)}
              onBack={() => setStep(1)}
            />
          )}
        </div>
      </div>

      {/* 바텀바 */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-100 xl:hidden bg-white px-4 pt-2.5 pb-4 flex flex-col gap-2.5",
          !isOpen &&
            "border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-300 overflow-hidden",
            isOpen
              ? "opacity-0 pointer-events-none max-h-2"
              : "opacity-100 max-h-20",
          )}
        >
          {!isOpen && selectedSlot ? (
            <>
              <span className="text-base font-bold text-gray-950">
                {headcount}명 · ₩{totalPrice.toLocaleString()}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-500 font-medium">
                  {selectionLabel}
                </span>
                <button
                  onClick={reset}
                  className="text-sm text-gray-500 underline"
                >
                  초기화
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="text-lg font-bold text-gray-950">
                {priceLabel}
                <span className="text-sm font-normal text-gray-600"> /1명</span>
              </span>
              <SelectionInfo
                selectionLabel={selectionLabel}
                onOpen={openSheet}
              />
            </>
          )}
        </div>

        {!isOpen && (
          <PanelButton disabled={!selectedSlot}>예약하기</PanelButton>
        )}

        {isOpen && step === 1 && (
          <PanelButton disabled={!selectedSlot} onClick={() => setStep(2)}>
            확인
          </PanelButton>
        )}

        {isOpen && step === 2 && (
          <PanelButton onClick={closeSheet}>확인</PanelButton>
        )}
      </div>
    </>
  );
}
