import { Activity } from "@/types/myActivities.type";
import { useQueries } from "@tanstack/react-query";
import { getActivityDetail } from "@/apis/activities.api";
import ReportCard from "./ReportCard";

interface ReportListPropsType {
  activityData: Activity[];
}

export default function MostActivityCard({
  activityData = [],
}: ReportListPropsType) {
  const myMostActivityTop3 = [...activityData]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 3);

  const results = useQueries({
    queries: myMostActivityTop3.slice(0, 3).map(({ id }) => ({
      queryKey: ["reportActivity", id],
      queryFn: () => getActivityDetail(id),
      staleTime: Infinity,
      gcTime: 1000 * 60 * 10,
      retry: false,
    })),
  });

  const hasData = activityData.length > 0;
  const validActivity = hasData
    ? results.find((r) => r.isSuccess && r.data)?.data
    : undefined;
  const totalCount =
    myMostActivityTop3.find((item) => item.id === validActivity?.id)
      ?.reviewCount || 0;

  const title =
    totalCount > 0
      ? `총 ${totalCount}개의 후기 👥`
      : hasData
        ? "후기 기다리기 💌"
        : "체험 등록하기 ✨";

  const description = (() => {
    if (totalCount > 0)
      return `후기가 가장 많이 쌓인 OO님의 분야는 '${validActivity?.category}'이에요.`;
    if (hasData)
      return "아직 도착한 리뷰가 없어요. 멋진 호스팅으로 첫 후기를 받아 보세요.";
    return "내 체험을 등록하고 노마드들의 생생한 리뷰로 리포트 카드를 채워 보세요.";
  })();

  return (
    <ReportCard
      mode="activity"
      id={validActivity?.id || undefined}
      title={title}
      description={description}
      imageUrl={validActivity?.bannerImageUrl || undefined}
    />
  );
}
