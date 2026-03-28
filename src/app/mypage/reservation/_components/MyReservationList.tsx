"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import MyReservationItem from "./MyReservationItem";
import MyReservationSkeleton from "./MyReservationSkeleton";
import useInfiniteScroll from "@/commons/hooks/useInfiniteScroll";
import Image from "next/image";
import { getMyReservationList } from "@/apis/myReservations.api";
import { Button } from "@/components/ui/Buttons/Button";
import { useRouter, useSearchParams } from "next/navigation";

export default function MyReservationList() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";
  const router = useRouter();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["myReservations", status],
    queryFn: ({ pageParam }) =>
      getMyReservationList({
        cursorId: pageParam,
        status: status === "all" ? undefined : status,
      }),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });

  // TODO:: 추후 삭제
  if (data) console.log("MyReservationList data:::", data);

  const handleHomeClick = () => {
    router.push("/");
  };

  const targetRef = useInfiniteScroll({
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
    loading: isFetchingNextPage,
  });

  const allReservations =
    data?.pages.flatMap((page) => page.reservations) ?? [];
  const isEmpty = !isLoading && allReservations.length === 0;

  return (
    <>
      {isLoading && (
        <div className="flex flex-col gap-4">
          <MyReservationSkeleton count={5} />
        </div>
      )}

      {isError && <p>데이터 로드 중 에러가 발생했습니다.</p>}

      {allReservations.length > 0 && (
        <div className="flex flex-col">
          {allReservations.map((reservation, i) => (
            <MyReservationItem
              key={reservation.id}
              {...reservation}
              index={i}
            />
          ))}

          {isFetchingNextPage && <MyReservationSkeleton count={5} />}

          <div ref={targetRef} className="h-10" />
          {!hasNextPage && (
            <div className="flex justify-center text-gray-400">
              더 이상 목록이 없습니다
            </div>
          )}
        </div>
      )}

      {isEmpty && (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Image
              src="/images/no_list.png"
              width={120}
              height={120}
              alt="no list img"
              className="mx-auto"
            />

            {status === "pending" && (
              <p className="text-gray-500 mt-[30px]">
                신청하신 예약이 없습니다. 새로운 체험을 찾아보세요!
              </p>
            )}
            {status === "canceled" && (
              <p className="text-gray-500 mt-[30px]">
                취소된 예약 내역이 없습니다
              </p>
            )}
            {status === "confirmed" && (
              <p className="text-gray-500 mt-[30px]">
                확정된 예약이 없습니다. 곧 좋은 소식이 있을 거예요
              </p>
            )}
            {status === "declined" && (
              <p className="text-gray-500 mt-[30px]">
                거절된 예약 내역이 없습니다
              </p>
            )}
            {status === "completed" && (
              <p className="text-gray-500 mt-[30px]">
                아직 완료된 체험이 없습니다. 첫 체험을 시작해볼까요?
              </p>
            )}

            <Button
              variant="default"
              onClick={handleHomeClick}
              className="w-[182px] h-[54px] text-white mt-[30px]"
            >
              둘러보기
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
