"use client";

import Image from "next/image";
import { Activity } from "@/types/myActivities.type";
import ActionButtons from "./ActionButtons";
import Link from "next/link";
import { CATEGORY_OPTIONS } from "@/commons/consts/activities";
import { cn } from "@/commons/utils/cn";
import { formatPrice } from "@/commons/utils/etcUtils";
import { useState } from "react";
import { Star } from "lucide-react";

export default function MyActivityItem({
  id,
  title,
  price,
  bannerImageUrl,
  rating,
  reviewCount,
  category,
}: Activity) {
  const matchedCategory = CATEGORY_OPTIONS.find(
    (option) => option.label === category,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <div
      className={cn(
        "mb-4 flex justify-between w-full h-full rounded-[24px] px-[20px] py-[20px] md:px-[24px] md:py-[24px] xl:px-[30px] xl:py-[36px] shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]",
        isDeleting && "deleting-item",
      )}
    >
      <div className="flex-col w-[204px] h-auto text-gray-950 rounded-lg">
        <Link href={`/activities/${id}`}>
          <h3 className="text-[16px] xl:text-lg font-bold leading-none tracking-[-2.5%]">
            {title}
          </h3>
          <div className="flex items-center mt-[6px] xl:mt-[8px]">
            <div className="flex items-center font-medium text-[13px] xl:text-[16px] text-gray-500">
              <Star
                width={14}
                height={14}
                className="fill-current text-yellow-400 mr-[3px]"
              />
              {rating.toFixed(1)} ({reviewCount})
            </div>

            <span
              className={cn(
                "text-[10px] font-bold leading-none tracking-[-2.5%] bg-amber-300 px-[10px] py-[5px] ml-[10px] rounded-2xl",
                matchedCategory ? matchedCategory.style : "",
              )}
            >
              {category}
            </span>
          </div>

          <div className="mt-[10px] xl:mt-[12px]">
            <span className="text-[16px] xl:text-lg font-extrabold text-gray-950">
              ₩{formatPrice(price)}
              <span className="font-medium text-[16px] leading-none tracking-[-2.5%] text-gray-500">
                / 인
              </span>
            </span>
          </div>
        </Link>

        <div className="flex mt-[12px] xl:mt-[20px]">
          <ActionButtons activityId={id} onDeleting={setIsDeleting} />
        </div>
      </div>

      <Link href={`/activities/${id}`}>
        <div className="flex w-[82px] h-[82px] md:w-[142px] md:h-[142px] xl:w-[142px] xl:h-[142px] gap-1">
          <Image
            src={bannerImageUrl}
            alt={title}
            unoptimized
            width={142}
            height={142}
            className="object-cover w-full h-full rounded-[32px]"
          />
        </div>
      </Link>
    </div>
  );
}
