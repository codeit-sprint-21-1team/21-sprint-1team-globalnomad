"use client";

import { useQueries } from "@tanstack/react-query";
import { getMyActivityList } from "@/apis/myActivities.api";
import { getMyReservationList } from "@/apis/myReservations.api";
import { useAuth } from "@/commons/contexts/AuthContext";
import { useMemo } from "react";
import { getActivityDetail } from "@/apis/activities.api";

export function useNomadReport() {
  const { user } = useAuth();

  const results = useQueries({
    queries: [
      {
        queryKey: ["myReservation", "nomadReport"],
        queryFn: () => getMyReservationList({ cursorId: null, size: 30 }),
        staleTime: Infinity,
        gcTime: 1000 * 60 * 5,
      },
      {
        queryKey: ["myActivities", "nomadReport"],
        queryFn: () => getMyActivityList({ cursorId: null, size: 30 }),
        staleTime: Infinity,
        gcTime: 1000 * 60 * 5,
      },
    ],
  });

  const isBaseLoading = results.some((result) => result.isLoading);
  const [reservationQuery, activityQuery] = results;

  const topReservationIds = useMemo(() => {
    const reservations = reservationQuery.data?.reservations || [];
    if (reservations.length === 0) return [];

    const countMap: Record<number, number> = {};
    reservations.forEach((item) => {
      const id = item.activity.id;
      countMap[id] = (countMap[id] || 0) + 1;
    });

    return Object.entries(countMap)
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => Number(id))
      .slice(0, 3);
  }, [reservationQuery.data]);

  const topActivityIds = useMemo(() => {
    const activities = activityQuery.data?.activities || [];
    if (activities.length === 0) return [];
    return [...activities]
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, 3)
      .map((item) => item.id);
  }, [activityQuery.data]);

  const detailResults = useQueries({
    queries: [
      ...topReservationIds.map((id) => ({
        queryKey: ["reportReservation", id],
        queryFn: () => getActivityDetail(id),
        staleTime: Infinity,
        gcTime: 1000 * 60 * 10,
        retry: false,
        enabled: !isBaseLoading,
      })),
      ...topActivityIds.map((id) => ({
        queryKey: ["reportActivity", id],
        queryFn: () => getActivityDetail(id),
        staleTime: Infinity,
        enabled: !isBaseLoading,
      })),
    ],
  });

  const isDetailLoading = detailResults.some((r) => r.isLoading);
  const isLoading = isBaseLoading || isDetailLoading;

  const validReservation = detailResults
    .slice(0, topReservationIds.length)
    .find((r) => r.isSuccess && r.data)?.data;

  const validActivity = detailResults
    .slice(topReservationIds.length)
    .find((r) => r.isSuccess && r.data)?.data;

  const historyLog = useMemo(() => {
    const reservations = reservationQuery.data?.reservations || [];
    const activities = activityQuery.data?.activities || [];

    const statusCounts = reservations.reduce<Record<string, number>>(
      (map, item) => {
        map[item.status] = (map[item.status] || 0) + 1;
        return map;
      },
      {},
    );

    const sortedStatus = Object.entries(statusCounts).sort(
      (a, b) => b[1] - a[1],
    )[0];

    return {
      mostStatus: sortedStatus ? sortedStatus[0] : "",
      mostStatusCount: sortedStatus ? sortedStatus[1] : 0,
      unreviewedCount: reservations.filter(
        (r) => r.status === "completed" && !r.reviewSubmitted,
      ).length,
      completedTotalCount: reservations.filter((r) => r.status === "completed")
        .length,
      totalReviewCount: activities.reduce(
        (acc, cur) => acc + cur.reviewCount,
        0,
      ),
      hasReservation: reservations.length > 0,
      hasActivity: activities.length > 0,
    };
  }, [reservationQuery.data, activityQuery.data]);

  return {
    reservationData: reservationQuery.data,
    activityData: activityQuery.data,
    mostReservation: {
      data: validReservation,
      count: validReservation
        ? reservationQuery.data?.reservations.filter(
            (r) => r.activity.id === validReservation.id,
          ).length || 0
        : 0,
    },
    mostActivity: {
      data: validActivity,
      count: validActivity
        ? activityQuery.data?.activities.find((a) => a.id === validActivity.id)
            ?.reviewCount || 0
        : 0,
    },
    historyLog,
    isLoading,
    user,
  };
}
