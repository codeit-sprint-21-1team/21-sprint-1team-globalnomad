export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "canceled"
  | "completed";

export interface Activity {
  id: number;
  title: string;
  bannerImageUrl: string;
}

export interface Reservation {
  id: number;
  userId: number;
  activity: Activity;
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}
export interface MyReservationsListType {
  totalCount: number;
  reservations: Reservation[];
  cursorId: number | null;
}

export interface ActivityReview {
  id: number;
  userId: number;
  activityId: number;
  teamId: string;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewRequest {
  rating: number;
  content: string;
}
