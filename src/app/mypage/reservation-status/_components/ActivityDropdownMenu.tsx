"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { CheckIcon, SearchIcon } from "lucide-react";
import type { RefObject } from "react";
import type { Activity } from "@/types/myActivities.type";

interface ActivityDropdownMenuProps {
  items: Activity[];
  hasAnyActivity: boolean;
  isLoading: boolean;
  searchValue: string;
  showFetchMoreIndicator: boolean;
  showInfiniteSentinel: boolean;
  sentinelRef: RefObject<HTMLDivElement | null>;
  onScrollContainerChange: (node: HTMLDivElement | null) => void;
  onSearchValueChange: (value: string) => void;
  shouldShowSearch: boolean;
}

const SEARCH_PLACEHOLDER = "Search activities";
const LOADING_TEXT = "Loading activities...";
const EMPTY_TEXT = "No activities found.";
const NO_SEARCH_RESULT_TEXT = "No matching activities.";

export default function ActivityDropdownMenu({
  items,
  hasAnyActivity,
  isLoading,
  searchValue,
  showFetchMoreIndicator,
  showInfiniteSentinel,
  sentinelRef,
  onScrollContainerChange,
  onSearchValueChange,
  shouldShowSearch,
}: ActivityDropdownMenuProps) {
  return (
    <ComboboxPrimitive.Popup className="group/combobox-popup w-(--anchor-width) overflow-hidden rounded-lg border border-gray-200 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
      {shouldShowSearch && (
        <div className="border-b border-gray-100 p-2">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
            <SearchIcon className="size-4 shrink-0 text-[#A4A1AA]" />
            <input
              value={searchValue}
              onChange={(e) => onSearchValueChange(e.target.value)}
              placeholder={SEARCH_PLACEHOLDER}
              className="w-full border-0 bg-transparent p-0 text-[14px] font-medium tracking-[-2.5%] text-[#1F1F22] outline-none placeholder:text-[#A4A1AA]"
              autoFocus
            />
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="py-4 text-center text-sm text-[#A4A1AA]">
          {LOADING_TEXT}
        </div>
      ) : (
        <ComboboxPrimitive.List
          ref={onScrollContainerChange}
          className="max-h-[300px] overflow-y-auto p-2"
        >
          {items.map((activity) => (
            <ComboboxPrimitive.Item
              key={activity.id}
              value={activity}
              className="relative flex cursor-pointer items-center gap-1.5 rounded-md py-2 pr-8 pl-1.5 text-[16px] font-medium tracking-[-2.5%] text-[#1F1F22] outline-none select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[selected]:text-[#3D9EF2]"
            >
              {activity.title}
              <ComboboxPrimitive.ItemIndicator>
                <span className="absolute right-2 flex items-center justify-center">
                  <CheckIcon className="size-4" />
                </span>
              </ComboboxPrimitive.ItemIndicator>
            </ComboboxPrimitive.Item>
          ))}

          <ComboboxPrimitive.Empty className="hidden py-4 text-center text-sm text-[#A4A1AA] group-data-empty/combobox-popup:block">
            {hasAnyActivity ? NO_SEARCH_RESULT_TEXT : EMPTY_TEXT}
          </ComboboxPrimitive.Empty>

          {showFetchMoreIndicator && (
            <div className="py-2 text-center text-sm text-[#A4A1AA]">
              {LOADING_TEXT}
            </div>
          )}

          {showInfiniteSentinel && (
            <div ref={sentinelRef} className="h-px" aria-hidden="true" />
          )}
        </ComboboxPrimitive.List>
      )}
    </ComboboxPrimitive.Popup>
  );
}
