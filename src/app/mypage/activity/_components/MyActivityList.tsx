"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getActivityList } from "@/apis/myActivities.api";
import MyActivityItem from "./MyActivityItem";
import MyActivitySkeleton from "./MyActivitySkeleton";
import useInfiniteScroll from "@/commons/hooks/useInfiniteScroll";
import EmptyState from "@/components/ui/EmptyState/EmptyState";

export default function MyActivityList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["myActivities"],
    queryFn: ({ pageParam }) => getActivityList({ cursorId: pageParam }),
    select: (data) => {
      if (!data) return data;
      return {
        ...data,
        activities: [],
      };
    },
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

  return (
    <>
      {isLoading && (
        <div className="flex flex-col gap-4">
          <MyActivitySkeleton count={5} />
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center mt-[60px]">
          <EmptyState message={"데이터 로드 중 에러가 발생했습니다."} />
        </div>
      )}

      {allActivities.length > 0 && (
        <div className="flex flex-col gap-4">
          {allActivities.map((activity) => (
            <MyActivityItem key={activity.id} {...activity} />
          ))}

          {isFetchingNextPage && <MyActivitySkeleton count={5} />}

          <div ref={targetRef} className="h-10" />
        </div>
      )}

      {isEmpty && (
        <div className="flex flex-col items-center justify-center mt-[60px]">
          <EmptyState message={"아직 등록한 체험이 없어요"} />
        </div>
      )}
    </>
  );
}
