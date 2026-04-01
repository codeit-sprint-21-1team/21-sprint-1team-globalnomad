"use client";

import { cn } from "@/commons/utils/cn";
import { useNomadReport } from "./_libs/useNomadReport";
import ActivitySummary from "./_components/ActivitySummary";
import ReportList from "./_components/ReportList";

export default function NomadReportPage() {
  const { reservationData, activityData, isLoading } = useNomadReport();

  if (isLoading) return <>로딩중 추가 예정</>;

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
          지금까지 어떤 체험을 나누고 즐겼는지, OO님의 여정을 분석해 드려요.
        </div>
      </div>
      <section className="mt-[20px] md:mt-[24px]">
        <article className="flex flex-col gap-[24px]">
          <ActivitySummary
            reviewDataTotalCount={reservationData?.totalCount || 0}
            activityDataTotalCount={activityData?.totalCount || 0}
          />

          <ReportList
            reservationData={reservationData?.reservations || []}
            activityData={activityData?.activities || []}
          />
        </article>
      </section>
    </div>
  );
}
