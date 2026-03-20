"use client";

import { memo } from "react";
import Image from "next/image";
import { cn } from "@/commons/utils/cn";

export const ProfileSection = memo(({ imageSrc }: { imageSrc: string }) => {
  return (
    <div className="flex flex-col items-center gap-6 relative self-center">
      <div
        className={cn(
          "relative rounded-full overflow-hidden w-[120px] h-[120px] md:w-[70px] md:h-[70px] xl:w-[120px] xl:h-[120px]",
        )}
      >
        <Image
          width={120}
          height={120}
          src={imageSrc}
          alt="내프로필 사진"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
});
ProfileSection.displayName = "ProfileSection";
