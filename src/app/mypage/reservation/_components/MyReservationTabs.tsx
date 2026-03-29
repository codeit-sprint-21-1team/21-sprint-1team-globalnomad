"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FilterButton } from "@/components/ui/Buttons/FilterButton";
import { cn } from "@/commons/utils/cn";
import { useEffect, useRef, useTransition } from "react";

export function MyReservationTabs({
  items,
}: {
  items: readonly { action: string; label: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("status") || "all";
  const [isPending, startTransition] = useTransition();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleTabClick = (action: string) => {
    startTransition(() => {
      router.push(`?status=${action}`, { scroll: false });
    });
  };

  useEffect(() => {
    const targetTab = tabRefs.current[activeTab];
    const container = targetTab?.parentElement;

    if (targetTab && container) {
      const containerWidth = container.offsetWidth;
      const tabOffsetLeft = targetTab.offsetLeft;
      const tabWidth = targetTab.offsetWidth;

      container.scrollTo({
        left: tabOffsetLeft - containerWidth / 2 + tabWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  return (
    <div
      className={cn(
        "flex gap-[8px] mt-[14px]",
        "overflow-x-auto whitespace-nowrap flex-nowrap",
        "no-scrollbar pb-1",
        "-mx-[20px] px-[20px]",
        isPending && "opacity-90",
      )}
    >
      {items.map((item) => (
        <FilterButton
          key={item.action}
          ref={(el) => {
            tabRefs.current[item.action] = el;
          }}
          active={activeTab === item.action}
          disabled={isPending}
          onClick={() => handleTabClick(item.action)}
          className="w-[90px] h-[39px] shrink-0"
        >
          {item.label}
        </FilterButton>
      ))}
    </div>
  );
}
