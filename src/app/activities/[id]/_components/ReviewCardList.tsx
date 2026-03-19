import type { Reviews } from "@/types/activities";
import { Star } from "lucide-react";
import { ReviewCard } from "./ReviewCard";

function getRatingLabel(rating: number): string {
  if (rating >= 4) return "매우 만족";
  if (rating >= 3) return "만족";
  if (rating >= 2) return "보통";
  if (rating >= 1) return "불만족";
  return "매우 불만족";
}

interface ReviewCardListProps {
  reviews: Reviews;
}

export function ReviewCardList({ reviews }: ReviewCardListProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3 md:mb-5 mt-4 md:mt-8">
        <h2 className="text-[16px] md:text-[18px] font-bold text-gray-950">
          체험 후기
        </h2>
        <span className="text-[14px] md:text-[16px] font-bold text-gray-500">
          {reviews.totalCount.toLocaleString()}개
        </span>
      </div>

      <div className="flex flex-col items-center   mb-6">
        <span className="text-2xl md:text-3xl font-bold text-gray-950">
          {reviews.averageRating.toFixed(1)}
        </span>
        <span className="text-lg font-bold text-gray-950">
          {getRatingLabel(reviews.averageRating)}
        </span>
        <div className="flex items-center gap-1 text-gray-500 text-md mt-2 mb-3 md:mb-5">
          <Star size={14} className="fill-yellow-500 text-yellow-500" />
          <span>{reviews.totalCount.toLocaleString()}개 후기</span>
        </div>
      </div>

      <ul className="flex flex-col gap-8 md:gap-5 ">
        {reviews.reviews.map((review) => (
          <li key={review.id}>
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
    </section>
  );
}
