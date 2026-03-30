export interface MyActivitiesListType {
  activities: Activity[];
  totalCount: number;
  cursorId: number | null;
}

export interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}
export interface MessageResponse {
  message: string;
}

///////////////////////////////////////
export interface CreateActivityResponse {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  schedules: ActivitySchedule[];
  subImages: ActivitySubImage[];
}

export interface ActivitySchedule {
  date: string;
  times: ActivityTimeSlot[];
}

export interface ActivityTimeSlot {
  id: number;
  startTime: string;
  endTime: string;
}

export interface ActivitySubImage {
  id: number;
  imageUrl: string;
}

export interface CreateActivityRequest {
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  schedules: CreateSchedule[];
  subImages: string[];
}

export interface CreateSchedule {
  date: string;
  startTime: string;
  endTime: string;
}

export interface ActivityDetail {
  id: number;
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  bannerImageUrl: string;
  subImages: { id: number; imageUrl: string }[];
  schedules: { id: number; date: string; startTime: string; endTime: string }[];
}

export interface UpdateActivityRequest {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
  scheduleIdsToRemove: number[];
  schedulesToAdd: { date: string; startTime: string; endTime: string }[];
}

export type MyActivityMutationData = (CreateActivityRequest &
  UpdateActivityRequest) & { id?: number };

export interface ReservationCounts {
  completed: number;
  confirmed: number;
  pending: number;
}

export interface ReservationDashboardItem {
  date: string; // "YYYY-MM-DD"
  reservations: ReservationCounts;
}
