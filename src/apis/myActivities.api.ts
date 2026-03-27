import axios from "./axios";
import { MyActivitiesListType } from "@/types/myActivities.type";

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
