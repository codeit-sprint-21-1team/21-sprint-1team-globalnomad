"use client";

import { ChevronLeft } from "lucide-react";
import { HeadcountSection } from "../../ReservationCalendar/ui/HeadcountSection";

interface HeadcountStepProps {
  headcount: number;
  onDecrement: () => void;
  onIncrement: () => void;
  onBack: () => void;
  isNotBack?: boolean;
}

export function HeadcountStep({
  headcount,
  onDecrement,
  onIncrement,
  onBack,
  isNotBack = false,
}: HeadcountStepProps) {
  return (
    <>
      {!isNotBack && (
        <button
          className="flex items-center gap-1 text-base font-bold text-gray-950 mb-4"
          onClick={onBack}
        >
          <ChevronLeft size={20} />
          인원
        </button>
      )}

      <p className="text-sm text-gray-500 mb-4">예약할 인원을 선택해주세요.</p>
      <div className="flex justify-between items-center">
        <p className="text-base font-bold text-gray-950">참여 인원 수</p>
        <HeadcountSection
          headcount={headcount}
          onDecrement={onDecrement}
          onIncrement={onIncrement}
        />
      </div>
    </>
  );
}
