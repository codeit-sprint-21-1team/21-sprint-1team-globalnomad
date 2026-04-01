import {
  CreateReviewRequest,
  MyReservationsListType,
  Reservation,
} from "@/types/myReservations.type";
import axios from "./axios";

export const getMyReservationList = async ({
  cursorId,
  status,
  size = 5,
}: {
  cursorId?: number | null;
  status?: string;
  size?: number;
}) => {
  const res = await axios.get<MyReservationsListType>("/my-reservations", {
    params: { cursorId, size, status },
  });
  return res.data;
};

type UpdateReservationRequest = Partial<
  Pick<Reservation, "status" | "headCount" | "scheduleId">
>;

export const patchCancelMyReservation = async ({
  reservationId,
  updateData,
}: {
  reservationId: number;
  updateData: UpdateReservationRequest;
}) => {
  const res = await axios.patch<Reservation>(
    `/my-reservations/${reservationId}`,
    updateData,
  );
  return res.data;
};

export const patchUpdateMyReservation = async ({
  reservationId,
  updateData,
}: {
  reservationId: number;
  updateData: UpdateReservationRequest;
}) => {
  const res = await axios.patch<Reservation>(
    `/my-reservations/${reservationId}/application`,
    updateData,
  );
  return res.data;
};

export const postRiviewMyReservation = async ({
  reservationId,
  reviewData,
}: {
  reservationId: number;
  reviewData: CreateReviewRequest;
}) => {
  const res = await axios.post<Reservation>(
    `/my-reservations/${reservationId}/reviews`,
    reviewData,
  );
  return res.data;
};
