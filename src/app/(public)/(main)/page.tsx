import { getActivityList } from "@/apis/activities.api";
import HeroSection from "./_components/HeroSection";
import BestItemsCarousel from "./_components/BestItemsCarousel";
import AllActivitiesPreviewSection from "./_components/AllActivitiesPreviewSection";

export default async function Home() {
  const [bestResult, latestResult] = await Promise.allSettled([
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

  const topActivities =
    bestResult.status === "fulfilled" ? bestResult.value.activities : [];
  const bestActivity = topActivities[0];
  const carouselActivities = topActivities.slice(1);
  const previewActivities =
    latestResult.status === "fulfilled" ? latestResult.value.activities : [];

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
