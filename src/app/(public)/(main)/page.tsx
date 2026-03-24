import { getActivityList } from "@/apis/activities.api";
import HeroSection from "./_components/HeroSection";

export default async function Home() {
  const bestResponse = await getActivityList({
    method: "offset",
    sort: "most_reviewed",
    size: 1,
  });

  const bestActivity = bestResponse.activities[0];

  return (
    <div className="bg-gray-50 pb-20">
      <section className="mx-auto max-w-300 px-6 pt-4 sm:pt-6">
        <HeroSection bestActivity={bestActivity} />
      </section>
    </div>
  );
}
