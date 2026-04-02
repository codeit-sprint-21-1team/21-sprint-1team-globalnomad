import { Activity } from "@/types/activities";
import ReportCard from "./ReportCard";

interface ReportListPropsType {
  user: string;
  mostReservation: {
    data: Activity | undefined;
    count: number;
  };
}

export default function MostReservationCard({
  user,
  mostReservation,
}: ReportListPropsType) {
  const title =
    mostReservation.count > 0
      ? `총 ${mostReservation.count}회 참여 🏃`
      : "여행 시작하기 ✈️";

  const description =
    mostReservation.count > 0 ? (
      <>
        <b>{user}님</b>이 가장 사랑한 카테고리는{" "}
        <b>&apos;{mostReservation.data?.category}&apos;</b>
        이에요!
      </>
    ) : (
      <>아직 참여한 체험이 없어요. 새로운 세상을 만나볼 준비 되셨나요?</>
    );

  return (
    <ReportCard
      mode="reservation"
      id={mostReservation.data?.id || undefined}
      title={title}
      description={description}
      imageUrl={mostReservation.data?.bannerImageUrl || undefined}
    />
  );
}
