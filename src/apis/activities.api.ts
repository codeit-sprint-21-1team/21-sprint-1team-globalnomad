import { Activity, Reviews } from "@/types/activities";

export const getActivityDetail = async (
  activityId: number,
): Promise<Activity> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/activities/${activityId}`,
    { next: { revalidate: 60 } },
  );

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
    `${process.env.NEXT_PUBLIC_API_URL}/activities/${activityId}/reviews?page=${page}&size=${size}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch activity reviews");
  }

  return res.json();
};
