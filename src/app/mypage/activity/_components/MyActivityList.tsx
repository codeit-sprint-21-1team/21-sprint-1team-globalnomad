"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyActivityList } from "@/apis/myActivities.api";
import MyActivityItem from "./MyActivityItem";
import MyActivitySkeleton from "./MyActivitySkeleton";
import useInfiniteScroll from "@/commons/hooks/useInfiniteScroll";
import EmptyState from "@/components/ui/EmptyState/EmptyState";
import { useDialog } from "@/components/ui/Dialog";

export default function MyActivityList() {
  const { showDialog } = useDialog();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["myActivities"],
    queryFn: ({ pageParam }) => getMyActivityList({ cursorId: pageParam }),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    staleTime: 60 * 1000,
  });

  // TODO:: 추후 삭제
  // if (data) console.log("MyActivityList data:::", data);

  const targetRef = useInfiniteScroll({
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
    loading: isFetchingNextPage,
  });

  const allActivities = data?.pages.flatMap((page) => page.activities) ?? [];
  const isEmpty = !isLoading && allActivities.length === 0;

  if (isError) {
    showDialog({
      type: "alert",
      content: "데이터 로드 중 에러가 발생했습니다.",
    });
  }

  return (
    <>
      {isLoading && (
        <div className="flex flex-col gap-4">
          <MyActivitySkeleton count={5} />
        </div>
      )}

      {allActivities.length > 0 && (
        <div className="flex flex-col">
          {allActivities.map((activity) => (
            <MyActivityItem key={activity.id} {...activity} />
          ))}

          {isFetchingNextPage && <MyActivitySkeleton count={5} />}

          <div ref={targetRef} className="h-10" />
          {!hasNextPage && (
            <div className="flex justify-center text-gray-400">
              더 이상 목록이 없습니다
            </div>
          )}
        </div>
      )}

      {isEmpty && (
        <div className="flex flex-col items-center justify-center mt-[43px] min-h-[500px]">
          <EmptyState message={"아직 등록한 체험이 없어요"} />
        </div>
      )}
    </>
  );
}
