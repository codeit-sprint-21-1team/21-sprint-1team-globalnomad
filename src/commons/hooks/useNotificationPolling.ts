import { useQuery } from "@tanstack/react-query";

import { getMyNotifications } from "@/apis/myNotifications.api";

export function useNotificationPolling(userId?: number) {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => getMyNotifications(),
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
    enabled: !!userId,
  });
}
