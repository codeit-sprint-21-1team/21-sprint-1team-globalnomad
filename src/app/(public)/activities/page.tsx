export const revalidate = 60;

import { Suspense } from "react";
import { getActivityList } from "@/apis/activities.api";
import SearchBar from "./_components/SearchBar";
import CategoryFilter from "./_components/CategoryFilter";
import ActivitiesListSwitcher from "./_components/ActivitiesListSwitcher";

type ActivitiesSearchParams = {
  category?: string;
  keyword?: string;
  sort?: string;
  page?: string;
};

interface ActivitiesPageProps {
  searchParams: Promise<ActivitiesSearchParams>;
}

export default async function ActivitiesPage({}: ActivitiesPageProps) {
  const data = await getActivityList({
    method: "offset",
    size: 10,
  });

  const activities = data.activities;
  const totalCount = data.totalCount;
  const totalPage = Math.ceil(totalCount / 10);

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 py-10 sm:gap-12 sm:py-16">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        🎡 모든 체험
      </h1>

      <section className="w-full">
        <Suspense fallback={null}>
          <SearchBar />
        </Suspense>
      </section>

      <div className="flex flex-col gap-6">
        <section className="flex w-full items-center justify-between gap-4">
          <Suspense fallback={null}>
            <CategoryFilter />
          </Suspense>
        </section>

        <Suspense fallback={null}>
          <ActivitiesListSwitcher
            defaultActivities={activities}
            defaultTotalCount={totalCount}
            defaultTotalPage={totalPage}
          />
        </Suspense>
      </div>
    </div>
  );
}
