"use client";

import { cn } from "@/commons/utils/cn";
import useInfiniteScroll from "@/commons/hooks/useInfiniteScroll";
import { LabeledSelect } from "@/components/ui/Select/Select";
import type {
  ReservationMutationStatus,
  ReservationStatusFilter,
  ReservationWithUserItem,
  ReservedScheduleItem,
} from "@/types/myActivities.type";

interface ReservationDetailContentProps {
  isMutating: boolean;
  reservations: ReservationWithUserItem[];
  schedules: ReservedScheduleItem[];
  selectedScheduleId: number | null;
  selectedStatus: ReservationStatusFilter | null;
  statusLabels: Record<ReservationStatusFilter, string>;
  isDesktop: boolean;
  onScheduleSelect: (scheduleId: number) => void;
  onStatusSelect: (status: ReservationStatusFilter) => void;
  onReservationAction: (
    reservationId: number,
    status: ReservationMutationStatus,
  ) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export default function ReservationDetailContent({
  isMutating,
  reservations,
  schedules,
  selectedScheduleId,
  selectedStatus,
  statusLabels,
  isDesktop,
  onScheduleSelect,
  onStatusSelect,
  onReservationAction,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: ReservationDetailContentProps) {
  const sentinelRef = useInfiniteScroll({
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
    loading: isFetchingNextPage,
  });
  const STATUSES: ReservationStatusFilter[] = [
    "pending",
    "confirmed",
    "declined",
  ];

  const scheduleOptions = schedules.map((schedule) => ({
    value: schedule.scheduleId.toString(),
    label: `${schedule.startTime} - ${schedule.endTime}`,
  }));

  const selectedSchedule = schedules.find(
    (s) => s.scheduleId === selectedScheduleId,
  );

  return (
    <div className="flex flex-col h-full w-full gap-[30px]">
      <div className="flex w-full whitespace-nowrap border-b border-[#E0E0E5]">
        {STATUSES.map((status) => {
          const isSelected = selectedStatus === status;
          const count = selectedSchedule?.count[status] ?? 0;
          return (
            <button
              key={status}
              type="button"
              onClick={() => onStatusSelect(status)}
              className={cn(
                "flex-1 pb-3 text-center tracking-[-0.025em] transition-colors",
                isSelected
                  ? "text-[16px] font-bold text-[#3D9EF2] border-b-[2px] border-[#3D9EF2]"
                  : "text-[16px] font-medium text-[#84858C] border-b-[2px] border-transparent hover:text-[#1B1B1B]",
              )}
            >
              {statusLabels[status]} {count}
            </button>
          );
        })}
      </div>

      <div
        className={cn(
          "flex w-full",
          isDesktop ? "flex-col gap-[30px]" : "flex-col md:flex-row gap-[30px]",
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-3",
            isDesktop ? "w-full" : "w-full md:w-1/2",
          )}
        >
          <div className="text-[18px] font-bold text-[#1B1B1B] tracking-[-0.025em]">
            예약 시간
          </div>
          {schedules.length === 0 ? (
            <p className="text-[16px] font-medium text-[#84858C] py-2 tracking-[-0.025em]">
              선택한 날짜에 조회 가능한 스케줄이 없어요.
            </p>
          ) : (
            <LabeledSelect
              items={scheduleOptions}
              value={selectedScheduleId?.toString() ?? ""}
              onValueChange={(val) => onScheduleSelect(Number(val))}
              placeholder="예약 시간을 선택해주세요"
              className="text-[16px] font-medium text-[#1F1F22] h-[54px] rounded-[16px] border-[#E0E0E5]"
            />
          )}
        </div>

        <div
          className={cn(
            "flex flex-col gap-3",
            isDesktop ? "w-full" : "w-full md:w-1/2",
          )}
        >
          <div className="text-[18px] font-bold text-[#1B1B1B] tracking-[-0.025em]">
            예약 내역
          </div>
          <div className="flex flex-col gap-[14px]">
            {reservations.length === 0 ? (
              <p className="text-[16px] font-medium text-[#84858C] py-2 tracking-[-0.025em]">
                해당 스케줄/상태에 조회된 내역이 없어요.
              </p>
            ) : (
              reservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="flex flex-row justify-between rounded-[16px] border border-[#E0E0E5] bg-white px-[16px] py-[14px] items-center h-[94px]"
                >
                  <div className="flex flex-col gap-[10px] text-[#1B1B1B] tracking-[-0.025em] shrink-0">
                    <div className="flex flex-row items-center gap-[8px]">
                      <span className="text-[16px] font-bold text-[#84858C] w-[45px] leading-[19px]">
                        닉네임
                      </span>
                      <span className="text-[16px] font-medium leading-[19px]">
                        {reservation.nickname}
                      </span>
                    </div>
                    <div className="flex flex-row items-center gap-[8px]">
                      <span className="text-[16px] font-bold text-[#84858C] w-[45px] leading-[19px]">
                        인원
                      </span>
                      <span className="text-[16px] font-medium leading-[19px]">
                        {reservation.headCount}명
                      </span>
                    </div>
                    <div className="flex flex-row items-center gap-[8px]">
                      <span className="text-[16px] font-bold text-[#84858C] w-[45px] leading-[19px]">
                        금액
                      </span>
                      <span className="text-[16px] font-medium leading-[19px]">
                        {reservation.totalPrice.toLocaleString()}원
                      </span>
                    </div>
                  </div>

                  {/* Actions / Badges right side */}
                  <div className="flex flex-col gap-[8px] shrink-0 justify-center items-end h-full">
                    {selectedStatus === "pending" && (
                      <>
                        <button
                          type="button"
                          disabled={isMutating}
                          onClick={() =>
                            onReservationAction(reservation.id, "confirmed")
                          }
                          className="flex h-[29px] w-[68px] items-center justify-center rounded-[8px] border border-[#EDEEF2] bg-white text-[14px] font-medium tracking-[-0.025em] text-[#707177] transition-colors hover:bg-gray-50 disabled:opacity-50"
                        >
                          승인하기
                        </button>
                        <button
                          type="button"
                          disabled={isMutating}
                          onClick={() =>
                            onReservationAction(reservation.id, "declined")
                          }
                          className="flex h-[29px] w-[68px] items-center justify-center rounded-[8px] bg-[#EDEEF2] text-[14px] font-medium tracking-[-0.025em] text-[#707177] transition-colors hover:bg-[#E0E0E5] disabled:opacity-50"
                        >
                          거절하기
                        </button>
                      </>
                    )}
                    {selectedStatus === "confirmed" && (
                      <div className="flex flex-row justify-center items-center px-[8px] py-[4px] bg-[#DDF9F9] rounded-[100px]">
                        <span className="text-[13px] font-bold text-[#3D9EF2] leading-[16px] tracking-[-0.025em]">
                          예약 승인
                        </span>
                      </div>
                    )}
                    {selectedStatus === "declined" && (
                      <div className="flex flex-row justify-center items-center px-[8px] py-[4px] bg-[#FCECEA] rounded-[100px]">
                        <span className="text-[13px] font-bold text-[#F96767] leading-[16px] tracking-[-0.025em]">
                          예약 거절
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            {hasNextPage && <div ref={sentinelRef} className="h-4 w-full" />}
            {isFetchingNextPage && (
              <p className="text-center text-sm text-gray-500 py-2">
                불러오는 중...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
