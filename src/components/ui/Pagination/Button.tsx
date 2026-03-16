import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/commons/utils/cn";

export interface PaginationButtonProps
  extends
    React.ComponentProps<"button">,
    VariantProps<typeof paginationButtonVariants> {}

const paginationButtonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function PaginationButton({
  className,
  variant = "default",
  children,
  ...props
}: PaginationButtonProps) {
  return (
    <button
      data-slot="button"
      data-variant={variant}
      className={cn(paginationButtonVariants({ variant, className }))}
      {...props}
    >
      {children}
    </button>
  );
}

export { PaginationButton, paginationButtonVariants };
