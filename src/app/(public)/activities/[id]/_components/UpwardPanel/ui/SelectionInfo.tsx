"use client";

interface SelectionInfoProps {
  selectionLabel: string | null;
  onOpen: () => void;
}

export function SelectionInfo({ selectionLabel, onOpen }: SelectionInfoProps) {
  if (selectionLabel) {
    return (
      <span className="text-sm text-blue-500 font-medium">{selectionLabel}</span>
    );
  }
  return (
    <span
      className="text-sm text-blue-500 underline cursor-pointer"
      onClick={onOpen}
    >
      날짜 선택하기
    </span>
  );
}
