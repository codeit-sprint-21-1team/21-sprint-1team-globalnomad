"use client";

import { ChangeEvent, memo, RefObject } from "react";
import Image from "next/image";
import { cn } from "@/commons/utils/cn";

interface imagePropsType {
  fileInputRef: RefObject<HTMLInputElement | null>;
  onImageButtonClick: () => void;
  onImageFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface ProfileSectionType {
  imageSrc: string;
  imageProps?: imagePropsType;
  isEditable?: boolean;
}

export const ProfileSection = memo(
  ({ imageSrc, imageProps, isEditable = false }: ProfileSectionType) => {
    const profileImage = imageSrc || "/images/blank_profile.png";
    const { fileInputRef, onImageButtonClick, onImageFileChange } =
      imageProps || {};

    return (
      <div className="flex flex-col items-center gap-6 relative self-center">
        <div
          className={cn(
            "relative",
            "w-[120px] h-[120px] md:w-[70px] md:h-[70px] xl:w-[120px] xl:h-[120px]",
          )}
        >
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              fill
              src={profileImage}
              alt="내 프로필 사진"
              className="object-cover"
              priority
              sizes="(min-width: 768px) and (max-width: 1279px) 70px, 120px"
            />
          </div>

          {isEditable && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onImageFileChange?.(e)}
              />
              <button
                type="button"
                className={cn(
                  "absolute z-[10]",
                  "bottom-[4px] right-[2px] md:bottom-[2px] md:right-[-2.5px] xl:bottom-[4px] xl:right-[2px]",
                  "w-[30px] h-[30px] md:w-[24px] md:h-[24px] xl:w-[30px] xl:h-[30px]",
                )}
                onClick={onImageButtonClick}
              >
                <Image
                  width={30}
                  height={30}
                  src="/images/edit_button.png"
                  alt="수정"
                />
              </button>
            </>
          )}
        </div>
      </div>
    );
  },
);
ProfileSection.displayName = "ProfileSection";
