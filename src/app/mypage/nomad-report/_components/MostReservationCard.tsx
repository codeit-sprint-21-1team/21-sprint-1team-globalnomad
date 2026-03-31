import { Reservation } from "@/types/myReservations.type";
import { getActivityDetail } from "@/apis/activities.api";
import { useQueries } from "@tanstack/react-query";
import ReportCard from "./ReportCard";

interface ReportListPropsType {
  reservationData: Reservation[];
}

export default function MostReservationCard({
  reservationData = [],
}: ReportListPropsType) {
  const reservationCounts = reservationData.reduce<Record<number, number>>(
    (countMap, item) => {
      const id = item.activity.id;
      countMap[id] = (countMap[id] || 0) + 1;
      return countMap;
    },
    {},
  );

  const sortedIds = Object.entries(reservationCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => Number(id));

  const results = useQueries({
    queries: sortedIds.slice(0, 3).map((id) => ({
      queryKey: ["reportReservation", id],
      queryFn: () => getActivityDetail(id),
      staleTime: Infinity,
      gcTime: 1000 * 60 * 10,
      retry: false,
    })),
  });

  const hasData = reservationData.length > 0;
  const validReservation = hasData
    ? results.find((r) => r.isSuccess && r.data)?.data
    : undefined;
  const totalCount = validReservation
    ? reservationCounts[validReservation.id]
    : 0;

  const title =
    totalCount > 0 ? `총 ${totalCount}회 참여 🏃` : "여행 시작하기 ✈️";

  const description =
    totalCount > 0
      ? `OO님이 가장 사랑한 카테고리는 '${validReservation?.category}'이에요!`
      : "아직 참여한 체험이 없어요. 새로운 세상을 만나볼 준비 되셨나요?";

  return (
    <ReportCard
      mode="reservation"
      id={validReservation?.id || undefined}
      title={title}
      description={description}
      imageUrl={validReservation?.bannerImageUrl || undefined}
    />
  );
}
