"use client";

import type { ReactNode } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getActivityList } from "@/apis/activities.api";
import EmptyState from "@/components/ui/EmptyState/EmptyState";
import ActivityCard from "@/components/ui/ActivityCard/ActivityCard";
import ActivitiesPagination from "./ActivitiesPagination";
import SortDropdown from "./SortDropdown";
import {
  createActivitiesQueryKey,
  normalizeActivitiesParams,
} from "../_utils/activitiesQuery";

export default function ActivitiesListSection() {
  const searchParams = useSearchParams();
  const queryParams = normalizeActivitiesParams(searchParams);

  const { data, isPending, isError } = useQuery({
    queryKey: createActivitiesQueryKey(queryParams),
    queryFn: () =>
      getActivityList({
        method: "offset",
        category: queryParams.category,
        keyword: queryParams.keyword,
        sort: queryParams.sort,
        page: queryParams.page,
        size: queryParams.size,
      }),
    placeholderData: keepPreviousData,
  });

  const activities = data?.activities ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPage = Math.ceil(totalCount / queryParams.size);
  let content: ReactNode;

  if (isPending) {
    content = (
      <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
        <p className="text-xl font-medium text-gray-500">
          체험을 불러오는 중입니다...
        </p>
      </div>
    );
  } else if (isError) {
    content = (
      <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
        <EmptyState message="체험을 불러오지 못했습니다." />
      </div>
    );
  } else if (activities.length === 0) {
    content = (
      <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
        <EmptyState message="체험이 없습니다." />
      </div>
    );
  } else {
    content = (
      <>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              data={{
                id: activity.id,
                image: activity.bannerImageUrl,
                rating: activity.rating,
                reviewCount: activity.reviewCount,
                title: activity.title,
                price: activity.price,
              }}
            />
          ))}
        </div>
        {totalPage > 1 ? <ActivitiesPagination totalPage={totalPage} /> : null}
      </>
    );
  }

  return (
    <>
      <section className="flex items-center justify-between">
        <p className="text-lg font-bold text-gray-900 sm:text-xl">
          {queryParams.keyword ? (
            <>
              <span className="text-sky-500">
                &quot;{queryParams.keyword}&quot;
              </span>
              에 대한 검색 결과
            </>
          ) : (
            "전체 체험"
          )}
          <span className="ml-2 text-base font-medium text-gray-500">
            ({totalCount}개)
          </span>
        </p>
        <SortDropdown />
      </section>
      {content}
    </>
  );
}
