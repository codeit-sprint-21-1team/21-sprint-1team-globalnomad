"use client";

import { deleteMyActivityItem } from "@/apis/myActivities.api";
import { useDialog } from "@/components/ui/Dialog";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ActionButtons({
  activityId,
  onDeleting,
}: {
  activityId: number;
  onDeleting: (val: boolean) => void;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showDialog } = useDialog();
  const handleDelete = async () => {
    showDialog({
      type: "confirm",
      content: "정말로 삭제하시겠습니까?",
      onConfirm: async () => {
        try {
          onDeleting(true);
          setTimeout(async () => {
            await deleteMyActivityItem({ activityId });
            queryClient.invalidateQueries({ queryKey: ["myActivities"] });
          }, 500);
          // TODO:: 에러 처리
        } catch (error) {
          onDeleting(false);
          console.error("삭제 에러:", error);
          let errorMessage = "오류가 발생했습니다";

          if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || error.message;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }

          showDialog({
            type: "alert",
            content: errorMessage,
          });
        }
      },
    });
  };

  const handleEdit = async () => {
    router.push(`/mypage/activity/edit/${activityId}`);
  };

  return (
    <>
      <button
        onClick={handleEdit}
        className="w-[70px] h-[29px] border rounded-[8px] bg-white px-[10px] py-[6px] font-medium text-[14px] leading-none tracking-[-2.5%] text-gray-600"
      >
        수정하기
      </button>
      <button
        onClick={handleDelete}
        className="w-[70px] h-[29px] rounded-[8px] bg-gray-50 px-[10px] py-[6px] font-medium text-[14px] leading-none tracking-[-2.5%] text-gray-600 ml-[8px]"
      >
        삭제하기
      </button>
    </>
  );
}
