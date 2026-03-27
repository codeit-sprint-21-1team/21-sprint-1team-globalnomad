export const revalidate = 60;

import type { Metadata } from "next";
import { ActivityHeader } from "./_components/ActivityHeader";
import { BannerImages } from "./_components/BannerImages";
import { Description } from "./_components/Description";
import KakaoMap from "./_components/KakaoMap";
import { ReviewCardList } from "./_components/ReviewCardList";
import { ReservationCalendar } from "./_components/ReservationCalendar/ReservationCalendar";
import { getActivityDetail, getActivityReviews } from "@/apis/activities.api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { UpwardPanel } from "./_components/UpwardPanel/UpwardPanel";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const activityId = Number(id);
  const activity = await getActivityDetail(activityId);

  return {
    title: activity.title,
    description: activity.description.slice(0, 150),
    openGraph: {
      title: activity.title,
      description: activity.description,
      images: [activity.bannerImageUrl],
    },
  };
}

export default async function ActivityDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page: pageParam } = await searchParams;
  const activityId = Number(id);
  const page = Number(pageParam) || 1;

  const fetchData = async () => {
    try {
      const [activity, queryClient] = await Promise.all([
        getActivityDetail(activityId),
        (async () => {
          const qc = new QueryClient({
            defaultOptions: { queries: { staleTime: 60 * 1000 } },
          });
          await qc.prefetchQuery({
            queryKey: ["activity-reviews", activityId, page],
            queryFn: () => getActivityReviews(activityId, page),
          });
          return qc;
        })(),
      ]);

      if (!activity) return null;
      return { activity, queryClient };
    } catch {
      return null;
    }
  };

  const data = await fetchData();

  if (!data) notFound();
  const { activity, queryClient } = data;

  return (
    <div className="mt-6 md:mt-10 xl:mt-15 px-4 md:px-5 xl:px-0 xl:w-[1120px]  mx-auto grid grid-cols-1 xl:grid-rows-[400px] xl:grid-cols-[670px_410px] xl:gap-x-10">
      <div className="xl:col-start-1">
        <BannerImages
          mainImageUrl={activity.bannerImageUrl}
          subImages={activity.subImages}
        />
      </div>

      <div className="xl:col-start-2 xl:row-span-2 flex items-center justify-start flex-col ">
        <ActivityHeader activity={activity} />

        <div className="hidden xl:block mt-8 w-full">
          <ReservationCalendar activityId={activityId} price={activity.price} />
        </div>
      </div>

      <div className="xl:col-start-1 flex flex-col self-start">
        <Description content={activity.description} />

        <KakaoMap address={activity.address} title={activity.title} />

        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={null}>
            <ReviewCardList activityId={activityId} />
          </Suspense>
        </HydrationBoundary>
      </div>

      <UpwardPanel price={activity.price} activityId={activityId} />
    </div>
  );
}
