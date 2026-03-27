"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChevronDownIcon } from "lucide-react";
import { getActivityList } from "@/apis/myActivities.api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown/DropdownMenu";
import useInfiniteScroll from "@/commons/hooks/useInfiniteScroll";
import { Activity } from "@/types/myActivities.type";

interface ActivityDropdownProps {
  selectedActivity: Activity | null;
  onSelect: (activity: Activity) => void;
}

const PLACEHOLDER = "체험을 선택하세요";

export default function ActivityDropdown({
  selectedActivity,
  onSelect,
}: ActivityDropdownProps) {
  const [open, setOpen] = useState(false);
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["myActivities"],
      queryFn: ({ pageParam }) => getActivityList({ cursorId: pageParam }),
      initialPageParam: null as number | null,
      getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
      staleTime: 60 * 1000,
    });

  const sentinelRef = useInfiniteScroll({
    onIntersect: fetchNextPage,
    enabled: hasNextPage ?? false,
    loading: isFetchingNextPage,
    root: scrollContainer,
  });

  const allActivities = data?.pages.flatMap((page) => page.activities) ?? [];

  const handleValueChange = (val: string) => {
    const activity = allActivities.find((a) => a.id === Number(val));
    if (activity) {
      onSelect(activity);
      setOpen(false);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="flex w-full items-center justify-between rounded-[4px] border border-[#CBC9CF] bg-white px-[16px] py-[14px] text-[16px] font-medium outline-none data-[state=open]:border-[#1F1F22]"
          aria-label="체험 선택"
        >
          <span
            className={selectedActivity ? "text-[#1F1F22]" : "text-[#A4A1AA]"}
          >
            {selectedActivity?.title ?? PLACEHOLDER}
          </span>
          <ChevronDownIcon
            className="size-5 shrink-0 text-[#1F1F22] transition-transform duration-200 data-[state=open]:rotate-180"
            data-state={open ? "open" : "closed"}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-0">
        <div ref={setScrollContainer} className="max-h-[300px] overflow-y-auto">
          {isLoading && (
            <div className="py-4 text-center text-sm text-[#A4A1AA]">
              불러오는 중...
            </div>
          )}

          {!isLoading && allActivities.length === 0 && (
            <div className="py-4 text-center text-sm text-[#A4A1AA]">
              등록된 체험이 없습니다.
            </div>
          )}

          <DropdownMenuRadioGroup
            value={selectedActivity ? String(selectedActivity.id) : ""}
            onValueChange={handleValueChange}
          >
            {allActivities.map((activity) => (
              <DropdownMenuRadioItem
                key={activity.id}
                value={String(activity.id)}
              >
                {activity.title}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>

          {isFetchingNextPage && (
            <div className="py-2 text-center text-sm text-[#A4A1AA]">
              불러오는 중...
            </div>
          )}

          <div ref={sentinelRef} className="h-1" />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
