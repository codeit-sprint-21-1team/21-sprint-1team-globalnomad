"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel/Carousel";
import ActivityCard from "@/components/ui/ActivityCard/ActivityCard";
import EmptyState from "@/components/ui/EmptyState/EmptyState";
import type { ActivityListItem } from "@/types/activities";

interface BestItemsCarouselProps {
  activities: ActivityListItem[];
}

export default function BestItemsCarousel({
  activities,
}: BestItemsCarouselProps) {
  return (
    <section className="w-full">
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          🔥 인기 체험
        </h2>
      </div>

      {activities.length === 0 ? (
        <div className="flex min-h-[220px] items-center justify-center px-6 py-10">
          <EmptyState message="등록된 인기체험이 없습니다." />
        </div>
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: false,
            dragFree: true,
            breakpoints: {
              "(min-width: 768px)": { dragFree: false },
            },
          }}
          className="relative w-full"
        >
          <CarouselContent className="-ml-4">
            {activities.map((activity) => (
              <CarouselItem
                key={activity.id}
                className="pl-4 basis-[40%] md:basis-1/2 lg:basis-1/4"
              >
                <ActivityCard
                  data={{
                    id: activity.id,
                    image: activity.bannerImageUrl,
                    rating: activity.rating,
                    reviewCount: activity.reviewCount,
                    title: activity.title,
                    price: activity.price,
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="absolute -left-2 top-1/2 z-10 size-[54px] -translate-y-1/2 bg-white/90 shadow-lg hover:bg-white lg:-left-6" />
            <CarouselNext className="absolute -right-2 top-1/2 z-10 size-[54px] -translate-y-1/2 bg-white/90 shadow-lg hover:bg-white lg:-right-6" />
          </div>
        </Carousel>
      )}
    </section>
  );
}
