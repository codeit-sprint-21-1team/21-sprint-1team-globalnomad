"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Buttons/Button";
import { cn } from "@/commons/utils/cn";

const CLOSE_THRESHOLD = 80;

interface UpwardPanelProps {
  price: number;
}

export function UpwardPanel({ price }: UpwardPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    startYRef.current = e.clientY;
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const diff = e.clientY - startYRef.current;
    setDragY(Math.max(0, diff));
  };

  const handlePointerUp = () => {
    if (dragY > CLOSE_THRESHOLD) setIsOpen(false);
    setDragY(0);
    setIsDragging(false);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-90 xl:hidden touch-pan-y"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className="fixed bottom-[84px] left-0 right-0 z-100 xl:hidden  bg-white rounded-t-3xl flex flex-col overflow-hidden"
        style={{
          transform: isOpen ? `translateY(${dragY}px)` : "translateY(100%)",
          transition: isDragging
            ? "none"
            : "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        <div
          className={cn(
            "flex justify-center py-3 flex-shrink-0 touch-none",
            isDragging ? "cursor-grabbing" : "cursor-grab",
          )}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="flex-1 overflow-y-auto px-4  no-scrollbar">
          <div className="h-70 bg-yellow-500 flex items-center justify-center">
            캘린더란
          </div>
        </div>
      </div>

      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-100 xl:hidden bg-white px-4 pt-2.5 pb-4 flex flex-col gap-2.5",
          !isOpen &&
            "border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-300 overflow-hidden",
            isOpen
              ? "opacity-0 pointer-events-none max-h-2"
              : "opacity-100 max-h-20",
          )}
        >
          <span className="text-lg font-bold text-gray-950">
            {price === 0 ? "FREE" : `₩${price.toLocaleString()}`}
            <span className="text-sm font-normal text-gray-600"> /1명</span>
          </span>

          <span
            className="text-sm text-blue-500 underline cursor-pointer"
            onClick={() => {
              setDragY(0);
              setIsOpen(true);
            }}
          >
            날짜 선택하기
          </span>
        </div>

        <Button variant="default" size="md">
          예약하기
        </Button>
      </div>
    </>
  );
}
