import { getActivityList } from "@/apis/activities.api";
import ActivityCard from "@/components/ui/ActivityCard/ActivityCard";
import type { ActivitySort } from "@/types/activities";
import SearchBar from "./_components/SearchBar";
import CategoryFilter from "./_components/CategoryFilter";
import SortDropdown from "./_components/SortDropdown";

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
  const currentPage = Number(page) || 1;
  const pageSize = 10;

  const response = await getActivityList({
    method: "offset",
    category: category || undefined,
    keyword: keyword || undefined,
    sort: sort || "latest",
    page: currentPage,
    size: pageSize,
  });

  const { activities, totalCount } = response;

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

        <section className="flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900 sm:text-xl">
            {keyword ? (
              <>
                <span className="text-[#3D9EF2]">&quot;{keyword}&quot;</span>에
                대한 검색 결과
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

        {activities.length > 0 ? (
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
        ) : (
          <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
            <p className="text-xl font-medium text-gray-500">
              검색 결과가 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
