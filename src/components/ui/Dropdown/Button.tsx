import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/commons/utils/cn";
import Image from "next/image";

export interface DropdownButtonProps
  extends
    React.ComponentProps<"button">,
    VariantProps<typeof dropdownButtonVariants> {
  asChild?: boolean;
}

const dropdownButtonVariants = cva(
  cn(
    "group/button relative inline-flex shrink-0 items-center justify-center",
    "w-[fit-content]",
    "text-[18px] font-medium tracking-[-2.5%] text-[#1F1F22]",
    "px-[10px] py-[6.5px]",
    "whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
  ),
  {
    variants: {},
    defaultVariants: {},
  },
);

function DropdownButton({
  className,
  asChild = false,
  ...props
}: DropdownButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(dropdownButtonVariants({ className }))}
      {...props}
    >
      {props.children}
      <Image
        width={20}
        height={20}
        src="/icons/arrow_down.svg"
        alt="dropdown icon"
        className={cn(
          "transition-transform duration-200",
          "group-data-[state=open]/button:rotate-180",
        )}
      />
    </Comp>
  );
}

export { DropdownButton, dropdownButtonVariants };
