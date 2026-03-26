import { useState, useRef, type MouseEvent } from "react";

export function useDraggable() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [didMove, setDidMove] = useState(false);

  const onDragStart = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setDidMove(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  const onDragMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;

    if (Math.abs(x - startX) > 5) {
      setDidMove(true);
    }

    if (didMove) {
      e.preventDefault();
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return {
    scrollRef,
    isDragging,
    didMove,
    onMouseDown: onDragStart,
    onMouseUp: onDragEnd,
    onMouseLeave: onDragEnd,
    onMouseMove: onDragMove,
  };
}
