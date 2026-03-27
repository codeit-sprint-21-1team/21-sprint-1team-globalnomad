import { redirect } from "next/navigation";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { ActivitySort } from "@/types/activities";
import { getActivityList } from "@/apis/activities.api";
import SearchBar from "./_components/SearchBar";
import CategoryFilter from "./_components/CategoryFilter";
import ActivitiesListSection from "./_components/ActivitiesListSection";
import {
  createActivitiesQueryKey,
  normalizeActivitiesParams,
} from "./_utils/activitiesQuery";
import { updateQueryString } from "./_utils/query";

interface ActivitiesPageProps {
  searchParams: Promise<{
    category?: string;
    keyword?: string;
    sort?: ActivitySort;
    page?: string;
  }>;
}

export default async function ActivitiesPage({
  searchParams,
}: ActivitiesPageProps) {
  const { category, keyword, sort, page } = await searchParams;
  const currentQuery = new URLSearchParams();
  const queryParams = normalizeActivitiesParams({
    category,
    keyword,
    sort,
    page,
  });

  if (category) currentQuery.set("category", category);
  if (keyword) currentQuery.set("keyword", keyword);
  if (sort) currentQuery.set("sort", sort);
  if (page) currentQuery.set("page", page);

  const canonicalQuery = updateQueryString(new URLSearchParams(), {
    category: queryParams.category || null,
    keyword: queryParams.keyword || null,
    sort: queryParams.sort,
    page: queryParams.page,
  });

  if (currentQuery.toString() !== canonicalQuery) {
    redirect(canonicalQuery ? `/activities?${canonicalQuery}` : "/activities");
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
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
  });

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 py-10 sm:gap-12 sm:py-16">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        🎡 모든 체험
      </h1>

      <section className="w-full">
        <SearchBar />
      </section>

      <div className="flex flex-col gap-6">
        <section className="flex w-full items-center justify-between gap-4">
          <CategoryFilter />
        </section>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <ActivitiesListSection />
        </HydrationBoundary>
      </div>
    </div>
  );
}
