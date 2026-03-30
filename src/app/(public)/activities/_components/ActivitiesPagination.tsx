"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/commons/utils/cn";
import { PaginationButton } from "@/components/ui/Pagination/Button";
import { updateQueryString } from "../_utils/query";

interface ActivitiesPaginationProps {
  totalPage: number;
}

export default function ActivitiesPagination({
  totalPage,
}: ActivitiesPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const currentGroup = Math.ceil(currentPage / 5);
  const startPage = (currentGroup - 1) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPage);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const handlePageChange = (pageNumber: number) => {
    const queryString = updateQueryString(searchParams, {
      page: pageNumber,
    });
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      role="navigation"
      aria-label="activities pagination"
      className="mx-auto flex w-full justify-center"
    >
      <ul className="flex items-center gap-[4px]">
        <li>
          <PaginationLink
            aria-label="Go to previous page"
            onClick={() => handlePageChange(Math.max(1, startPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon
              data-icon="inline-start"
              className={cn(
                currentPage === 1 ? "text-[#B3B4BC]" : "text-[#1F1F22]",
              )}
            />
          </PaginationLink>
        </li>

        {pages.map((pageNumber) => (
          <li key={pageNumber}>
            <PaginationLink
              onClick={() => handlePageChange(pageNumber)}
              isActive={currentPage === pageNumber}
            >
              {pageNumber}
            </PaginationLink>
          </li>
        ))}

        <li>
          <PaginationLink
            aria-label="Go to next page"
            onClick={() => handlePageChange(Math.min(totalPage, endPage + 1))}
            disabled={currentPage === totalPage}
          >
            <ChevronRightIcon
              data-icon="inline-end"
              className={cn(
                currentPage === totalPage ? "text-[#B3B4BC]" : "text-[#1F1F22]",
              )}
            />
          </PaginationLink>
        </li>
      </ul>
    </nav>
  );
}

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & React.ComponentProps<"button">;

function PaginationLink({
  className,
  isActive,
  disabled = false,
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <PaginationButton
      variant={isActive ? "outline" : "ghost"}
      className={cn(
        "relative h-[40px] w-[40px]",
        "cursor-pointer text-[14px] leading-[24px] font-medium tracking-[-2.5%] text-[#B3B4BC]",
        isActive && [
          "font-bold text-[#1F1F22] border-none",
          "after:content-['']",
          "after:absolute after:bottom-0 after:left-0",
          "after:w-full after:h-[2px]",
          "after:bg-[#3D9EF2]",
        ],
        disabled && "pointer-events-none opacity-50 cursor-not-allowed",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </PaginationButton>
  );
}
