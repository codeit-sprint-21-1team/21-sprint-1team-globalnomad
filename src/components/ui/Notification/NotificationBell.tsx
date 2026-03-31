"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "../Buttons/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../Dropdown/DropdownMenu";
import NotificationPanel from "./NotificationPanel";

import { useAuth } from "@/commons/contexts/AuthContext";
import { useNotificationPolling } from "@/commons/hooks/useNotificationPolling";

import { deleteMyNotification } from "@/apis/myNotifications.api";

const STORAGE_KEY = "last-seen-notification-id";

function getStorageKey(userId?: number) {
  return `${STORAGE_KEY}-${userId}`;
}

function getLastSeenId(userId?: number) {
  if (typeof window === "undefined" || !userId) return 0;

  const saved = window.localStorage.getItem(getStorageKey(userId));
  return saved ? Number(saved) : 0;
}

export default function NotificationBell() {
  const { user } = useAuth();
  const userId = user?.id;

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data } = useNotificationPolling(userId);

  const totalCount = data?.totalCount ?? 0;
  const notifications = data?.notifications ?? [];
  const latestNotificationId = notifications[0]?.id ?? 0;
  const lastSeenId = getLastSeenId(userId);

  const hasNewNotification =
    latestNotificationId > 0 && latestNotificationId > lastSeenId;

  const deleteMutation = useMutation({
    mutationFn: deleteMyNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", userId],
      });
    },
    onError: () => {
      toast.error("알림 삭제에 실패했습니다.");
    },
  });

  const markAsSeen = () => {
    if (!userId) return;

    if (!latestNotificationId || totalCount === 0) {
      window.localStorage.removeItem(getStorageKey(userId));
      return;
    }

    window.localStorage.setItem(
      getStorageKey(userId),
      String(latestNotificationId),
    );
  };

  useEffect(() => {
    if (!userId) return;

    if (totalCount === 0) {
      window.localStorage.removeItem(getStorageKey(userId));
    }
  }, [totalCount, userId]);

  if (!userId) return null;

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);

        if (nextOpen) {
          markAsSeen();
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-full"
          aria-label="알림"
        >
          <Bell className="h-5 w-5 text-[#4A4A4A]" />
          {hasNewNotification && (
            <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-[320px] rounded-2xl border border-gray-200 bg-white p-0 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
      >
        <NotificationPanel
          totalCount={totalCount}
          notifications={notifications}
          onClose={() => setOpen(false)}
          onDelete={(notificationId) => deleteMutation.mutate(notificationId)}
          deletingId={deleteMutation.variables}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
