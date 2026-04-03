import { cookies, headers } from "next/headers";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ReservationStatusHeader from "./_components/ReservationStatusHeader";
import ReservationStatusContent from "./_components/ReservationStatusContent";
import { MyActivitiesListType } from "@/types/myActivities.type";

export default async function ReservationStatusPage() {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const headerStore = await headers();
  const protocol = headerStore.get("x-forwarded-proto") ?? "http";
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");

  if (!host) {
    throw new Error("Failed to resolve request host for SSR prefetch.");
  }

  const origin = `${protocol}://${host}`;
  const cookieHeader = cookieStore.toString();

  const initialActivities = await queryClient.fetchInfiniteQuery({
    queryKey: ["myActivities"] as const,
    queryFn: async () => {
      const response = await fetch(`${origin}/api/my-activities`, {
        headers: {
          ...(cookieHeader && { cookie: cookieHeader }),
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch myActivities");
      }

      return (await response.json()) as MyActivitiesListType;
    },
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage: MyActivitiesListType) =>
      lastPage.cursorId ?? undefined,
  });

  const initialSelectedActivity =
    initialActivities.pages[0]?.activities[0] ?? null;
  const hasActivities = initialActivities.pages[0]?.activities.length > 0;

  return (
    <main className="md:px-0 md:py-0 xl:px-0 xl:py-0">
      <ReservationStatusHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ReservationStatusContent
          hasActivities={hasActivities}
          initialSelectedActivity={initialSelectedActivity}
        />
      </HydrationBoundary>
    </main>
  );
}
