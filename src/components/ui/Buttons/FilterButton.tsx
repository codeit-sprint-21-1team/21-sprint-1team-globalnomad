import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/commons/utils/cn";

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  active?: boolean;
}

const buttonVariants = cva(
  cn(
    "inline-flex shrink-0 items-center justify-center",
    "gap-[4px] md:gap-[6px]",
    "text-[14px] md:text-[16px] font-medium tracking-[-2.5%] text-[#1F1F22]",
    "px-[13.5px] md:px-[16px] py-[7.5px] md:py-[9.5px]",
    "rounded-[100px] border border-[#D8D8D8] bg-white",
    "whitespace-nowrap transition-all outline-none",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "[&_img]:w-[16px] [&_img]:h-[16px] md:[&_img]:w-[24px] md:[&_img]:h-[24px]",
  ),
  {
    variants: {
      active: {
        true: "text-white bg-[#333333] border-[#333333]",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export function FilterButton({
  className,
  asChild = false,
  active = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ className, active }))}
      {...props}
    />
  );
}
