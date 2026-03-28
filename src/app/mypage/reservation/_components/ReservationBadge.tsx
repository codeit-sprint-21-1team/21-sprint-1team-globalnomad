import {
  RESERVATION_CONFIG,
  ReservationStatus,
} from "@/commons/consts/reservations";
import { cn } from "@/commons/utils/cn";

export function ReservationBadge({
  status,
}: {
  status: Exclude<ReservationStatus, "all">;
}) {
  const item = RESERVATION_CONFIG[status];

  if (!item) return null;

  return (
    <span
      className={cn(
        "w-fit h-[24px] text-[10px] font-bold leading-none tracking-[-2.5%] text-[#2BA90D] bg-[#E9FBE4] px-[10px] py-[5px] rounded-[24px] flex items-center justify-center",
        item.style,
      )}
    >
      {item.label}
    </span>
  );
}
