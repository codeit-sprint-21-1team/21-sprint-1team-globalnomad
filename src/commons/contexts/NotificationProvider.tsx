// components/NotificationProvider.tsx
"use client";

import { useEffect, useRef } from "react";
import { useNotificationPolling } from "../hooks/useNotificationPolling";
import { useAuth } from "@/commons/contexts/AuthContext";
import { NotificationItem } from "@/types/notifications.type";

export default function NotificationProvider() {
  const { user } = useAuth();
  const userId = user?.id;

  // React Query 폴링 실행
  const { data, isSuccess, isFetching } = useNotificationPolling(userId);

  // 이미 확인한 알림 ID들을 추적하는 Set
  const knownIds = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (isSuccess && data?.notifications) {
      const currentNotifications: NotificationItem[] = data.notifications;

      console.log(
        `[Polling] ${new Date().toLocaleTimeString()} - 데이터 수신: ${currentNotifications.length}개`,
      );

      if (knownIds.current.size === 0 && currentNotifications.length > 0) {
        currentNotifications.forEach((n) => knownIds.current.add(n.id));
        console.log("알림 초기화 완료 (기존 알림들은 무시)");
        return;
      }

      // 2. 신규 알림 감지 로직
      currentNotifications.forEach((notification) => {
        if (!knownIds.current.has(notification.id)) {
          console.warn(" [신규 알림 발생]", {
            id: notification.id,
            content: notification.content,
            time: notification.createdAt,
          });

          // 확인한 목록에 추가하여 중복 출력 방지
          knownIds.current.add(notification.id);
        }
      });
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isFetching) {
      console.log("서버에서 최신 알림 정보를 가져오는 중");
    }
  }, [isFetching]);

  return null;
}
