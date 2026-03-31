import { useQuery } from "@tanstack/react-query";

import { getMyNotifications } from "@/apis/myNotifications.api";

export function useNotificationPolling(userId?: number) {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: getMyNotifications,
    enabled: !!userId,
    staleTime: 0,
    refetchInterval: 30000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  });
}
