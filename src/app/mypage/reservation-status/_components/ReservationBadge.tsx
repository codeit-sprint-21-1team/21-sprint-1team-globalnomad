import { cn } from "@/commons/utils/cn";

const BADGE_STYLES = {
  completed: { label: "완료", bg: "bg-[#EDEEF2]", text: "text-[#84858C]" },
  pending: { label: "예약", bg: "bg-[#E5F3FF]", text: "text-[#3D9EF2]" },
  confirmed: { label: "승인", bg: "bg-[#FF8DD]", text: "text-[#FFB501]" },
} as const;

type BadgeVariant = keyof typeof BADGE_STYLES;

interface ReservationBadgeProps {
  variant: BadgeVariant;
  count: number;
}

export function ReservationBadge({ variant, count }: ReservationBadgeProps) {
  if (count === 0) return null;

  const { label, bg, text } = BADGE_STYLES[variant];

  return (
    <span
      className={cn(
        "rounded-[3px] text-black text-[11px] md:text-[12px] px-1.5 py-0.5 text-center leading-none truncate",
        bg,
        text,
      )}
    >
      {label} {count}
    </span>
  );
}
