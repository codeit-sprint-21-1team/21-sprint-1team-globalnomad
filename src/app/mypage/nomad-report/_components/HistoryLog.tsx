interface HistoryLogType {
  historyLog: {
    mostStatus: string;
    mostStatusCount: number;
    unreviewedCount: number;
    completedTotalCount: number;
    totalReviewCount: number;
    hasReservation: boolean;
    hasActivity: boolean;
  };
}

export default function HistoryLog({ historyLog }: HistoryLogType) {
  const {
    mostStatus,
    mostStatusCount,
    unreviewedCount,
    completedTotalCount,
    totalReviewCount,
    hasReservation,
    hasActivity,
  } = historyLog;

  const getStatusGuide = () => {
    if (!hasReservation) {
      return (
        <>
          ✨ <b>아직 예약된 체험이 없네요!</b> 나만의 취향을 찾아 첫 번째 멋진
          여행을 시작해볼까요
        </>
      );
    }

    switch (mostStatus) {
      case "pending":
      case "confirmed":
        return (
          <>
            ✨ 지금 <b>{mostStatusCount}개</b>의 체험 일정을{" "}
            <b>기다리고 있습니다!</b> 기다리는 동안 다른 새로운 체험도 함께
            구경해볼까요
          </>
        );

      case "completed":
        return (
          <>
            🏅 벌써 <b>{mostStatusCount}번</b>이나 <b>체험을 완료하셨네요!</b>{" "}
            이 기세를 몰아 새로운 취향도 더 찾아볼까요
          </>
        );

      case "canceled":
        return (
          <>
            🚀 <b>아쉽게 미뤄진 체험</b>들이 있네요.. 새로운 체험들이 계속
            올라오고 있는 지금, 다시 구경해볼까요
          </>
        );

      default:
        return "";
    }
  };

  const getReviewMessage = () => {
    switch (true) {
      case unreviewedCount > 0:
        return (
          <>
            ✨ 아직 남겨지지 않은 <b>{unreviewedCount}개의 체험 후기</b>를
            기록해보는 건 어떨까요
          </>
        );

      case completedTotalCount > 0:
        return (
          <>
            🏅참여하신 <b>모든 체험의 리뷰</b>를 작성하셨네요! 소중한 후기들이
            다른 분들에게 큰 영감이 되고 있습니다
          </>
        );

      default:
        return (
          <>
            🚀 아직 기록할 체험이 없네요.. <b>첫 번째 후기</b>를 만들러 지금
            바로 떠나볼까요
          </>
        );
    }
  };

  const getHostLog = () => {
    switch (true) {
      case totalReviewCount > 0:
        return (
          <>
            🏅 등록하신 체험을 통해 <b>{totalReviewCount}명</b>이나 추억을
            만들었더라구요! 새로운 체험을 또 공유해보는 건 어떨까요
          </>
        );

      case hasActivity:
        return (
          <>
            ✨ <b>첫 번째 리뷰</b>를 기다리는 중입니다
          </>
        );
      default:
        return (
          <>
            🚀 나만의 특별한 체험을 공유해보는 건 어떨까요? <b>첫 번째 체험</b>
            을 지금 바로 등록해볼까요
          </>
        );
    }
  };

  return (
    <ul className="flex flex-col gap-[24px] text-[18px] font-medium tracking-[-2.5%] text-black mt-[50px] md:mt-[70px]">
      <li>{getStatusGuide()}</li>
      <li>{getReviewMessage()}</li>
      <li>{getHostLog()}</li>
    </ul>
  );
}
