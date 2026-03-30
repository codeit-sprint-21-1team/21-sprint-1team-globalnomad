import { cn } from "@/commons/utils/cn";
import { Button } from "@/components/ui/Buttons/Button";
import MyActivityList from "./_components/MyActivityList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getMyActivityList } from "@/apis/myActivities.api";
import Link from "next/link";

export default async function ActivityPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["myActivities"],
    queryFn: () => getMyActivityList({ cursorId: null }),
    initialPageParam: null,
  });

  return (
    <main className="md:px-0 md:py-0 xl:px-0 xl:py-0">
      <header className="mt-[10px] flex justify-between items-start">
        <div className="flex flex-col w-[260px] justify-between">
          <div
            className={cn(
              "",
              "font-bold text-lg leading-[100%] tracking-[-2.5%] text-[#1F1F22]",
              "align-middle",
            )}
          >
            내 체험 관리
          </div>

          <div
            className={cn(
              "text-sm leading-[-2.5%] align-middle text-[#84858C]",
              "mt-[4px]",
            )}
          >
            체험을 등록하거나 수정 및 삭제가 가능합니다.
          </div>
        </div>
        <div className="w-[138px] ml-[20px]">
          <Link href="/mypage/activity/create">
            <Button variant="default" size="md">
              체험 등록하기
            </Button>
          </Link>
        </div>
      </header>

      <section className="mt-[20px] md:mt-[24px] xl:mt-[24px]">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MyActivityList />
        </HydrationBoundary>
      </section>
    </main>
  );
}
