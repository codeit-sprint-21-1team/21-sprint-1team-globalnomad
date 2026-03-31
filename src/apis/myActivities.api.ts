import axios from "./axios";
import {
  CreateActivityRequest,
  CreateActivityResponse,
  MessageResponse,
  MyActivitiesListType,
  ReservationDashboardItem,
  UpdateActivityRequest,
} from "@/types/myActivities.type";

export const getActivityList = async ({
  cursorId,
}: {
  cursorId?: number | null;
}) => {
  const res = await axios.get<MyActivitiesListType>("/my-activities", {
    params: { cursorId, size: 5 },
  });
  return res.data;
};

export const deleteMyActivity = async (activityId: number): Promise<void> => {
  await axios.delete(`/my-activities/${activityId}`);
};

export const getMyActivityList = async ({
  cursorId,
  size = 5,
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
