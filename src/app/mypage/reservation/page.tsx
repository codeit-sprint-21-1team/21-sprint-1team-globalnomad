import { cn } from "@/commons/utils/cn";
import { ReservationTabs } from "./_components/ReservationTabs";
import { Suspense } from "react";
import axios from "@/apis/axios";

const TAB_ITEMS = [
  { action: "all", label: "전체" },
  { action: "pending", label: "예약 신청" },
  { action: "canceled", label: "예약 취소" },
  { action: "confirmed", label: "예약 승인" },
  { action: "declined", label: "예약 거절" },
  { action: "completed", label: "체험 완료" },
];

// async function ReservationList() {}

export default function ReservationPage() {
  return (
    <main className="px-[24px] py-[10px] md:px-0 md:py-0 xl:px-0 xl:py-0">
      <header className="mt-[10px]">
        <div
          className={cn(
            "w-full",
            "font-bold text-lg leading-[100%] tracking-[-2.5%] text-[#1F1F22]",
            "align-middle mt-[10px]",
          )}
        >
          예약내역
        </div>

        <div
          className={cn(
            "text-sm leading-[-2.5%] align-middle text-[#84858C]",
            "mt-[4px]",
          )}
        >
          예약내역 변경 및 취소할 수 있습니다.
        </div>
        <Suspense fallback={<div>로딩 중...</div>}>
          <ReservationTabs items={TAB_ITEMS} />
        </Suspense>
      </header>

      <section className="mt-[13px] md:mt-[30px] xl:mt-[30px]">
        <article>
          {/* TODO: reservation list 구현 */}
          {/* <ReservationList data={data} /> */}
          {/* <ReservationList /> */}
        </article>
      </section>
    </main>
  );
}
