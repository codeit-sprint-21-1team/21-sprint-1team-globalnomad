"use client";
import { cn } from "@/commons/utils/cn";
import { ReactNode } from "react";

interface DialogRendererProps {
  icon?: ReactNode;
  content: ReactNode;
  actions: ReactNode;
  containerClass?: string;
}

export function DialogRenderer({
  icon,
  content,
  actions,
  containerClass,
}: DialogRendererProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        className={cn(
          "flex w-[320px] md:w-[400px] flex-col items-center rounded-4xl bg-white py-6 md:py-8",
          containerClass,
        )}
      >
        {icon}
        <p className="whitespace-pre-line text-center text-base font-bold text-gray-800 mb-3 md:mb-5">
          {content}
        </p>
        {actions}
      </div>
    </div>
  );
}
