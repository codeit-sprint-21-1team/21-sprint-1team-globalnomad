import {
  GetActivityListParams,
  ActivityListResponse,
  Activity,
  Reviews,
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

export const getActivityDetail = async (
  activityId: number,
): Promise<Activity> => {
  const res = await fetch(`${BASE_URL}/activities/${activityId}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch activity detail");
  }

  return res.json();
};

export const getActivityReviews = async (
  activityId: number,
  page: number = 1,
  size: number = 3,
): Promise<Reviews> => {
  const res = await fetch(
    `${BASE_URL}/activities/${activityId}/reviews?page=${page}&size=${size}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch activity reviews");
  }

  return res.json();
};
