import { useQueries } from "@tanstack/react-query";
import { getMyActivityList } from "@/apis/myActivities.api";
import { getMyReservationList } from "@/apis/myReservations.api";
import calculateLevel from "@/app/mypage/_libs/calculateLevel";

export function useUserBadge() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["myActivities", "badge"],
        queryFn: () => getMyActivityList({ cursorId: null }),
        staleTime: 0,
      },
      {
        queryKey: ["myReservations", "badge"],
        queryFn: () => getMyReservationList({ cursorId: null }),
        staleTime: 0,
      },
    ],
  });

  const isLoading = results.some((result) => result.isLoading);
  const [reviewQuery, activityQuery] = results;
  const totalCount =
    (reviewQuery.data?.totalCount || 0) + (activityQuery.data?.totalCount || 0);

  const { badgeLevel, badgeName } = calculateLevel(totalCount);

  return { badgeLevel, badgeName, isLoading };
}
