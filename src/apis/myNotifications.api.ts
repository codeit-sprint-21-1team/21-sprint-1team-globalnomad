import axios from "./axios";
import { NotificationListResponse } from "@/types/notifications.type";

export const getMyNotifications = async () => {
  const { data } =
    await axios.get<NotificationListResponse>("/my-notifications");
  return data;
};

export const deleteMyNotification = async (id: number) => {
  return await axios.delete(`/my-notifications/${id}`);
};

export const deleteMyAllNotifications = async (): Promise<void> => {
  const response =
    await axios.get<NotificationListResponse>("/my-notifications");
  const { notifications, totalCount } = response.data;

  if (!notifications || notifications.length === 0) return;

  await Promise.all(
    notifications.map((n) => axios.delete(`/my-notifications/${n.id}`)),
  );

  if (totalCount > notifications.length) {
    return deleteMyAllNotifications();
  }
};
