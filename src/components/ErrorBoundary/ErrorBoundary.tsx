"use client";

import { type ReactNode } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import ErrorBoundaryBase, {
  type ErrorBoundaryBaseProps,
} from "./ErrorBoundaryBase";

type ErrorBoundaryProps = Omit<ErrorBoundaryBaseProps, "resetQuery">;

function ErrorBoundary({
  fallback,
  onError,
  children,
}: ErrorBoundaryProps): ReactNode {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundaryBase fallback={fallback} resetQuery={reset} onError={onError}>
      {children}
    </ErrorBoundaryBase>
  );
}

export default ErrorBoundary;
