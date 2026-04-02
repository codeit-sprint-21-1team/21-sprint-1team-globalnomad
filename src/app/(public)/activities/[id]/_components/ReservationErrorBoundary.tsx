"use client";

import { type ReactNode } from "react";

import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import QueryErrorFallback from "@/components/ErrorBoundary/QueryErrorFallback";

interface ReservationErrorBoundaryProps {
  children: ReactNode;
}

function ReservationErrorBoundary({
  children,
}: ReservationErrorBoundaryProps): ReactNode {
  return (
    <ErrorBoundary
      fallback={(_, reset) => (
        <QueryErrorFallback
          reset={reset}
          message="예약 가능 일정을 불러오는 데 실패했습니다."
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

export { ReservationErrorBoundary };
