"use client";

import * as React from "react";
import { cn } from "@/commons/utils/cn";
import { PaginationButton } from "@/components/ui/Pagination/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPage: number;
}

export function Pagination({ totalPage }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const currentGroup = Math.ceil(currentPage / 5);
  const startPage = (currentGroup - 1) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPage);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <PaginationRoot>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(Math.max(1, startPage - 1))}
            disabled={currentPage === 1}
          />
        </PaginationItem>

        {pages.map((num) => (
          <PaginationItem key={num}>
            <PaginationLink
              onClick={() => handlePageChange(num)}
              isActive={currentPage === num}
            >
              {num}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(Math.min(totalPage, endPage + 1))}
            disabled={currentPage === totalPage}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}

function PaginationRoot({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-[4px]", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
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
        "relative w-[40px] h-[40px]",
        "text-[14px] leading-[24px] font-medium tracking-[-2.5%] text-[#B3B4BC]",
        "cursor-pointer",
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
      {...props}
    >
      {children}
    </PaginationButton>
  );
}

function PaginationPrevious({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={className}
      disabled={disabled}
      {...props}
    >
      <ChevronLeftIcon
        data-icon="inline-start"
        className={cn(disabled ? "text-[#B3B4BC]" : "text-[#1F1F22]")}
      />
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={className}
      disabled={disabled}
      {...props}
    >
      <ChevronRightIcon
        data-icon="inline-end"
        className={cn(disabled ? "text-[#B3B4BC]" : "text-[#1F1F22]")}
      />
    </PaginationLink>
  );
}
