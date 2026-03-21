import {
  GetActivityListParams,
  ActivityListResponse,
} from "@/types/activities";
import { buildQueryString } from "@/commons/utils/buildQueryString";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getActivityList = async (
  params: GetActivityListParams,
): Promise<ActivityListResponse> => {
  const query = buildQueryString(params);
  const response = await fetch(`${BASE_URL}/activities${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
      tags: ["activities"],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch activitys");
  }

  return response.json();
};
