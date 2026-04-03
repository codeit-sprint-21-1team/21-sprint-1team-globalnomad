"use client";

import { Button } from "@/components/ui/Buttons/Button";
import type {
  ReservationMutationStatus,
  ReservationStatusFilter,
  ReservationWithUserItem,
} from "@/types/myActivities.type";

interface ReservationListPanelProps {
  isMutating: boolean;
  reservations: ReservationWithUserItem[];
  selectedStatus: ReservationStatusFilter | null;
  statusLabels: Record<ReservationStatusFilter, string>;
  onReservationAction: (
    reservationId: number,
    status: ReservationMutationStatus,
  ) => void;
}

export default function ReservationListPanel({
  isMutating,
  reservations,
  selectedStatus,
  statusLabels,
  onReservationAction,
}: ReservationListPanelProps) {
  if (!selectedStatus) {
    return null;
  }

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
      <div className="text-sm font-semibold text-[#1F1F22]">
        {statusLabels[selectedStatus]} 예약 목록
      </div>

      {reservations.length === 0 ? (
        <p className="mt-3 text-sm text-[#84858C]">
          선택한 상태의 예약 내역이 없어요.
        </p>
      ) : (
        <ul className="mt-3 space-y-3">
          {reservations.map((reservation) => (
            <li
              key={reservation.id}
              className="rounded-xl border border-gray-100 bg-[#FAFAFA] px-4 py-3"
            >
              <div>
                <div className="text-sm font-medium text-[#1F1F22]">
                  {reservation.nickname}
                </div>
                <div className="mt-1 text-sm text-[#84858C]">
                  인원 {reservation.headCount}명 / 금액{" "}
                  {reservation.totalPrice.toLocaleString()}원
                </div>
              </div>

              {selectedStatus === "pending" && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="default"
                    disabled={isMutating}
                    onClick={() =>
                      onReservationAction(reservation.id, "confirmed")
                    }
                  >
                    승인하기
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={isMutating}
                    onClick={() =>
                      onReservationAction(reservation.id, "declined")
                    }
                  >
                    거절하기
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
