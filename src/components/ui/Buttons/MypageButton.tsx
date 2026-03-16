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
    "w-full inline-flex shrink-0 items-center justify-center",
    "gap-[6px] md:gap-[8px] xl:gap-[11px]",
    "text-[14px] md:text-[16px] font-medium tracking-[-2.5%] text-[#707177]",
    "px-[5px] py-[10px] md:py-[13.5px] xl:py-[15px]",
    "rounded-[12px] md:rounded-[14px] xl:rounded-[16px]",
    "whitespace-nowrap transition-all outline-none",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "[&_img]:w-[16px] [&_img]:h-[16px] md:[&_img]:w-[20px] md:[&_img]:h-[20px] xl:[&_img]:w-[24px] xl:[&_img]:h-[24px]",
  ),
  {
    variants: {
      active: {
        true: "text-[#1F1F22] bg-[#E5F3FF]",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export function MypageButton({
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
