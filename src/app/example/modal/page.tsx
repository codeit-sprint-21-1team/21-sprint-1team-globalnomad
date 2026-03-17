"use client";

import { useModal } from "@/components/ui/Modal";

export default function TestForModal() {
  const { showModal } = useModal();

  const handleClick = () => {
    showModal(
      <div className="w-64 h-40 flex items-center justify-center text-white font-medium bg-black">
        모달 콘텐츠
      </div>,
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <button
        onClick={handleClick}
        className="rounded-xl bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
      >
        Modal 열기
      </button>
    </div>
  );
}
