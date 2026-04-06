import {
  GetActivityListParams,
  ActivityListResponse,
  Activity,
  Reviews,
  AvailableSchedule,
} from "@/types/activities";
import { buildQueryString } from "@/commons/utils/buildQueryString";
import { ACTIVITY_CACHE_TAGS } from "@/commons/consts/cacheTags";
import axios from "./axios";

const BASE_URL =
  typeof window !== "undefined" ? "/api" : process.env.API_BASE_URL;

export const getActivityList = async (
  params: GetActivityListParams,
  nextOptions?: NextFetchRequestConfig,
): Promise<ActivityListResponse> => {
  const query = buildQueryString(params);
  const response = await fetch(`${BASE_URL}/activities${query}`, {
    next: nextOptions ?? { revalidate: 60, tags: [ACTIVITY_CACHE_TAGS.LIST] },
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
    next: { revalidate: 60, tags: [`activity-${activityId}`] },
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
    { next: { revalidate: 60, tags: [`activity-reviews-${activityId}`] } },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch activity reviews");
  }

  return res.json();
};

export const deleteMyActivity = async (activityId: number): Promise<void> => {
  await axios.delete(`/my-activities/${activityId}`);
};

export const getAvailableSchedule = async (
  activityId: number,
  year: string,
  month: string,
): Promise<AvailableSchedule[]> => {
  const res = await axios.get<AvailableSchedule[]>(
    `/activities/${activityId}/available-schedule`,
    { params: { year, month } },
  );
  return res.data;
};

export const createReservation = async (
  activityId: number,
  scheduleId: number,
  headCount: number,
): Promise<{ id: number }> => {
  const res = await axios.post<{ id: number }>(
    `/activities/${activityId}/reservations`,
    { scheduleId, headCount },
  );
  return res.data;
};
