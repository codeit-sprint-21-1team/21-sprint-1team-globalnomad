"use client";

import { cn } from "@/commons/utils/cn";
import { Skeleton } from "@/components/ui/Skeleton/Skeleton";

export default function PasswordEditSectionSkeleton() {
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
          비밀번호 변경
        </div>

        <div
          className={cn(
            "text-sm leading-[-2.5%] align-middle text-[#84858C]",
            "mt-[4px]",
          )}
        >
          비밀번호를 수정하실 수 있습니다.
        </div>
      </div>
      <section className="mt-[20px] md:mt-[24px]">
        <article>
          <div className="flex flex-col gap-[18px] md:gap-[24px]">
            <div className="w-full">
              <Skeleton className="inline-flex w-12 h-[20px] mb-[3px]" />
              <Skeleton className="w-full h-[54px] rounded-2xl" />
              <div className="mt-2 flex flex-col gap-1.5 w-full">
                <div className="grid grid-cols-4 gap-1.5">
                  <Skeleton className="h-4 rounded-2xl" />
                  <Skeleton className="h-4 rounded-2xl" />
                  <Skeleton className="h-4 rounded-2xl" />
                  <Skeleton className="h-4 rounded-2xl" />
                </div>
              </div>
            </div>
            <div className="w-full">
              <Skeleton className="w-12 h-[20px] mb-[3px]" />
              <Skeleton className="w-full h-[54px] rounded-2xl" />
            </div>
            <Skeleton className="w-full md:max-w-[120px] h-[41px] mt-[16px] md:mt-0 mx-auto rounded-[16px]"></Skeleton>
          </div>
        </article>
      </section>
    </div>
  );
}
