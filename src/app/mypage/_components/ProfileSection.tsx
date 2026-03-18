"use client";

import { ChangeEvent, memo, RefObject } from "react";
import Image from "next/image";
import { cn } from "@/commons/utils/cn";

export const ProfileSection = memo(
  ({
    imageSrc,
    isUserInfo,
    onImageClick,
    onFileChange,
    fileInputRef,
  }: {
    imageSrc: string;
    isUserInfo: boolean;
    onImageClick: () => void;
    onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
    fileInputRef: RefObject<HTMLInputElement | null>;
  }) => {
    return (
      <div className="flex flex-col items-center gap-6 relative self-center">
        <div
          className={cn(
            "relative rounded-full overflow-hidden w-[120px] h-[120px] md:w-[70px] md:h-[70px] xl:w-[120px] xl:h-[120px]",
            isUserInfo ? "cursor-pointer" : "cursor-default",
          )}
          onClick={isUserInfo ? onImageClick : undefined}
        >
          <Image
            width={120}
            height={120}
            src={imageSrc}
            alt="내프로필 사진"
            className="object-cover w-full h-full"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileChange}
            accept="image/*"
            className="hidden"
            disabled={!isUserInfo}
          />
        </div>

        {isUserInfo && (
          <div className="absolute md:w-[24px] md:h-[24px] md:bottom-0 md:right-10 xl:w-[30px] xl:h-[30px] xl:bottom-1 xl:right-18">
            <Image
              width={30}
              height={30}
              src="/images/edit_button.png"
              alt="수정"
            />
          </div>
        )}
      </div>
    );
  },
);
ProfileSection.displayName = "ProfileSection";
