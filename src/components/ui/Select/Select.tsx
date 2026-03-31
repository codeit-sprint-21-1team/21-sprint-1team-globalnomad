"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "radix-ui";

import { cn } from "@/commons/utils/cn";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import Image from "next/image";
import { cva } from "class-variance-authority";

const selectTriggerVariants = cva(
  "flex w-full h-12 items-center justify-between rounded-[16px] border bg-transparent px-[20px] font-medium text-[16px] text-[#1F1F22] transition-colors outline-none select-none disabled:cursor-not-allowed disabled:opacity-50 data-placeholder:text-[16px] data-placeholder:font-medium data-placeholder:text-gray-400 [&_img]:transition-transform [&_img]:duration-200 data-[state=open]:[&_img]:rotate-180",
  {
    variants: {
      variant: {
        default:
          "border-[#E0E0E5] data-[state=open]:border-[#3D9EF2] data-[state=open]:ring-1 data-[state=open]:ring-[#3D9EF2] focus:border-[#3D9EF2]",
        error:
          "border-red-500 !border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 data-[state=open]:border-red-500 data-[state=open]:ring-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  );
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  variant = "default",
  children,
  "aria-label": ariaLabel,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
  variant?: "default" | "error";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(selectTriggerVariants({ variant }), className)}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        {/* <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" /> */}
        <Image
          src="/icons/arrow_down.svg"
          width={24}
          height={24}
          alt="select-arrow-icon"
        ></Image>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "start",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        data-align-trigger={position === "item-aligned"}
        className={cn(
          "relative z-50 max-h-(--radix-select-content-available-height) min-w-36 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          position === "popper" &&
            "w-full min-w-(--radix-select-trigger-width)",
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          data-position={position}
          className={cn(
            "data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)",
            position === "popper" && "",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-1.5 py-1 text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 py-[12px] px-[20px] text-sm outline-hidden select-none",
        "before:absolute before:inset-y-[4px] before:inset-x-[12px] before:rounded-md before:-z-10 focus:before:bg-[#E5F3FF]",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownButton>
  );
}

interface CustomSelectProps extends React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Root
> {
  labelTxt?: string;
  isNeedLabel?: boolean;
  errorTxt?: string;
  placeholder?: string;
  items: readonly { value: string; label: string }[];
  className?: string;
  maxHeight?: string;
  onBlur?: React.FocusEventHandler;
}

export function LabeledSelect({
  labelTxt,
  isNeedLabel,
  errorTxt,
  placeholder,
  items,
  className,
  maxHeight,
  onBlur,
  onValueChange,
  ...props
}: CustomSelectProps) {
  return (
    <div className={cn("w-full flex flex-col gap-[10px]")}>
      {labelTxt && (
        <label
          className={cn(
            "text-[16px] font-bold leading-[100%] tracking-[-0.025em] text-gray-900",
            !isNeedLabel ? "hidden md:inline-flex" : "flex",
          )}
        >
          {labelTxt}
        </label>
      )}

      <Select
        {...props}
        onValueChange={onValueChange}
        onOpenChange={(open) => {
          if (!open && onBlur) {
            onBlur({} as React.FocusEvent);
          }
        }}
      >
        <SelectTrigger
          key={errorTxt ? "error-active" : "normal"}
          aria-label={labelTxt || placeholder || "항목 선택"}
          variant={errorTxt ? "error" : "default"}
          className={cn("h-[54px]", className)}
          style={errorTxt ? { borderColor: "#ef4444" } : {}}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent
          position="popper"
          align="start"
          className={cn("w-[var(--radix-select-trigger-width)]", maxHeight)}
        >
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {errorTxt && (
        <p className="mt-1 text-sm text-red-500 leading-tight">{errorTxt}</p>
      )}
    </div>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
