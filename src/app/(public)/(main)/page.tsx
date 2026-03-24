import { randomInt } from "node:crypto";
import { getActivityList } from "@/apis/activities.api";
import HeroSection from "./_components/HeroSection";
import BestItemsCarousel from "./_components/BestItemsCarousel";
import AllActivitiesPreviewSection from "./_components/AllActivitiesPreviewSection";

export default async function Home() {
  const [bestResponse, latestResponse] = await Promise.all([
    getActivityList(
      {
        method: "offset",
        sort: "most_reviewed",
        size: 13,
      },
      {
        revalidate: 3600,
        tags: ["best-activities"],
      },
    ),
    getActivityList(
      {
        method: "offset",
        sort: "latest",
        size: 8,
      },
      {
        revalidate: 3600,
        tags: ["latest-activities"],
      },
    ),
  ]);

  const topActivities = bestResponse.activities;
  const heroIndex = randomInt(topActivities.length || 1);
  const bestActivity = topActivities[heroIndex];
  const carouselActivities = topActivities.filter(
    (activity) => activity.id !== bestActivity?.id,
  );
  const previewActivities = latestResponse.activities;

  return (
    <main className="hero-section pb-20">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 pt-4 sm:gap-16 sm:pt-6">
        <HeroSection bestActivity={bestActivity} />
        <BestItemsCarousel activities={carouselActivities} />
        <AllActivitiesPreviewSection activities={previewActivities} />
      </div>
    </main>
  );
}
