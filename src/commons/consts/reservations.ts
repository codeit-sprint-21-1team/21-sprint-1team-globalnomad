export const RESERVATION_CONFIG = {
  all: { action: "all", label: "전체", style: "" },
  pending: {
    action: "pending",
    label: "예약 신청",
    style: "bg-[#E9FBE4] text-[#2BA90D]",
  },
  canceled: {
    action: "canceled",
    label: "예약 취소",
    style: "bg-[#E0E0E5] text-[#707177]",
  },
  confirmed: {
    action: "confirmed",
    label: "예약 승인",
    style: "bg-[#DDF9F9] text-[#1790A0]",
  },
  declined: {
    action: "declined",
    label: "예약 거절",
    style: "bg-[#FCECEA] text-[#F96767]",
  },
  completed: {
    action: "completed",
    label: "체험 완료",
    style: "bg-[#DAF0FF] text-[#0D6CD1]",
  },
} as const;

export const TAB_ITEMS = [
  RESERVATION_CONFIG.all,
  RESERVATION_CONFIG.pending,
  RESERVATION_CONFIG.canceled,
  RESERVATION_CONFIG.confirmed,
  RESERVATION_CONFIG.declined,
  RESERVATION_CONFIG.completed,
] as const;

export type ReservationStatus = keyof typeof RESERVATION_CONFIG;
