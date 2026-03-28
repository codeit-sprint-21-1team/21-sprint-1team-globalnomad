"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getActivityList } from "@/apis/activities.api";
import ActivitiesListView from "./ActivitiesListView";
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

  return (
    <ActivitiesListView
      activities={activities}
      totalCount={totalCount}
      totalPage={totalPage}
      keyword={queryParams.keyword}
      isPending={isPending}
      isError={isError}
    />
  );
}
