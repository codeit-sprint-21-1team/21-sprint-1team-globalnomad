"use client";
import { cn } from "@/commons/utils/cn";
import Image from "next/image";
import { ReactNode } from "react";
import { Button } from "@/components/ui/Buttons/Button";

export interface DialogOptions {
  content: ReactNode;
  type: "confirm" | "alert";
  onConfirm?: () => void;
}

interface DialogRendererProps {
  dialog: DialogOptions;
  onClose: () => void;
  onConfirm: () => void;
}

export function DialogRenderer({
  dialog,
  onClose,
  onConfirm,
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
          dialog.type === "confirm" ? "md:px-14 px-10 " : "md:px-21 px-16",
        )}
      >
        {dialog.type === "confirm" && (
          <Image
            src="/icons/warning.svg"
            alt="warning"
            width={88}
            height={88}
            className="w-[49px] h-[49px] md:w-[88px] md:h-[88px]"
          />
        )}

        <p className="whitespace-pre-line text-center text-base font-bold text-gray-800 mb-3 md:mb-5">
          {dialog.content}
        </p>

        {dialog.type === "confirm" ? (
          <div className="flex w-full gap-3">
            <Button
              autoFocus
              variant="secondary"
              size="sm"
              onClick={onClose}
              className="flex-1"
            >
              아니오
            </Button>
            <Button size="sm" onClick={onConfirm} className="flex-1">
              네
            </Button>
          </div>
        ) : (
          <Button autoFocus size="sm" onClick={onClose}>
            확인
          </Button>
        )}
      </div>
    </div>
  );
}
