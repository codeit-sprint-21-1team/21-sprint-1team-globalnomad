import { MapPin, Star, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/Buttons/Button";
import type { Activity } from "@/types/activities";

interface ActivityHeaderProps {
  activity: Activity;
}

export function ActivityHeader({ activity }: ActivityHeaderProps) {
  return (
    <div className="w-full pb-5 border-b border-gray-200 mt-5 md:mt-6 xl:mt-0">
      <div className="flex items-start  justify-between">
        <span className="text-[13px] md:text-[14px] text-gray-600">
          {activity.category}
        </span>
        <EllipsisVertical />
      </div>

      <h1 className=" text-[18px] md:text-[24px]  font-bold text-gray-950 leading-tight">
        {activity.title}
      </h1>

      <div className="mt-3 flex flex-col gap-1 flex-wrap text-[14px] text-gray-600 font-medium">
        <div className="flex items-center gap-1 justify-start">
          <Star size={16} className="fill-yellow-500 text-yellow-500" />
          <span>{activity.rating}</span>
          <span>({activity.reviewCount})</span>
        </div>

        <div className="flex items-center gap-1 justify-start">
          <MapPin size={16} />
          <span>{activity.address}</span>
        </div>
      </div>
    </div>
  );
}
