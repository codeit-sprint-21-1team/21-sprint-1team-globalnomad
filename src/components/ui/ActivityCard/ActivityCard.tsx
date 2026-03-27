import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

interface ActivityCardProps {
  data: {
    id: number;
    image: string;
    rating: number;
    reviewCount: number;
    title: string;
    price: number;
  };
}

export default function ActivityCard({ data }: ActivityCardProps) {
  return (
    <Link href={`/activities/${data.id}`} className="group block w-full">
      <article className="w-full cursor-pointer">
        <div className="relative flex h-60 flex-col overflow-hidden rounded-2xl md:h-96 md:rounded-3xl">
          <div className="relative h-44 w-full overflow-hidden rounded-t-2xl md:h-80 md:rounded-t-3xl">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>

          <div className="relative -mt-8 flex h-24 flex-col gap-2 rounded-2xl bg-white px-4 py-4 md:-mt-14 md:h-32 md:gap-4 md:rounded-3xl md:px-7 md:py-5">
            <div className="flex flex-col gap-1">
              <h3 className="truncate text-sm font-semibold leading-tight tracking-tight text-gray-950 md:text-lg md:leading-tight">
                {data.title}
              </h3>

              <div className="flex items-center gap-1">
                <Star
                  className="size-3 fill-[#FFC23D] text-[#FFC23D] md:size-5"
                  strokeWidth={1.8}
                />
                <div className="flex items-center gap-0.5 text-xs font-medium text-gray-950 md:text-sm">
                  <span>{data.rating.toFixed(1)}</span>
                  <span className="text-gray-400">
                    ({data.reviewCount.toLocaleString()})
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-sm font-bold text-gray-950 md:text-lg">
                ₩ {data.price.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-gray-400 md:text-base">
                / 인
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
