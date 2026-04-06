"use server";

interface GuestAccount {
  id: number;
  email: string;
  password: string;
}

interface ActivityDetail {
  userId: number;
}

interface LoginResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
  };
}

interface ApproveReservationParams {
  activityId: number;
  reservationId: number;
}

const API_BASE_URL = process.env.API_BASE_URL;
const GUEST_PASSWORD = process.env.GUEST_PASSWORD;

export async function approveReservation({
  activityId,
  reservationId,
}: ApproveReservationParams) {
  try {
    const activityResponse = await fetch(
      `${API_BASE_URL}/activities/${activityId}`,
    );
    if (!activityResponse.ok) throw new Error("체험 정보 조회 실패");

    const activityDetail: ActivityDetail = await activityResponse.json();
    const ownerId = activityDetail.userId;

    const guestUsersJson = process.env.GUEST_USERS_JSON || "[]";
    const guests: GuestAccount[] = JSON.parse(guestUsersJson);

    const matchedGuest = guests.find((user) => user.id === ownerId);

    if (matchedGuest) {
      console.log(`자동 승인 진행 중 - 소유자: ${matchedGuest.email}`);

      const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: matchedGuest.email,
          password: GUEST_PASSWORD,
        }),
      });

      if (!loginResponse.ok) {
        throw new Error("게스트 계정 로그인 실패");
      }

      const loginData: LoginResponse = await loginResponse.json();
      const ownerToken = loginData.accessToken;

      const approveRes = await fetch(
        `${API_BASE_URL}/my-activities/${activityId}/reservations/${reservationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ownerToken}`,
          },
          body: JSON.stringify({ status: "confirmed" }),
        },
      );

      if (approveRes.ok) {
        console.log(`자동 승인 완료 (예약 ID: ${reservationId})`);
      } else {
        const error = await approveRes.json();
        console.warn(`신청 처리 실패 사유: ${error.message}`);
      }
    } else {
      console.log(`자동 승출 대상이 아님 (소유자 ID: ${ownerId})`);
    }
  } catch (error) {
    console.error(`자동 처리 중 치명적 오류 발생:`, error);
  }
}
