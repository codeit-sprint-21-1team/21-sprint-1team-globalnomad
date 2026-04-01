"use client";

import { patchCancelMyReservation } from "@/apis/myReservations.api";
import { Button } from "@/components/ui/Buttons/Button";
import { useDialog } from "@/components/ui/Dialog";
import { useModal } from "@/components/ui/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReviewForm from "./ReviewForm";
import { useMoveAndScroll } from "@/commons/hooks/useMoveAndScroll";
import { AxiosError } from "axios";
import { MyReservationEdit } from "./MyReservationEdit";
import { checkIsPastDate } from "@/commons/utils/etcUtils";

export default function ActionButtons({
  reservationId,
  scheduleId,
  status,
  activityId,
  activityTitle,
  date,
  startTime,
  endTime,
  totalPrice,
  headCount,
  reviewSubmitted,
  // now,
}: {
  reservationId: number;
  scheduleId: number;
  status: string;
  activityId: number;
  activityTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  headCount: number;
  reviewSubmitted: boolean;
  // now: number;
}) {
  const queryClient = useQueryClient();
  const { showModal, onClose } = useModal();
  const { showDialog } = useDialog();
  const { moveToBottom } = useMoveAndScroll();

  const isPast = checkIsPastDate(date);

  // TODO:: 추후 삭제
  // status = "completed"; // test
  // console.log("resevationActionButtons status::", status);
  // console.log("user status::", user);

  const cancelMutation = useMutation({
    mutationFn: () =>
      patchCancelMyReservation({
        reservationId,
        updateData: { status: "canceled" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myReservations"] });
    },

    // TODO:: 에러 처리
    onError: (error: AxiosError<{ message: string }>) => {
      console.error("취소 에러:", error);
      showDialog({
        type: "alert",
        content:
          error.response?.data?.message ||
          error.message ||
          "오류가 발생했습니다",
      });
    },
  });

  const handleChange = async () => {
    showModal(
      <MyReservationEdit
        activityId={activityId}
        price={totalPrice / headCount}
        initialData={{
          reservationId: reservationId,
          scheduleId: scheduleId,
          headcount: headCount,
          date: date,
        }}
        onClose={onClose}
      />,
    );
  };

  const handleCancel = async () => {
    showDialog({
      type: "confirm",
      content: "정말로 취소하시겠습니까?",
      onConfirm: () => {
        cancelMutation.mutate();
      },
    });
  };

  const handleCreateReview = () => {
    showModal(
      <div className="flex w-[307px] h-[481px] items-center justify-center">
        <ReviewForm
          reservationId={reservationId}
          activityId={activityId}
          activityTitle={activityTitle}
          date={date}
          startTime={startTime}
          endTime={endTime}
          headCount={headCount}
          onClose={onClose}
        />
      </div>,
    );
  };

  const handleReviewGo = () => {
    moveToBottom(`/activities/${activityId}`);
  };

  return (
    <>
      {status === "completed" &&
        (!reviewSubmitted ? (
          <Button
            variant="default"
            onClick={handleCreateReview}
            className="w-full h-[37px] xl:w-[75px] xl:h-[29px] rounded-[8px] bg-[#3D9EF2] px-[10px] py-[6px] font-medium text-[14px] leading-none tracking-[-2.5%] text-white"
          >
            후기 작성
          </Button>
        ) : (
          <Button
            variant="default"
            onClick={handleReviewGo}
            className="w-full h-[37px] xl:w-[75px] xl:h-[29px] rounded-[8px] bg-[#733df2] border-[#733df2] px-[10px] py-[6px] font-medium text-[14px] leading-none tracking-[-2.5%] text-white"
          >
            후기 보기
          </Button>
        ))}

      {status === "pending" && !isPast && (
        <div className="flex w-full">
          <Button
            onClick={handleChange}
            className="w-[48.5%] h-[37px] xl:w-[75px] xl:h-[29px] xl:text-[14px] border border-[#EDEEF2] rounded-[8px] bg-white px-[10px] py-[6px] font-medium text-[14px] leading-none tracking-[-2.5%] text-gray-600"
          >
            예약 변경
          </Button>
          <Button
            onClick={handleCancel}
            disabled={cancelMutation.isPending}
            className="w-[48.5%] h-[37px] xl:w-[75px] xl:h-[29px] rounded-[8px] border-0 bg-[#EDEEF2] px-[10px] py-[6px] font-medium text-[14px] leading-none tracking-[-2.5%] text-gray-600 ml-[15px]"
          >
            예약 취소
          </Button>
        </div>
      )}
    </>
  );
}
