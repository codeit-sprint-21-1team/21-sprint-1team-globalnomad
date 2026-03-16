"use client";
import { ReactNode, useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalRendererProps {
  content: ReactNode;
  onClose: () => void;
}

export function ModalRenderer({ content, onClose }: ModalRendererProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="scrollbar-ghost relative max-h-[85vh] overflow-y-auto rounded-3xl bg-white px-6 md:px-7 pt-5 pb-7 md:pb-11">
        <div className=" flex items-center justify-end mb-1">
          <button
            onClick={onClose}
            aria-label="닫기"
            className="cursor-pointer text-xs font-bold text-gray-600 hover:text-black"
          >
            ✕
          </button>
        </div>

        {content}
      </div>
    </div>,
    document.body,
  );
}
