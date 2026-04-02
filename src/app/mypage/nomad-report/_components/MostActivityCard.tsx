import { Activity } from "@/types/myActivities.type";
import ReportCard from "./ReportCard";

interface ReportListPropsType {
  user: string;
  mostActivity: {
    data: Activity | undefined;
    count: number;
  };
}

export default function MostActivityCard({
  user,
  mostActivity,
}: ReportListPropsType) {
  const title =
    mostActivity.count > 0
      ? `총 ${mostActivity.count}개의 후기 👥`
      : mostActivity.data
        ? "후기 기다리기 💌"
        : "체험 등록하기 ✨";

  const description =
    mostActivity.count > 0 ? (
      <>
        후기가 가장 많이 쌓인 <b>${user}님</b>의 분야는{" "}
        <b>&apos;${mostActivity.data?.category}&apos;</b>이에요.
      </>
    ) : mostActivity.data ? (
      <>아직 도착한 리뷰가 없어요. 멋진 호스팅으로 첫 후기를 받아 보세요.</>
    ) : (
      <>
        내 체험을 등록하고 노마드들의 생생한 리뷰로 리포트 카드를 채워 보세요.
      </>
    );

  return (
    <ReportCard
      mode="activity"
      id={mostActivity.data?.id || undefined}
      title={title}
      description={description}
      imageUrl={mostActivity.data?.bannerImageUrl || undefined}
    />
  );
}
