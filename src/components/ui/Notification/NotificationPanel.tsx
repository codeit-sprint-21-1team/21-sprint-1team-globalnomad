"use client";

import { X } from "lucide-react";

import type { NotificationItem } from "@/types/notifications.type";

interface NotificationPanelProps {
  totalCount: number;
  notifications: NotificationItem[];
  onClose: () => void;
  onDelete: (notificationId: number) => void;
  deletingId?: number;
}

import NotificationCard from "./NotificationCard";

export default function NotificationPanel({
  totalCount,
  notifications,
  onClose,
  onDelete,
  deletingId,
}: NotificationPanelProps) {
  return (
    <div className="overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">
        <h3 className="text-[18px] font-bold text-[#222222]">
          알림 {totalCount}개
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 text-gray-600 transition hover:bg-gray-100"
          aria-label="알림 닫기"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="px-5 py-8 text-center text-sm text-gray-500">
          새로운 알림이 없습니다.
        </div>
      ) : (
        <div className="max-h-[420px] overflow-y-auto">
          <ul>
            {notifications.map((notification: NotificationItem) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onDelete={() => onDelete(notification.id)}
                isDeleting={deletingId === notification.id}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
