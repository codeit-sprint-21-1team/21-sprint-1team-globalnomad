import { cn } from "@/commons/utils/cn";

const BADGE_STYLES = {
  completed: { label: "완료", bg: "bg-[#CBC9CF]" },
  pending: { label: "예약", bg: "bg-[#0B3D91]" },
  confirmed: { label: "승인", bg: "bg-[#FF7C1E]" },
} as const;

type BadgeVariant = keyof typeof BADGE_STYLES;

interface ReservationBadgeProps {
  variant: BadgeVariant;
  count: number;
}

export function ReservationBadge({ variant, count }: ReservationBadgeProps) {
  if (count === 0) return null;

  const { label, bg } = BADGE_STYLES[variant];

  return (
    <span
      className={cn(
        "rounded-full text-white text-[10px] px-1.5 py-0.5 text-center leading-none truncate",
        bg,
      )}
    >
      {label} {count}
    </span>
  );
}
