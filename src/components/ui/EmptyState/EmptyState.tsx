"use client";

import { ReactNode } from "react";
import Image from "next/image";

interface EmptyStateProps {
  message: string;
  children?: ReactNode;
}

export default function EmptyState({ message, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-[30px]">
      <Image
        src="/images/no_list.png"
        width={122}
        height={122}
        alt="데이터 없음 아이콘"
        priority
      />
      <p className="text-[16px] font-medium tracking-[-2.5%] text-[#707177]">
        {message}
      </p>

      {children && <div>{children}</div>}
    </div>
  );
}
