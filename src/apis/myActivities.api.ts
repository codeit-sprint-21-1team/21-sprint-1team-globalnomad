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
