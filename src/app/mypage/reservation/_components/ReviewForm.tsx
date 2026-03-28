"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postRiviewMyReservation } from "@/apis/myReservations.api";
import { Button } from "@/components/ui/Buttons/Button";
import { CreateReviewRequest } from "@/types/myReservations.type";
import { useDialog } from "@/components/ui/Dialog";
import { Star } from "lucide-react";
import axios from "axios";

interface ReviewFormProps {
  reservationId: number;
  activityId: number;
  activityTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
  onClose: () => void;
}

export default function ReviewForm({
  reservationId,
  activityId,
  activityTitle,
  date,
  startTime,
  endTime,
  headCount,
  onClose,
}: ReviewFormProps) {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(1);
  const [content, setContent] = useState("");
  const { showDialog } = useDialog();
  const [errorContent, setErrorContent] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: (reviewData: CreateReviewRequest) =>
      postRiviewMyReservation({ reservationId, reviewData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myReservations"] });
      queryClient.invalidateQueries({
        queryKey: ["activity-reviews", activityId],
      });
      onClose();
    },

    // TODO:: 에러 처리
    onError: (error) => {
      console.error("리뷰등록 에러:", error);
      let message = "리뷰 등록 중 오류가 발생했습니다.";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      showDialog({
        type: "alert",
        content: message,
      });
    },
  });

  const handleSubmit = () => {
    if (content.trim().length < 5) {
      setErrorContent("최소 5자 이상 작성해주세요.");
      return;
    }
    mutate({ rating, content });
  };

  return (
    <div className="w-full">
      <div className="">
        <h2 className="text-[16px] font-bold text-center text-[#112211]">
          {activityTitle}
        </h2>
        <p className="text-[14px] text-center font-medium text-[#84858C]">
          {date.replace(/-/g, ". ")} / {startTime} - {endTime} ({headCount}명)
        </p>
      </div>
      <div className="flex justify-center gap-2 mt-[14px] mb-[30px]">
        {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => setRating(num)}
            className={`text-4xl ${num <= rating ? "text-yellow-400" : "text-gray-200"}`}
          >
            <Star width={42} height={42} className="fill-current" />
          </button>
        ))}
      </div>

      <div className="text-[18px] font-bold text-black] mb-[16px]">
        소중한 경험을 들려주세요
      </div>
      <div>
        <textarea
          className="w-full h-[179px] p-[20px] border border-gray-200 rounded-lg resize-none focus:ring-1 focus:ring-[#3D9EF2] outline-none text-[14px]"
          placeholder="체험에서 느낀 경험을 자유롭게 남겨주세요"
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, 100))}
        />
      </div>
      <div className="flex justify-between items-start">
        {errorContent && content.length >= 0 && content.length < 5 && (
          <p className="text-red-500 text-[12px] font-medium">{errorContent}</p>
        )}
        <p className="ml-auto bottom-3 text-[14px] text-gray-400">
          {content.length}/100
        </p>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isPending}
        className="w-full h-12 bg-[#3D9EF2] text-white font-bold rounded-lg hover:bg-[#2b8cd9] mt-[30px]"
      >
        {isPending ? "등록 중..." : "작성하기"}
      </Button>
    </div>
  );
}
