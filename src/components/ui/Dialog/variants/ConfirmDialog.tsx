"use client";
import { ReactNode } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Buttons/Button";
import { DialogRenderer } from "../ui";

interface ConfirmDialogProps {
  content: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmDialog({ content, onClose, onConfirm }: ConfirmDialogProps) {
  return (
    <DialogRenderer
      containerClass="md:px-14 px-10"
      icon={
        <Image
          src="/icons/warning.svg"
          alt="warning"
          width={88}
          height={88}
          className="w-[49px] h-[49px] md:w-[88px] md:h-[88px]"
        />
      }
      content={content}
      actions={
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
      }
    />
  );
}
