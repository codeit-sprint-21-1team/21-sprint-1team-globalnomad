"use client";

import { useSearchParams } from "next/navigation";
import ActivitiesListSection from "./ActivitiesListSection";
import ActivitiesListView from "./ActivitiesListView";
import { ActivityItem } from "@/types/activities";

interface ActivitiesListSwitcherProps {
  defaultActivities: ActivityItem[];
  defaultTotalCount: number;
  defaultTotalPage: number;
}

export default function ActivitiesListSwitcher({
  defaultActivities,
  defaultTotalCount,
  defaultTotalPage,
}: ActivitiesListSwitcherProps) {
  const searchParams = useSearchParams();

  const hasCategory = !!searchParams.get("category");
  const hasKeyword = !!searchParams.get("keyword");
  const hasSort = !!searchParams.get("sort");
  const hasPage = !!searchParams.get("page");

  const hasQuery = hasCategory || hasKeyword || hasSort || hasPage;

  if (hasQuery) {
    return <ActivitiesListSection />;
  }

  return (
    <ActivitiesListView
      activities={defaultActivities}
      totalCount={defaultTotalCount}
      totalPage={defaultTotalPage}
    />
  );
}
