"use client";

import {
  Mutation,
  MutationCache,
  Query,
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

const handleAuthError = (
  error: unknown,
  queryOrMutation?:
    | Query<unknown, unknown, unknown>
    | Mutation<unknown, unknown, unknown, unknown>,
) => {
  const err = error as ApiError;
  const is401 = err?.status === 401 || err?.response?.status === 401;

  if (!is401 || typeof window === "undefined") return;

  if (queryOrMutation?.meta?.authRequired === false) return;

  if (window.location.pathname.includes("/auth/login")) return;

  window.location.href = "/auth/login";
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
      onError: (error, query) => handleAuthError(error, query),
    }),
    mutationCache: new MutationCache({
      onError: (error, _variables, _context, mutation) =>
        handleAuthError(error, mutation),
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
