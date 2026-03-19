"use client";

import * as React from "react";

import { cn } from "@/commons/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";

const inputVariants = cva(
  cn(
    "w-full inline-flex rounded-2xl items-center justify-center border border-gray-100 bg-white",
    "px-[20px] py-[16.5px] text-base text-[#1F1F22] leading-none",
    "leading-[100%] tracking-[-0.025em]",
    "placeholder-[#9FA0A7] focus-visible:outline-[#3D9EF2] focus-[#1F1F22] disabled:cursor-not-allowed disabled:opacity-50",
  ),
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-red-500 focus-within:border-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  labelTxt?: string;
  errorTxt?: string;
  ref?: React.Ref<HTMLInputElement>;
}
/**
 * className?, type?, id?, labelTxt?, errorTxt?, disabled(boolean)
 */
const Input = ({
  className,
  variant,
  type = "text",
  id,
  labelTxt,
  errorTxt,
  disabled,
  ref,
  ...props
}: InputProps) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;
  const [showPassword, setShowPassword] = React.useState(false);

  const isPasswordType = type === "password";
  const currentType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="w-full">
      {labelTxt && (
        <label
          htmlFor={inputId}
          className={cn(
            "w-full inline-flex",
            "text-[16px] font-bold leading-[100%] tracking-[-0.025em] text-gray-900",
            "mb-[10px]",
          )}
        >
          {labelTxt}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={inputId}
          type={currentType}
          className={cn(
            inputVariants({
              variant: errorTxt ? "error" : variant,
              className,
            }),
            isPasswordType && "pr-12",
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
            className={cn(
              "absolute right-4 flex items-center justify-center",
              " text-gray-500 ",
              "focus:outline-none",
              disabled
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-500 hover:text-gray-700 cursor-pointer",
            )}
          >
            {showPassword ? (
              <Eye className="size-4.5" />
            ) : (
              <EyeOff className="size-4.5" />
            )}
          </button>
        )}
      </div>
      {errorTxt && (
        <p className="mt-2 text-sm text-red-500 leading-tight">{errorTxt}</p>
      )}
    </div>
  );
};

Input.displayName = "Input";

export { Input };
