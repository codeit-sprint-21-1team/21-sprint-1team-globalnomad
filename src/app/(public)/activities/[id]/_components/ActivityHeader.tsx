"use client";

import { MapPin, Star } from "lucide-react";
import { useRouter } from "next/navigation";

import type { Activity } from "@/types/activities";
import Kebab from "@/components/ui/Kebab/Kebab";
import { useMutation } from "@tanstack/react-query";
import { useDialog } from "@/components/ui/Dialog";
import { useAuth } from "@/commons/contexts/AuthContext";
import { useRequireAuth } from "@/commons/hooks/useRequireAuth";
import { deleteMyActivity } from "@/apis/myActivities.api";
import { handleApiError } from "@/commons/utils/handleApiError";
import { revalidateActivityListCache } from "@/actions/activities.action";

interface ActivityHeaderProps {
  activity: Activity;
}

export function ActivityHeader({ activity }: ActivityHeaderProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { showDialog } = useDialog();
  const requireAuth = useRequireAuth();

  const { mutate: deleteActivity } = useMutation({
    mutationFn: () => deleteMyActivity(activity.id),
    onSuccess: async () => {
      await revalidateActivityListCache();
      showDialog({
        type: "alert",
        content: "삭제가 완료됐습니다.",
        onConfirm: () => router.push("/"),
      });
    },
    onError: (error) =>
      showDialog({ type: "alert", content: handleApiError(error) }),
  });

  const handleDelete = () => {
    showDialog({
      type: "confirm",
      content: "정말 삭제하시겠어요?",
      onConfirm: () => requireAuth(deleteActivity),
    });
  };

  const isOwner = !!user && user.id === activity.userId;

  const handleEdit = () => {
    router.push(`/mypage/activity/edit/${activity.id}`);
  };

  return (
    <div className="w-full pb-5 border-b border-gray-200 xl:border-none mt-5 md:mt-6 xl:mt-0">
      <div className="flex items-start  justify-between">
        <span className="text-[13px] md:text-[14px] text-gray-600">
          {activity.category}
        </span>
        {isOwner && <Kebab onEdit={handleEdit} onDelete={handleDelete} />}
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
