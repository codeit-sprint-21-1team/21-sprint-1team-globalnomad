"use client";

import { Trash2 } from "lucide-react";
import formatDate from "@/commons/utils/formatDate";

import type { NotificationItem } from "@/types/notifications.type";

interface NotificationCardProps {
  notification: NotificationItem;
  onDelete: () => void;
  isDeleting?: boolean;
}

function getNotificationTitle(content: string) {
  if (content.includes("승인")) return "예약 승인";
  if (content.includes("거절")) return "예약 거절";
  return "알림";
}

function splitNotificationContent(content: string) {
  const match = content.match(/^(.*?)\s*(\(\d{4}-\d{2}-\d{2}.*?\))\s+(.*)$/);

  if (!match) {
    return {
      title: content,
      schedule: "",
      message: "",
    };
  }

  return {
    title: match[1],
    schedule: match[2],
    message: match[3],
  };
}

function renderMessage(message: string) {
  if (message.includes("승인")) {
    const [before, after] = message.split("승인");
    return (
      <>
        {before}
        <span className="font-semibold text-blue-500">승인</span>
        {after}
      </>
    );
  }

  if (message.includes("거절")) {
    const [before, after] = message.split("거절");
    return (
      <>
        {before}
        <span className="font-semibold text-red-500">거절</span>
        {after}
      </>
    );
  }

  return message;
}

export default function NotificationCard({
  notification,
  onDelete,
  isDeleting = false,
}: NotificationCardProps) {
  const { title, schedule, message } = splitNotificationContent(
    notification.content,
  );

  return (
    <li className="border-b border-gray-200 px-5 py-3 last:border-b-0">
      <div className="mb-1.5 flex items-start justify-between gap-4">
        <p className="text-[16px] font-bold text-[#222222]">
          {getNotificationTitle(notification.content)}
        </p>

        <div className="flex items-center gap-1">
          <span className="shrink-0 text-sm text-gray-500">
            {formatDate(notification.createdAt)}
          </span>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="알림 삭제"
            disabled={isDeleting}
            onClick={(event) => {
              event.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-0.5 text-[15px] leading-6 text-[#3B3B3B]">
        <p>{title}</p>
        {schedule ? <p>{schedule}</p> : null}
        {message ? <p>{renderMessage(message)}</p> : null}
      </div>
    </li>
  );
}
