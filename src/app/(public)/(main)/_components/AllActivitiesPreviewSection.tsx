import Link from "next/link";
import { Button } from "@/components/ui/Buttons/Button";
import type { ActivityListItem } from "@/types/activities";
import ActivityCard from "./ActivityCard";

interface AllActivitiesPreviewSectionProps {
  activities: ActivityListItem[];
}

export default function AllActivitiesPreviewSection({
  activities,
}: AllActivitiesPreviewSectionProps) {
  if (activities.length === 0) {
    return null;
  }

  return (
    <section className="w-full">
      <div className="mb-6 flex items-center justify-between sm:mb-8">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          🎡 모든 체험
        </h2>
        <Button
          asChild
          variant="secondary"
          size="sm"
          className="w-auto px-4 text-sm"
        >
          <Link href="/activities">전체보기</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
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
    </section>
  );
}
