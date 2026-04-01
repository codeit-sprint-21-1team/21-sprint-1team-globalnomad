"use client";

import Image from "next/image";
import ActionButtons from "./ActionButtons";
import { Reservation } from "@/types/myReservations.type";
import { ReservationBadge } from "./ReservationBadge";
import Link from "next/link";
import { checkIsPastDate, formatPrice } from "@/commons/utils/etcUtils";
import { cn } from "@/commons/utils/cn";

interface MyReservationItemProps extends Reservation {
  index: number;
  // now: number;
}

export default function MyReservationItem({
  id,
  activity,
  scheduleId,
  status,
  reviewSubmitted,
  totalPrice,
  headCount,
  date,
  startTime,
  endTime,
  index,
  // now,
}: MyReservationItemProps) {
  const isPast = checkIsPastDate(date);
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

      <div className="flex w-full h-[136px] md:h-[153px] xl:h-[181px] rounded-[24px] shadow-[0_4px_24px_0_rgba(156,180,202,0.2)] overflow-hidden bg-white">
        <div className="flex-1 flex flex-col p-[15px] md:p-[20px] min-w-0">
          <Link href={`/activities/${activity.id}`} className="block min-w-0">
            <ReservationBadge status={status} isPast={isPast} />
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
            <div className="mt-[8px] xl:mt-[12px] min-w-0">
              <span className="text-[16px] xl:text-lg font-extrabold text-gray-950 flex items-center gap-1 min-w-0">
                <span className="truncate">₩{formatPrice(totalPrice)}</span>
                <span className="font-medium text-[14px] text-gray-500 flex-shrink-0 whitespace-nowrap">
                  {headCount} 명
                </span>
              </span>
            </div>

            <div className="hidden xl:flex">
              <ActionButtons
                reservationId={id}
                scheduleId={scheduleId}
                status={status}
                activityId={activity.id}
                activityTitle={activity.title}
                date={date}
                startTime={startTime}
                endTime={endTime}
                totalPrice={totalPrice}
                headCount={headCount}
                reviewSubmitted={reviewSubmitted}
                // now={now}
                // TODO:: 추후 삭제
                // status={"completed"}
              />
            </div>
          </div>
        </div>

        <Link href={`/activities/${activity.id}`} className="flex-shrink-0">
          <div className="w-[100px] md:w-[130px] xl:w-[181px] h-full flex-shrink-0">
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
          scheduleId={scheduleId}
          status={status}
          activityId={activity.id}
          activityTitle={activity.title}
          date={date}
          startTime={startTime}
          endTime={endTime}
          totalPrice={totalPrice}
          headCount={headCount}
          reviewSubmitted={reviewSubmitted}
          // now={now}
          // TODO:: 추후 삭제
          // status={"completed"}
        />
      </div>
    </div>
  );
}
