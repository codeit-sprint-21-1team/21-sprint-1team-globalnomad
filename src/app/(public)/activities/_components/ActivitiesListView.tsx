import type { ReactNode } from "react";
import { ActivityItem } from "@/types/activities";
import EmptyState from "@/components/ui/EmptyState/EmptyState";
import ActivityCard from "@/components/ui/ActivityCard/ActivityCard";
import SortDropdown from "./SortDropdown";
import ActivitiesPagination from "./ActivitiesPagination";

interface ActivitiesListViewProps {
  activities: ActivityItem[];
  totalCount: number;
  totalPage: number;
  keyword?: string;
  isPending?: boolean;
  isError?: boolean;
}

export default function ActivitiesListView({
  activities,
  totalCount,
  totalPage,
  keyword,
  isPending = false,
  isError = false,
}: ActivitiesListViewProps) {
  let content: ReactNode;

  if (isPending && activities.length === 0) {
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
          {keyword ? (
            <>
              <span className="text-sky-500">&quot;{keyword}&quot;</span>에 대한
              검색 결과
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
