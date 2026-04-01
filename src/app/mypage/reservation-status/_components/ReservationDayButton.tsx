"use client";

import * as React from "react";
import type { DayButtonProps } from "react-day-picker";
import { cn } from "@/commons/utils/cn";
import type { ReservationCounts } from "@/types/myActivities.type";
import { ReservationBadge } from "./ReservationBadge";

interface ReservationDayButtonProps extends DayButtonProps {
  reservationMap: Record<string, ReservationCounts>;
}

function toDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function ReservationDayButton({
  day,
  modifiers,
  reservationMap,
  ...props
}: ReservationDayButtonProps) {
  const info = reservationMap[toDateStr(day.date)];

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      {...props}
      className={cn(
        "relative flex flex-col items-center w-full h-full min-h-[60px] px-1 pt-1 pb-2 text-sm font-medium",
        "hover:bg-sky-50 hover:text-[#3D9EF2] rounded-xl",
        modifiers.outside && "text-muted-foreground opacity-50",
        modifiers.today && "text-black font-bold",
      )}
    >
      {info && (
        <span className="absolute top-1 right-[25%] xl:right-[38%] size-[6px] rounded-full bg-red-500" />
      )}
      <span className="mb-1">{day.date.getDate()}</span>
      {info && (
        <div className="flex flex-col gap-0.5 w-full">
          <ReservationBadge variant="completed" count={info.completed} />
          <ReservationBadge variant="pending" count={info.pending} />
          <ReservationBadge variant="confirmed" count={info.confirmed} />
        </div>
      )}
    </button>
  );
}
