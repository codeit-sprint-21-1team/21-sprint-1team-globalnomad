import axios from "./axios";
import {
  CreateActivityRequest,
  CreateActivityResponse,
  MessageResponse,
  MyActivitiesListType,
  ReservationListBySchedule,
  ReservationDashboardItem,
  ReservationMutationStatus,
  ReservationStatusFilter,
  ReservedScheduleItem,
  UpdateActivityRequest,
} from "@/types/myActivities.type";

export const MY_ACTIVITIES_PAGE_SIZE = 10;

export const getActivityList = async ({
  cursorId,
  size = MY_ACTIVITIES_PAGE_SIZE,
}: {
  cursorId?: number | null;
  size?: number;
}) => {
  const res = await axios.get<MyActivitiesListType>("/my-activities", {
    params: { cursorId, size },
  });
  return res.data;
};

export const deleteMyActivity = async (activityId: number): Promise<void> => {
  await axios.delete(`/my-activities/${activityId}`);
};

export const getMyActivityList = async ({
  cursorId,
  size = MY_ACTIVITIES_PAGE_SIZE,
}: {
  cursorId?: number | null;
  size?: number;
}) => {
  const res = await axios.get<MyActivitiesListType>("/my-activities", {
    params: { cursorId, size },
  });
  return res.data;
};

export const deleteMyActivityItem = async ({
  activityId,
}: {
  activityId?: number | null;
}) => {
  const res = await axios.delete<MessageResponse>(
    `/my-activities/${activityId}`,
  );
  return res.data;
};

export const createMyActivity = async (
  data: CreateActivityRequest,
): Promise<CreateActivityResponse> => {
  const res = await axios.post("/activities", data);
  return res.data;
};

export const postUploadImageMyActivity = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await axios.post("/activities/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateMyActivity = async (
  activityId: number,
  data: UpdateActivityRequest,
) => {
  const res = await axios.patch(`/my-activities/${activityId}`, data);
  return res.data;
};

export const getReservationDashboard = async ({
  activityId,
  year,
  month,
}: {
  activityId: number;
  year: string;
  month: string;
}): Promise<ReservationDashboardItem[]> => {
  const res = await axios.get<ReservationDashboardItem[]>(
    `/my-activities/${activityId}/reservation-dashboard`,
    { params: { year, month } },
  );
  return res.data;
};

export const getReservedSchedule = async ({
  activityId,
  date,
}: {
  activityId: number;
  date: string;
}): Promise<ReservedScheduleItem[]> => {
  const res = await axios.get<ReservedScheduleItem[]>(
    `/my-activities/${activityId}/reserved-schedule`,
    { params: { date } },
  );
  return res.data;
};

export const getReservationsBySchedule = async ({
  activityId,
  scheduleId,
  status,
  cursorId,
  size = MY_ACTIVITIES_PAGE_SIZE,
}: {
  activityId: number;
  scheduleId: number;
  status: ReservationStatusFilter;
  cursorId?: number | null;
  size?: number;
}): Promise<ReservationListBySchedule> => {
  const res = await axios.get<ReservationListBySchedule>(
    `/my-activities/${activityId}/reservations`,
    {
      params: {
        scheduleId,
        status,
        cursorId,
        size,
      },
    },
  );
  return res.data;
};

export const updateReservationStatus = async ({
  activityId,
  reservationId,
  status,
}: {
  activityId: number;
  reservationId: number;
  status: ReservationMutationStatus;
}): Promise<void> => {
  await axios.patch(`/my-activities/${activityId}/reservations/${reservationId}`, {
    status,
  });
};
