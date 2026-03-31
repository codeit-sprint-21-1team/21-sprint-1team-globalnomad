"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { useAuth } from "@/commons/contexts/AuthContext";
import { useNotificationPolling } from "../hooks/useNotificationPolling";

export default function NotificationProvider() {
  const { user } = useAuth();
  const userId = user?.id;

  const { data, isSuccess } = useNotificationPolling(userId);

  const initializedUserId = useRef<number | null>(null);
  const lastObservedTopId = useRef<number>(0);

  useEffect(() => {
    if (!userId) {
      initializedUserId.current = null;
      lastObservedTopId.current = 0;
      return;
    }

    if (initializedUserId.current !== userId) {
      initializedUserId.current = null;
      lastObservedTopId.current = 0;
    }
  }, [userId]);

  useEffect(() => {
    if (!userId || !isSuccess || !data?.notifications) return;

    const notifications = data.notifications;
    const currentTopId = notifications[0]?.id ?? 0;

    if (initializedUserId.current === null) {
      initializedUserId.current = userId;
      lastObservedTopId.current = currentTopId;
      return;
    }

    if (currentTopId === 0) {
      return;
    }

    if (currentTopId > lastObservedTopId.current) {
      toast("새 알림이 도착했습니다.");
    }

    lastObservedTopId.current = currentTopId;
  }, [data, isSuccess, userId]);

  return null;
}
