"use client";

import { useQueries } from "@tanstack/react-query";
import { getMyActivityList } from "@/apis/myActivities.api";
import { getMyReservationList } from "@/apis/myReservations.api";

export function useNomadReport() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["myReservation", "nomadReport"],
        queryFn: () => getMyReservationList({ cursorId: null, size: 50 }),
        staleTime: Infinity,
        gcTime: 1000 * 60 * 5,
      },
      {
        queryKey: ["myActivities", "nomadReport"],
        queryFn: () => getMyActivityList({ cursorId: null, size: 50 }),
        staleTime: Infinity,
        gcTime: 1000 * 60 * 5,
      },
    ],
  });

  const isLoading = results.some((result) => result.isLoading);
  const [reservationQuery, activityQuery] = results;

  return {
    reservationData: reservationQuery.data,
    activityData: activityQuery.data,
    isLoading,
  };
}
