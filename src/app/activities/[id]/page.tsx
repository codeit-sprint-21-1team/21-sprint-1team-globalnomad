import { ActivityHeader } from "./_components/ActivityHeader";
import { BannerImages } from "./_components/BannerImages";
import { Description } from "./_components/Description";
import type { Activity, Reviews } from "@/types/activities";
import KakaoMap from "./_components/KakaoMap";
import { ReviewCardList } from "./_components/ReviewCardList";

export default function ActivityDetailPage() {
  return (
    <div className="mt-6 md:mt-10 xl:mt-15 px-4 md:px-5 xl:px-0 xl:w-[1120px]  mx-auto grid grid-cols-1 xl:grid-rows-[400px] xl:grid-cols-[670px_410px] xl:gap-x-10">
      <div className="xl:col-start-1">
        <BannerImages
          mainImageUrl={MOCK_ACTIVITY.bannerImageUrl}
          subImages={MOCK_ACTIVITY.subImages}
        />
      </div>

      <div className="xl:col-start-2 xl:row-span-2 flex items-center justify-center flex flex-col">
        <ActivityHeader activity={MOCK_ACTIVITY} />

        <div className="h-200 flex items-center hidden xl:block">캘린더란</div>
      </div>

      <div className="xl:col-start-1 flex flex-col self-start">
        <Description content={MOCK_ACTIVITY.description} />

        <KakaoMap address={MOCK_ACTIVITY.address} title={MOCK_ACTIVITY.title} />

        <ReviewCardList reviews={MOCK_REVIEWS} />
      </div>
    </div>
  );
}

const MOCK_ACTIVITY: Activity = {
  id: 7,
  userId: 21,
  title: "함께 배우면 즐거운 스트릿댄스",
  description:
    "안녕하세요! 저희 스트릿 댄스 체험을 소개합니다. 저희는 신나고 재미있는 스트릿 댄스 스타일을 가르칩니다. 크럼프는 세계적으로 인기 있는 댄스 스타일로, 어디서든 춤출 수 있습니다. 저희 체험에서는 새로운 스타일을 접할 수 있고, 즐거운 시간을 보낼 수 있습니다. 저희는 초보자부터 전문가까지 어떤 수준의 춤추는 사람도 가르칠 수 있도록 준비해놓았습니다. 저희와 함께 즐길 수 있는 시간을 기대해주세요! 각종 음악에 적합한 스타일로, 저희는 크럼프 외에도 전통적인 스트릿 댄스 스타일과 최신 스트릿 댄스 스타일까지 가르칠 수 있습니다. 저희 체험에서는 전문가가 직접 강사로 참여하기 때문에, 저희가 제공하는 코스는 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있도록 준비해놓았습니다. 저희 체험을 참가하게 된다면, 즐거운 시간 뿐만 아니라 새로운 스타일을 접할 수 있을 것입니다.",
  category: "투어",
  price: 10000,
  address: "서울특별시 강남구 테헤란로 427",
  bannerImageUrl: "/images/mock/activity.jpg",
  subImages: [
    {
      id: 1,
      imageUrl: "/images/mock/activity.jpg",
    },
  ],
  schedules: [
    {
      id: 1,
      date: "2023-12-01",
      startTime: "12:00",
      endTime: "13:00",
    },
    {
      id: 2,
      date: "2023-12-05",
      startTime: "12:00",
      endTime: "13:00",
    },
  ],
  reviewCount: 5,
  rating: 4.74,
  createdAt: "2023-12-31T21:28:50.589Z",
  updatedAt: "2023-12-31T21:28:50.589Z",
};

const MOCK_REVIEWS: Reviews = {
  averageRating: 4.7,
  totalCount: 1200,
  reviews: [
    {
      id: 1,
      user: {
        profileImageUrl: "",
        nickname: "김철수",
        id: 101,
      },
      activityId: 7,
      rating: 5,
      content:
        "스트릿 댄스 강습이 정말 즐거웠습니다! 강사님이 친절하게 알려주셔서 처음인데도 어렵지 않았어요. 기초부터 차근차근 배울 수 있어서 좋았고 다음에도 꼭 다시 오고 싶습니다. 강추합니다!",
      createdAt: "2026-03-18T00:00:00.000Z",
      updatedAt: "2024-03-18T00:00:00.000Z",
    },
    {
      id: 2,
      user: {
        profileImageUrl: "",
        nickname: "이영희",
        id: 102,
      },
      activityId: 7,
      rating: 4,
      content:
        "처음으로 스트릿 댄스를 배워봤는데 생각보다 훨씬 재미있었어요. 강사님도 열정적이시고 분위기도 너무 좋았습니다. 시간이 빨리 지나간 느낌이에요. 친구들한테도 추천할게요!",
      createdAt: "2024-10-28T00:00:00.000Z",
      updatedAt: "2024-10-28T00:00:00.000Z",
    },
    {
      id: 3,
      user: {
        profileImageUrl: "",
        nickname: "박민준",
        id: 103,
      },
      activityId: 7,
      rating: 5,
      content:
        "운동도 되고 스트레스도 풀리는 체험이었습니다. 음악에 맞춰 춤을 추니까 정말 신이 나더라고요. 같이 참여한 분들과도 금방 친해져서 즐거운 시간을 보냈어요. 강력 추천합니다!",
      createdAt: "2024-10-15T00:00:00.000Z",
      updatedAt: "2024-10-15T00:00:00.000Z",
    },
  ],
};
