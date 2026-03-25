"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Buttons/Button";

import { updateQueryString } from "../_utils/query";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryString = updateQueryString(searchParams, {
      keyword: keyword || null,
      page: 1,
    });
    router.push(`/activities?${queryString}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative flex w-full items-center">
        <Search
          className="absolute left-4 z-10 h-5 w-5 text-gray-950 md:left-6 md:h-6 md:w-6"
          strokeWidth={2.5}
        />

        <Input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="내가 원하는 체험은?"
          className="w-full pl-12 pr-32 md:pl-16 md:pr-36"
        />

        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center">
          <Button
            type="submit"
            size="sm"
            className="w-24 shrink-0 font-bold md:w-28"
          >
            검색하기
          </Button>
        </div>
      </div>
    </form>
  );
}
