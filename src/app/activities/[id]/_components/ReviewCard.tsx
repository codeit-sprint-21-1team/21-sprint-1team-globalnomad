import type { Review } from "@/types/activities";

import formatDate from "@/commons/utils/formatDate";
import { StarRating } from "@/components/ui/StarRating/StarRating";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-[0_2px_14px_0_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-3 mb-0.5">
        <span className="font-bold text-[14px] md:text-[16px] text-gray-950">
          {review.user.nickname}
        </span>
        <span className="text-[12px] md:text-[14px] text-gray-400">
          {formatDate(review.createdAt)}
        </span>
      </div>
      <StarRating score={review.rating} className="mb-2.5" />
      <p className="text-[14px] md:text-[16px] text-gray-700 leading-relaxed">
        {review.content}
      </p>
    </div>
  );
}
