interface ActivitySummaryPropsType {
  user: string;
  activityDataTotalCount: number;
  reviewDataTotalCount: number;
}

export default function ActivitySummary({
  user,
  reviewDataTotalCount,
  activityDataTotalCount,
}: ActivitySummaryPropsType) {
  let content;

  if (activityDataTotalCount === 0 && reviewDataTotalCount === 0) {
    content = (
      <>
        아직 기록된 여정이 없어요.
        <br />
        {user}님만의 소중한 경험으로 리포트를 채워보세요!
      </>
    );
  } else if (activityDataTotalCount === 0) {
    content = (
      <>
        아직 만나지 못한 세계가 많지만,
        <br />
        이미 <strong>{reviewDataTotalCount}분</strong>의 노마드에게 영감을 주고
        계세요!
      </>
    );
  } else if (reviewDataTotalCount === 0) {
    content = (
      <>
        벌써 <strong>{activityDataTotalCount}번</strong>의 세계를 만나셨네요!
        <br />
        이제 {user}님만의 세계를 열어 영감을 나눠주세요.
      </>
    );
  } else {
    content = (
      <>
        지금까지 <strong>{activityDataTotalCount}번</strong>의 세계를 만났고,
        <br />
        <strong>{reviewDataTotalCount}분</strong>의 노마드에게 영감을 주셨어요!
      </>
    );
  }

  return (
    <div className="text-[18px] font-medium tracking-[-2.5%] text-black text-center">
      {content}
    </div>
  );
}
