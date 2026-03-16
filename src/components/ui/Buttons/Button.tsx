import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/commons/utils/cn";

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const buttonVariants = cva(
  cn(
    "w-full inline-flex shrink-0 items-center justify-center gap-[4px]",
    "font-medium tracking-[-2.5%] px-[5px] border whitespace-nowrap transition-all outline-none",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none",
  ),
  {
    variants: {
      variant: {
        default: cn(
          "bg-[#3D9EF2] text-white border-[#3D9EF2]",
          "disabled:bg-[#C6C8CF] disabled:border-[#C6C8CF] [&.disabled]:bg-[#C6C8CF] [&.disabled]:border-[#C6C8CF]",
        ),
        secondary: cn(
          "bg-white text-[#707177] border-[#C6C8CF]",
          "disabled:text-[#C6C8CF] [&.disabled]:text-[#C6C8CF]",
        ),
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
      },
      size: {
        sm: "rounded-[12px] py-[9.5px] text-[14px] [&_svg]:size-[16px]",
        md: "rounded-[14px] py-[11.5px] text-[16px] [&_svg]:size-[18px]",
        lg: "rounded-[16px] py-[14.5px] text-[16px] [&_svg]:size-[24px]",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  },
);

export function Button({
  className,
  variant = "default",
  size = "lg",
  disabled,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      disabled={disabled}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
