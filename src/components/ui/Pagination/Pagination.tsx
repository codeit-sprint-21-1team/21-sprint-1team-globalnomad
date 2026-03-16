import * as React from "react";
import { cn } from "@/commons/utils/cn";
import { Button } from "@/components/ui/Pagination/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
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
} & React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  disabled = false,
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      asChild
      variant={isActive ? "outline" : "ghost"}
      className={cn(
        "relative w-[40px] h-[40px]",
        "text-[14px] leading-[24px] font-medium tracking-[-2.5%] text-[#B3B4BC]",
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
    >
      <a
        aria-current={isActive ? "page" : undefined}
        data-slot="pagination-link"
        data-active={isActive}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        {...props}
      />
    </Button>
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

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
