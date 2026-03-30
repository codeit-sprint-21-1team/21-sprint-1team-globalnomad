import { cn } from "@/commons/utils/cn";
import { MyReservationTabs } from "./_components/MyReservationTabs";
import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getMyReservationList } from "@/apis/myReservations.api";
import MyReservationList from "./_components/MyReservationList";
import { TAB_ITEMS } from "@/commons/consts/reservations";

export default async function ReservationPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const queryClient = new QueryClient();
  const { status: rawStatus } = await searchParams;
  const status = rawStatus || "all";

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["myReservations", status],
    queryFn: () =>
      getMyReservationList({
        cursorId: null,
        status: status === "all" ? undefined : status,
      }),
    initialPageParam: null,
  });

  return (
    <div className="flex flex-col gap-[50px] mb-[24px] md:mb-[225px]">
      <header>
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
          <MyReservationTabs items={TAB_ITEMS} />
        </Suspense>
      </header>

      <section className="mt-[13px] md:mt-[30px] xl:mt-[30px]">
        <Suspense fallback={<div>목록 로딩 중...</div>}>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <MyReservationList />
          </HydrationBoundary>
        </Suspense>
      </section>
    </div>
  );
}
