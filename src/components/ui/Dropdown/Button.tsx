import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/commons/utils/cn";
import Image from "next/image";

const buttonVariants = cva(
  cn(
    "group/button relative inline-flex shrink-0 items-center justify-center",
    "w-[fit-content]",
    "text-[18px] font-medium tracking-[-2.5%] text-[#1F1F22]",
    "px-[10px] py-[6.5px]",
    "whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
  ),
  {
    variants: {},
    defaultVariants: {},
  },
);

function Button({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ className }))}
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

export { Button, buttonVariants };
