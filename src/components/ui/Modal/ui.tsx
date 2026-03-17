"use client";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalRendererProps {
  content: ReactNode;
  onClose: () => void;
}

export function ModalRenderer({ content, onClose }: ModalRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const inertEls = Array.from(document.body.children).filter(
      (el) => el !== containerRef.current,
    );
    inertEls.forEach((el) => el.setAttribute("inert", ""));
    containerRef.current?.querySelector<HTMLElement>("button")?.focus();

    return () => {
      inertEls.forEach((el) => el.removeAttribute("inert"));
      previous?.focus();
    };
  }, []);

  return createPortal(
    <div
      ref={containerRef}
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
