import { cn } from "@/commons/utils/cn";
import { Skeleton } from "@/components/ui/Skeleton/Skeleton";

export default function nomadPageSkeleton() {
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
          나의 노마드 리포트
        </div>

        <div
          className={cn(
            "text-sm leading-[-2.5%] align-middle text-[#84858C]",
            "mt-[4px]",
          )}
        >
          지금까지 어떤 체험을 나누고 즐겼는지, 님의 여정을 분석해 드려요.
        </div>
      </div>
      <section className="mt-[20px] md:mt-[24px] mb-[78px] md:mb-[178px] xl:mb-[378px]">
        <article className="flex flex-col gap-[24px]">
          <Skeleton className="w-full h-[54px]"></Skeleton>

          <div className="flex justify-center items-center flex-col md:flex-row gap-[24px]">
            <Skeleton className="w-full md:max-w-[228px] h-[336px] rounded-2xl md:rounded-3xl"></Skeleton>
            <Skeleton className="w-full md:max-w-[228px] h-[336px] rounded-2xl md:rounded-3xl"></Skeleton>
          </div>

          <ul className="flex flex-col gap-[24px] mt-[50px] md:mt-[70px]">
            <Skeleton className="w-full h-[54px] md:h-[27px]"></Skeleton>
            <Skeleton className="w-full h-[54px] md:h-[27px]"></Skeleton>
            <Skeleton className="w-full h-[54px] md:h-[27px]"></Skeleton>
          </ul>
        </article>
      </section>
    </div>
  );
}
