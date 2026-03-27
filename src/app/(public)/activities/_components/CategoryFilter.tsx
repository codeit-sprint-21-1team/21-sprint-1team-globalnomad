"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Buttons/Button";
import { cn } from "@/commons/utils/cn";
import { CATEGORY_OPTIONS } from "@/commons/consts/activities";
import { useDraggable } from "@/commons/hooks/useDraggable";
import { updateQueryString } from "../_utils/query";

const CATEGORIES = [
  { value: null, label: "전체" },
  ...CATEGORY_OPTIONS.map((opt) => ({ value: opt.label, label: opt.label })),
];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const { scrollRef, isDragging, didMove, ...dragEvents } = useDraggable();

  const handleCategoryChange = (value: string | null) => {
    const queryString = updateQueryString(searchParams, {
      category: value,
      page: 1,
    });
    router.push(`/activities?${queryString}`, { scroll: true });
  };

  return (
    <div
      ref={scrollRef}
      {...dragEvents}
      className={cn(
        "no-scrollbar flex w-full items-center gap-2 overflow-x-auto pb-2 sm:gap-4 sm:pb-0",
        isDragging && didMove
          ? "cursor-grabbing select-none"
          : "cursor-pointer",
      )}
    >
      {CATEGORIES.map((cat) => {
        const isActive =
          (cat.value === null && !currentCategory) ||
          currentCategory === cat.value;

        return (
          <Button
            key={cat.value ?? "all"}
            variant={isActive ? "default" : "secondary"}
            size="sm"
            onClick={() => !didMove && handleCategoryChange(cat.value)}
            className={cn(
              "w-auto min-w-fit px-4 font-medium transition-all sm:px-6",
              isActive
                ? "bg-[#3D9EF2] text-white hover:bg-[#2b8cdb]"
                : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50",
            )}
          >
            {cat.label}
          </Button>
        );
      })}
    </div>
  );
}
