"use client";

import { Button } from "@/components/ui/Buttons/Button";
import { cn } from "@/commons/utils/cn";

interface PanelButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function PanelButton({
  children,
  disabled,
  onClick,
  className,
}: PanelButtonProps) {
  return (
    <Button
      variant="default"
      size="md"
      className={cn("w-full", className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
