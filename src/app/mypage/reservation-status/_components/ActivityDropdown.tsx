"use client";

import { useEffect, useMemo, useState } from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChevronDownIcon } from "lucide-react";
import { getActivityList } from "@/apis/myActivities.api";
import { cn } from "@/commons/utils/cn";
import useInfiniteScroll from "@/commons/hooks/useInfiniteScroll";
import { Activity } from "@/types/myActivities.type";
import ActivityDropdownMenu from "./ActivityDropdownMenu";

interface ActivityDropdownProps {
  selectedActivity: Activity | null;
  onSelect: (activity: Activity) => void;
}

const PLACEHOLDER = "Select an activity";
const SEARCH_VISIBLE_THRESHOLD = 10;

export default function ActivityDropdown({
  selectedActivity,
  onSelect,
}: ActivityDropdownProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(
    null,
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["myActivities"],
      queryFn: ({ pageParam }) => getActivityList({ cursorId: pageParam }),
      initialPageParam: null as number | null,
      getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
      staleTime: 60 * 1000,
    });
  const isSearching = searchValue.trim().length > 0;

  const sentinelRef = useInfiniteScroll({
    onIntersect: fetchNextPage,
    enabled: (hasNextPage ?? false) && !isSearching,
    loading: isFetchingNextPage,
    root: scrollContainer,
  });

  const allActivities = useMemo(
    () => data?.pages.flatMap((page) => page.activities) ?? [],
    [data],
  );
  const totalActivityCount = data?.pages[0]?.totalCount ?? allActivities.length;
  const shouldShowSearch = totalActivityCount >= SEARCH_VISIBLE_THRESHOLD;
  const hasAnyActivity = allActivities.length > 0;
  const showFetchMoreIndicator = isFetchingNextPage && !isSearching;
  const showInfiniteSentinel = !isSearching && !!hasNextPage;
  const filteredActivities = useMemo(() => {
    const normalizedQuery = searchValue.trim().toLowerCase();

    if (!shouldShowSearch || !normalizedQuery) {
      return allActivities;
    }

    return allActivities.filter((activity) =>
      activity.title.toLowerCase().includes(normalizedQuery),
    );
  }, [allActivities, searchValue, shouldShowSearch]);

  useEffect(() => {
    const first = data?.pages[0]?.activities[0];
    if (!selectedActivity && first) {
      onSelect(first);
    }
  }, [data, selectedActivity, onSelect]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    setSearchValue("");
  };

  const handleValueChange = (activity: Activity | null) => {
    if (!activity) {
      return;
    }

    onSelect(activity);
    setSearchValue("");
    setOpen(false);
  };

  return (
    <ComboboxPrimitive.Root<Activity>
      items={filteredActivities}
      value={selectedActivity}
      open={open}
      inputValue={searchValue}
      itemToStringLabel={(activity) => activity.title}
      isItemEqualToValue={(item, value) => item.id === value.id}
      onOpenChange={handleOpenChange}
      onInputValueChange={setSearchValue}
      onValueChange={handleValueChange}
    >
      <ComboboxPrimitive.Trigger
        className={cn(
          "flex w-full items-center justify-between rounded-2xl border bg-white px-[16px] py-[14px] text-[16px] font-medium tracking-[-2.5%] outline-none transition-colors",
          open ? "border-[#1F1F22]" : "border-gray-300",
        )}
        aria-label="Select activity"
      >
        <span
          className={selectedActivity ? "text-[#1F1F22]" : "text-[#A4A1AA]"}
        >
          {selectedActivity?.title ?? PLACEHOLDER}
        </span>
        <ChevronDownIcon
          className={cn(
            "size-5 shrink-0 text-[#1F1F22] transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </ComboboxPrimitive.Trigger>

      <ComboboxPrimitive.Portal>
        <ComboboxPrimitive.Positioner
          side="bottom"
          sideOffset={6}
          align="start"
          className="z-50"
        >
          <ActivityDropdownMenu
            items={filteredActivities}
            hasAnyActivity={hasAnyActivity}
            isLoading={isLoading}
            searchValue={searchValue}
            showFetchMoreIndicator={showFetchMoreIndicator}
            showInfiniteSentinel={showInfiniteSentinel}
            sentinelRef={sentinelRef}
            onScrollContainerChange={setScrollContainer}
            onSearchValueChange={setSearchValue}
            shouldShowSearch={shouldShowSearch}
          />
        </ComboboxPrimitive.Positioner>
      </ComboboxPrimitive.Portal>
    </ComboboxPrimitive.Root>
  );
}
