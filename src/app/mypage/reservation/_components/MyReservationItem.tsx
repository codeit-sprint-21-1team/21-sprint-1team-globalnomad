"use client";

import Image from "next/image";
import ActionButtons from "./ActionButtons";
import { Reservation } from "@/types/myReservations.type";
import { ReservationBadge } from "./ReservationBadge";
import Link from "next/link";
import { formatPrice } from "@/commons/utils/etcUtils";
import { cn } from "@/commons/utils/cn";

interface MyReservationItemProps extends Reservation {
  index: number;
}

export default function MyReservationItem({
  id,
  activity,
  status,
  reviewSubmitted,
  totalPrice,
  headCount,
  date,
  startTime,
  endTime,
  index,
}: MyReservationItemProps) {
  return (
    <div
      className={cn(
        "flex flex-col w-full md:w-full xl:w-full gap-[12px] mb-[30px]",
      )}
    >
      <div
        className={`xl:hidden font-bold text-[16px] pt-[20px] ${index === 0 ? "border-t-0" : "border-t-1 border-gray-200"}`}
      >
        {date}
      </div>

      <div className="relative w-full h-[136px] md:h-[153px] xl:h-[181px] rounded-[24px] shadow-[0_4px_24px_0_rgba(156,180,202,0.2)] overflow-hidden bg-white">
        <div
          className={cn(
            "absolute left-0 top-0 z-10 flex flex-col",
            "w-[calc(100%-98px)] md:w-[calc(100%-130px)] xl:w-[calc(100%-155px)]",
            "h-full text-gray-950 rounded-[24px] bg-white p-[20px]",
          )}
        >
          <Link href={`/activities/${activity.id}`}>
            <ReservationBadge status={status} />
            <h3 className="text-[16px] truncate xl:text-lg font-bold leading-none tracking-[-2.5%] mt-[8px]">
              {activity.title}
            </h3>
            <div className="flex items-center mt-[4px] xl:mt-[8px]">
              <div className="flex items-center font-medium text-[13px] xl:text-[16px] text-gray-500">
                <span className="hidden xl:block">
                  {date}
                  <span className="px-[8px]">·</span>
                </span>{" "}
                <span>
                  {startTime} - {endTime}
                </span>
              </div>
            </div>
          </Link>

          <div className="flex justify-between items-end mt-auto">
            <div className="mt-[8px] xl:mt-[12px]">
              <span className="text-[16px] xl:text-lg font-extrabold text-gray-950">
                <span className="w-[100px] truncate">
                  ₩{formatPrice(totalPrice)}
                </span>
                <span className="font-medium text-[16px] leading-none tracking-[-2.5%] text-gray-500 ml-1">
                  {headCount} 명
                </span>
              </span>
            </div>

            <div className="hidden xl:flex">
              <ActionButtons
                reservationId={id}
                status={status}
                activityId={activity.id}
                activityTitle={activity.title}
                date={date}
                startTime={startTime}
                endTime={endTime}
                headCount={headCount}
                reviewSubmitted={reviewSubmitted}
                // TODO:: 추후 삭제
                // status={"completed"}
              />
            </div>
          </div>
        </div>

        <Link href={`/activities/${activity.id}`}>
          <div className="absolute right-0 top-0 w-[136px] h-[136px] md:w-[153px] md:h-[153px] xl:w-[181px] xl:h-[181px]">
            <Image
              src={activity.bannerImageUrl}
              alt={activity.title}
              unoptimized
              width={181}
              height={181}
              className="object-cover w-full h-full rounded-r-[24px]"
            />
          </div>
        </Link>
      </div>

      <div className="flex xl:hidden justify-end">
        <ActionButtons
          reservationId={id}
          status={status}
          activityId={activity.id}
          activityTitle={activity.title}
          date={date}
          startTime={startTime}
          endTime={endTime}
          headCount={headCount}
          reviewSubmitted={reviewSubmitted}
          // TODO:: 추후 삭제
          // status={"completed"}
        />
      </div>
    </div>
  );
}
