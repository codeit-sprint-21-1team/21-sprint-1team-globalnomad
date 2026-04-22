"use client";
import { ReactNode, useId } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "@/commons/hooks/useFocusTrap";

interface ModalRendererProps {
  content: ReactNode;
  onClose: () => void;
}

export function ModalRenderer({ content, onClose }: ModalRendererProps) {
  const panelRef = useFocusTrap<HTMLDivElement>(true);
  const contentId = useId();

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={contentId}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="scrollbar-ghost relative max-h-[85vh] overflow-y-auto rounded-3xl bg-white px-6 md:px-7 pt-5 pb-7 md:pb-11 focus:outline-none"
      >
        <div className="flex items-center justify-end mb-1">
          <button
            onClick={onClose}
            aria-label="닫기"
            className="cursor-pointer text-xs font-bold text-gray-600 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div id={contentId}>{content}</div>
      </div>
    </div>,
    document.body,
  );
}
