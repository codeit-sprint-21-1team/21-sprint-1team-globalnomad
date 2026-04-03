"use client";

import { useEffect, useMemo, useReducer } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getReservationDashboard,
  getReservationsBySchedule,
  getReservedSchedule,
  updateReservationStatus,
} from "@/apis/myActivities.api";
import type {
  ReservationCounts,
  ReservationMutationStatus,
  ReservationStatusFilter,
  ReservationWithUserItem,
  ReservedScheduleItem,
} from "@/types/myActivities.type";

interface ReservationCalendarState {
  currentMonth: Date;
  selectedDate: string | null;
  selectedSchedule: ReservedScheduleItem | null;
  selectedStatus: ReservationStatusFilter | null;
}

type ReservationCalendarAction =
  | { type: "monthChanged"; payload: Date }
  | {
      type: "dateSelected";
      payload: {
        date: string;
      };
    }
  | {
      type: "scheduleSelected";
      payload: {
        schedule: ReservedScheduleItem;
      };
    }
  | {
      type: "statusSelected";
      payload: {
        status: ReservationStatusFilter;
      };
    }
  | { type: "resetSelection" };

const STATUS_LABELS: Record<ReservationStatusFilter, string> = {
  pending: "신청",
  confirmed: "승인",
  declined: "거절",
};

function createInitialState(): ReservationCalendarState {
  return {
    currentMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    selectedDate: null,
    selectedSchedule: null,
    selectedStatus: null,
  };
}

function reservationCalendarReducer(
  state: ReservationCalendarState,
  action: ReservationCalendarAction,
): ReservationCalendarState {
  switch (action.type) {
    case "monthChanged":
      return {
        ...state,
        currentMonth: action.payload,
      };
    case "dateSelected":
      return {
        ...state,
        selectedDate: action.payload.date,
        selectedSchedule: null,
        selectedStatus: null,
      };
    case "scheduleSelected":
      return {
        ...state,
        selectedSchedule: action.payload.schedule,
        selectedStatus: "pending",
      };
    case "statusSelected":
      return {
        ...state,
        selectedStatus: action.payload.status,
      };
    case "resetSelection":
      return {
        ...state,
        selectedDate: null,
        selectedSchedule: null,
        selectedStatus: null,
      };
    default:
      return state;
  }
}

export function useReservationCalendarState(activityId: number | undefined) {
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(
    reservationCalendarReducer,
    undefined,
    createInitialState,
  );

  const year = state.currentMonth.getFullYear().toString();
  const month = (state.currentMonth.getMonth() + 1).toString().padStart(2, "0");

  const { data: dashboardData = [] } = useQuery({
    queryKey: ["reservationDashboard", activityId, year, month],
    queryFn: () =>
      getReservationDashboard({ activityId: activityId!, year, month }),
    enabled: !!activityId,
    staleTime: 60 * 1000,
  });

  const reservationMap = useMemo<Record<string, ReservationCounts>>(
    () =>
      Object.fromEntries(
        dashboardData.map((item) => [item.date, item.reservations]),
      ),
    [dashboardData],
  );

  const selectedDateCounts = state.selectedDate
    ? reservationMap[state.selectedDate]
    : undefined;
  const hasReservationsOnSelectedDate = selectedDateCounts
    ? Object.values(selectedDateCounts).some((count) => count > 0)
    : false;

  const { data: schedules = [] } = useQuery({
    queryKey: ["reservedSchedule", activityId, state.selectedDate],
    queryFn: () =>
      getReservedSchedule({
        activityId: activityId!,
        date: state.selectedDate!,
      }),
    enabled:
      !!activityId && !!state.selectedDate && hasReservationsOnSelectedDate,
    staleTime: 60 * 1000,
  });

  const { data: reservationData } = useQuery({
    queryKey: [
      "reservationsBySchedule",
      activityId,
      state.selectedSchedule?.scheduleId,
      state.selectedStatus,
    ],
    queryFn: () =>
      getReservationsBySchedule({
        activityId: activityId!,
        scheduleId: state.selectedSchedule!.scheduleId,
        status: state.selectedStatus!,
      }),
    enabled: !!activityId && !!state.selectedSchedule && !!state.selectedStatus,
    staleTime: 60 * 1000,
  });

  const updateReservationMutation = useMutation({
    mutationFn: ({
      reservationId,
      status,
    }: {
      reservationId: number;
      status: ReservationMutationStatus;
    }) =>
      updateReservationStatus({
        activityId: activityId!,
        reservationId,
        status,
      }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["reservationDashboard", activityId, year, month],
        }),
        queryClient.invalidateQueries({
          queryKey: ["reservedSchedule", activityId, state.selectedDate],
        }),
        queryClient.invalidateQueries({
          queryKey: [
            "reservationsBySchedule",
            activityId,
            state.selectedSchedule?.scheduleId,
          ],
        }),
      ]);
    },
  });

  useEffect(() => {
    if (!state.selectedDate || !hasReservationsOnSelectedDate) {
      return;
    }

    if (!schedules.length) {
      return;
    }

    const currentScheduleStillExists = state.selectedSchedule
      ? schedules.some(
          (schedule) => schedule.scheduleId === state.selectedSchedule?.scheduleId,
        )
      : false;

    if (!currentScheduleStillExists) {
      dispatch({
        type: "scheduleSelected",
        payload: {
          schedule: schedules[0],
        },
      });
    }
  }, [
    hasReservationsOnSelectedDate,
    schedules,
    state.selectedDate,
    state.selectedSchedule,
  ]);

  useEffect(() => {
    if (!state.selectedSchedule || state.selectedStatus) {
      return;
    }

    dispatch({
      type: "statusSelected",
      payload: {
        status: "pending",
      },
    });
  }, [state.selectedSchedule, state.selectedStatus]);

  const reservations: ReservationWithUserItem[] =
    reservationData?.reservations ?? [];

  const handleDateSelect = (date: Date | undefined) => {
    if (!activityId || !date) {
      dispatch({ type: "resetSelection" });
      return;
    }

    const formattedDate = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    const counts = reservationMap[formattedDate];
    const hasReservations = counts
      ? Object.values(counts).some((count) => count > 0)
      : false;

    if (!hasReservations) {
      dispatch({ type: "resetSelection" });
      return;
    }

    dispatch({
      type: "dateSelected",
      payload: {
        date: formattedDate,
      },
    });
  };

  const handleScheduleSelect = (scheduleId: number) => {
    const schedule =
      schedules.find((item) => item.scheduleId === scheduleId) ?? null;

    if (!schedule) {
      return;
    }

    dispatch({
      type: "scheduleSelected",
      payload: {
        schedule,
      },
    });
  };

  const handleStatusSelect = (status: ReservationStatusFilter) => {
    dispatch({
      type: "statusSelected",
      payload: {
        status,
      },
    });
  };

  const handleReservationAction = (
    reservationId: number,
    status: ReservationMutationStatus,
  ) => {
    updateReservationMutation.mutate({ reservationId, status });
  };

  return {
    currentMonth: state.currentMonth,
    reservationMap,
    reservations,
    schedules,
    selectedDate: state.selectedDate,
    selectedScheduleId: state.selectedSchedule?.scheduleId ?? null,
    selectedStatus: state.selectedStatus,
    statusLabels: STATUS_LABELS,
    isMutating: updateReservationMutation.isPending,
    onDateSelect: handleDateSelect,
    onMonthChange: (month: Date) =>
      dispatch({ type: "monthChanged", payload: month }),
    onReservationAction: handleReservationAction,
    onScheduleSelect: handleScheduleSelect,
    onStatusSelect: handleStatusSelect,
  };
}
