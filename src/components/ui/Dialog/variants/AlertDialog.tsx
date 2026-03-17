"use client";
import { ReactNode } from "react";
import { Button } from "@/components/ui/Buttons/Button";
import { DialogRenderer } from "../ui";

interface AlertDialogProps {
  content: ReactNode;
  onClose: () => void;
}

export function AlertDialog({ content, onClose }: AlertDialogProps) {
  return (
    <DialogRenderer
      containerClass="md:px-21 px-16"
      content={content}
      actions={
        <Button autoFocus size="sm" onClick={onClose}>
          확인
        </Button>
      }
    />
  );
}
