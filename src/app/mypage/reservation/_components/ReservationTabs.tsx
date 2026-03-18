"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FilterButton } from "@/components/ui/Buttons/FilterButton";
import { cn } from "@/commons/utils/cn";

export function ReservationTabs({
  items,
}: {
  items: { action: string; label: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("status") || "pending";

  const handleTabClick = (action: string) => {
    router.push(`?status=${action}`, { scroll: false });
  };

  return (
    <div
      className={cn(
        "flex gap-[8px] mt-[14px]",
        "overflow-x-auto whitespace-nowrap flex-nowrap",
        "no-scrollbar",
        "pb-1",
      )}
    >
      {items.map((item) => (
        <FilterButton
          key={item.action}
          active={activeTab === item.action}
          onClick={() => handleTabClick(item.action)}
          className="w-[90px] h-[39px] shrink-0"
        >
          {item.label}
        </FilterButton>
      ))}
    </div>
  );
}
