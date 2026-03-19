import Image from "next/image";

interface ActivityCardProps {
  data: {
    image: string;
    rating: number;
    reviewCount: number;
    title: string;
    price: number;
  };
}

export default function ActivityCard({ data }: ActivityCardProps) {
  return (
    <div className="group w-full cursor-pointer">
      <div className={`relative overflow-hidden rounded-3xl aspect-square`}>
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-3 flex flex-col gap-1.5">
        <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
          <span className="text-yellow-400">★</span>
          <span>{data.rating}</span>
          <span className="font-medium text-gray-400">
            ({data.reviewCount})
          </span>
        </div>

        <h3 className="line-clamp-2 min-h-[52px] text-lg font-bold text-gray-900 leading-tight">
          {data.title}
        </h3>
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold text-gray-900">
            ₩ {data.price.toLocaleString()}
          </span>
          <span className="text-sm font-medium text-gray-500">/ 인</span>
        </div>
      </div>
    </div>
  );
}
