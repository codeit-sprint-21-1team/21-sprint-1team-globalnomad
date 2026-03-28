"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ApiError {
  status?: number;
  response?: {
    status?: number;
  };
}

const handleAuthError = (error: unknown) => {
  const err = error as ApiError;
  const is401 = err?.status === 401 || err?.response?.status === 401;

  if (typeof window !== "undefined" && is401) {
    if (window.location.pathname.includes("/auth/login")) {
      return;
    }
    window.location.href = "/auth/login";
  }
};

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: handleAuthError,
    }),
    mutationCache: new MutationCache({
      onError: handleAuthError,
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
