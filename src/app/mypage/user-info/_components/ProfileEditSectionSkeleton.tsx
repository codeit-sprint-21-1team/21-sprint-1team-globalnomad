"use client";

import { cn } from "@/commons/utils/cn";
import { Skeleton } from "@/components/ui/Skeleton/Skeleton";

export default function ProfileEditSectionSkeleton() {
  return (
    <div>
      <div className="mt-[10px]">
        <div
          className={cn(
            "w-full",
            "font-bold text-lg leading-[100%] tracking-[-2.5%] text-[#1F1F22]",
            "align-middle mt-[10px]",
          )}
        >
          내 정보
        </div>

        <div
          className={cn(
            "text-sm leading-[-2.5%] align-middle text-[#84858C]",
            "mt-[4px]",
          )}
        >
          프로필 이미지와 닉네임을 수정하실 수 있습니다.
        </div>
      </div>
      <section className="mt-[20px] md:mt-[24px]">
        <article>
          <div className="flex flex-col gap-[18px] md:gap-[24px]">
            <div className="flex flex-col items-center gap-6 relative self-center">
              <div className="relative w-[120px] h-[120px]">
                <Skeleton className="w-full h-full rounded-full"></Skeleton>
                <div className="absolute bottom-[4px] right-[2px] w-[30px] h-[30px]">
                  <Skeleton className="w-full h-full rounded-full" />
                </div>
              </div>
            </div>
            <div className="w-full">
              <Skeleton className="w-12 h-[20px] mb-[3px]" />
              <Skeleton className="w-full h-[54px] rounded-2xl" />
            </div>
            <div className="w-full">
              <Skeleton className="w-12 h-[20px] mb-[3px]" />
              <Skeleton className="w-full h-[54px] rounded-2xl" />
            </div>
            <div className="flex justify-center gap-[12px] mt-[16px] md:mt-0">
              <Skeleton className="flex-1 md:max-w-[120px] h-[41px] rounded-[16px]"></Skeleton>
              <Skeleton className="flex-1 md:max-w-[120px] h-[41px] rounded-[16px]"></Skeleton>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
