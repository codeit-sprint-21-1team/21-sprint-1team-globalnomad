import { randomInt } from "node:crypto";
import { getActivityList } from "@/apis/activities.api";
import HeroSection from "./_components/HeroSection";
import BestItemsCarousel from "./_components/BestItemsCarousel";

export default async function Home() {
  // Fetch best activities once and split them across both sections.
  const bestResponse = await getActivityList(
    {
      method: "offset",
      sort: "most_reviewed",
      size: 13,
    },
    {
      revalidate: 3600, // 1-hour ISR for Best items
      tags: ["best-activities"],
    },
  );

  const topActivities = bestResponse.activities;
  const heroIndex = randomInt(topActivities.length || 1);
  const bestActivity = topActivities[heroIndex];

  const carouselActivities = topActivities.filter(
    (activity) => activity.id !== bestActivity?.id,
  );

  return (
    <main className="hero-section pb-20">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 pt-4 sm:gap-16 sm:pt-6">
        <section>
          <HeroSection bestActivity={bestActivity} />
        </section>

        <section>
          <BestItemsCarousel activities={carouselActivities} />
        </section>
      </div>
    </main>
  );
}
