"use client";

import { Suspense } from "react";
import type { ReactNode } from "react";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import QueryErrorFallback from "@/components/ErrorBoundary/QueryErrorFallback";
import { ReviewCardList } from "./ReviewCardList";
import { ReviewListSkeleton } from "./ReviewListSkeleton";

interface ReviewSectionProps {
  activityId: number;
}

export function ReviewSection({ activityId }: ReviewSectionProps): ReactNode {
  return (
    <ErrorBoundary
      fallback={(_, reset) => (
        <QueryErrorFallback
          reset={reset}
          message="후기를 불러오는 데 실패했습니다."
        />
      )}
    >
      <Suspense fallback={<ReviewListSkeleton />}>
        <ReviewCardList activityId={activityId} />
      </Suspense>
    </ErrorBoundary>
  );
}
