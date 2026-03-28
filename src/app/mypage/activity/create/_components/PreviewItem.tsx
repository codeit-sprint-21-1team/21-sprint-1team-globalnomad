"use client";

import Image from "next/image";
import { X } from "lucide-react";

export default function PreviewItem({
  src,
  onRemove,
}: {
  src: string;
  onRemove: () => void;
}) {
  return (
    <div className="relative pt-2 pr-2 shrink-0">
      <div className="relative w-[128px] h-[128px] border border-gray-200 rounded-[16px] shrink-0">
        <Image
          src={src}
          alt="미리보기"
          fill
          className="rounded-[16px] object-cover"
        />
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-[-6px] right-[-4px] bg-[#1F1F22] hover:bg-black text-white rounded-full p-1 transition border-none outline-none ring-0 flex items-center justify-center shadow-none"
        >
          <X
            width={18}
            height={18}
            className="border-none outline-none ring-0"
          />
        </button>
      </div>
    </div>
  );
}
