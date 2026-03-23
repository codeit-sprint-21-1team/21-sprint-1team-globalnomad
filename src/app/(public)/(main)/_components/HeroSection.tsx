import Image from "next/image";
import Link from "next/link";
import type { ActivityListItem } from "@/types/activities";

interface HeroSectionProps {
  bestActivity: ActivityListItem | undefined;
}

export default function HeroSection({ bestActivity }: HeroSectionProps) {
  if (!bestActivity)
    return (
      <div className="h-[240px] w-full animate-pulse rounded-xl bg-gray-200" />
    );

  const month = new Date(bestActivity.createdAt).getMonth() + 1;

  return (
    <Link href={`/activities/${bestActivity.id}`}>
      <section className="group relative h-[180px] w-full overflow-hidden rounded-xl sm:h-[375px] md:h-[500px]">
        <Image
          src={bestActivity.bannerImageUrl}
          alt={bestActivity.title}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
          <h1 className="mb-2 text-2xl font-bold leading-tight drop-shadow-lg sm:text-4xl md:text-6xl lg:mb-4 lg:text-[68px]">
            {bestActivity.title}
          </h1>
          <p className="text-sm font-semibold tracking-wide drop-shadow-md sm:text-xl md:text-2xl">
            {month}월의 인기 체험 BEST 🔥
          </p>
        </div>
      </section>
    </Link>
  );
}
