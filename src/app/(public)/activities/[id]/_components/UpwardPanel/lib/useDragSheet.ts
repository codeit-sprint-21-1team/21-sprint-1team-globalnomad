import { useRef, useState } from "react";

const CLOSE_THRESHOLD = 80;

export function useDragSheet(onClose: () => void) {
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
    setDragY(Math.max(0, e.clientY - startYRef.current));
  };

  const handlePointerUp = () => {
    if (dragY > CLOSE_THRESHOLD) onClose();
    setDragY(0);
    setIsDragging(false);
  };

  return {
    dragY,
    isDragging,
    dragHandlers: { onPointerDown: handlePointerDown, onPointerMove: handlePointerMove, onPointerUp: handlePointerUp },
  };
}
