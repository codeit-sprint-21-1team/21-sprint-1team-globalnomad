"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select/Select";
import { updateQueryString } from "../_utils/query";

const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "most_reviewed", label: "리뷰 많은 순" },
  { value: "price_asc", label: "가격 낮은 순" },
  { value: "price_desc", label: "가격 높은 순" },
];

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "latest";

  const handleSortChange = (value: string) => {
    const queryString = updateQueryString(searchParams, {
      sort: value,
      page: 1,
    });
    router.push(`/activities?${queryString}`, { scroll: true });
  };

  return (
    <div className="w-[127px]">
      <Select value={currentSort} onValueChange={handleSortChange}>
        <SelectTrigger className="h-[53px] rounded-lg border-gray-200 bg-white px-4 text-sm font-medium text-gray-800 outline-none hover:bg-gray-50 focus:ring-0">
          <SelectValue placeholder="정렬" />
        </SelectTrigger>
        <SelectContent
          align="end"
          className="z-50 min-w-[127px] rounded-lg border border-gray-200 bg-white p-0 shadow-md"
        >
          {SORT_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="cursor-pointer px-4 py-3 rounded-lg justify-center text-sm font-medium text-gray-800 outline-none hover:bg-gray-50 focus:bg-[#E5F3FF]"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
