"use client";

import { cn } from "@/commons/utils/cn";
import type {
  ReservationStatusFilter,
  ReservedScheduleItem,
} from "@/types/myActivities.type";

interface ReservationSchedulePanelProps {
  selectedDate: string | null;
  schedules: ReservedScheduleItem[];
  selectedScheduleId: number | null;
  selectedStatus: ReservationStatusFilter | null;
  onScheduleSelect: (scheduleId: number) => void;
  onStatusSelect: (status: ReservationStatusFilter) => void;
}

const STATUS_LABELS: Record<ReservationStatusFilter, string> = {
  pending: "신청",
  confirmed: "승인",
  declined: "거절",
};

export default function ReservationSchedulePanel({
  selectedDate,
  schedules,
  selectedScheduleId,
  selectedStatus,
  onScheduleSelect,
  onStatusSelect,
}: ReservationSchedulePanelProps) {
  if (!selectedDate) {
    return null;
  }

  const selectedSchedule =
    schedules.find((schedule) => schedule.scheduleId === selectedScheduleId) ??
    null;

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
      <div className="text-sm font-semibold text-[#1F1F22]">
        {selectedDate} 스케줄
      </div>

      {schedules.length === 0 ? (
        <p className="mt-3 text-sm text-[#84858C]">
          선택한 날짜에 조회 가능한 예약 스케줄이 없어요.
        </p>
      ) : (
        <>
          <ul className="mt-3 space-y-3">
            {schedules.map((schedule) => {
              const isSelected = schedule.scheduleId === selectedScheduleId;

              return (
                <li key={schedule.scheduleId}>
                  <button
                    type="button"
                    onClick={() => onScheduleSelect(schedule.scheduleId)}
                    className={cn(
                      "w-full rounded-xl border px-4 py-3 text-left transition-colors",
                      isSelected
                        ? "border-[#3D9EF2] bg-[#F4FAFF]"
                        : "border-gray-100 bg-[#FAFAFA]",
                    )}
                  >
                    <div className="text-sm font-medium text-[#1F1F22]">
                      {schedule.startTime} - {schedule.endTime}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            {(
              [
                "pending",
                "confirmed",
                "declined",
              ] as ReservationStatusFilter[]
            ).map((status) => {
              const isSelected = selectedStatus === status;
              const count = selectedSchedule?.count[status] ?? 0;

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => onStatusSelect(status)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
                    isSelected &&
                      status === "pending" &&
                      "border-[#D7E9F9] bg-[#E5F3FF] text-[#3D9EF2]",
                    isSelected &&
                      status === "confirmed" &&
                      "border-[#FFE8A3] bg-[#FFF7DB] text-[#D39A00]",
                    isSelected &&
                      status === "declined" &&
                      "border-[#F3D2D2] bg-[#FFF1F1] text-[#D14B4B]",
                    !isSelected && "border-gray-200 bg-white text-[#84858C]",
                  )}
                >
                  {STATUS_LABELS[status]} {count}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
