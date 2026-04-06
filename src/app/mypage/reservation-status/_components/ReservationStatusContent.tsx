"use client";

import { useState } from "react";
import { Activity } from "@/types/myActivities.type";
import ActivityDropdown from "./ActivityDropdown";
import ReservationCalendar from "./ReservationCalendar";
import EmptyState from "@/components/ui/EmptyState/EmptyState";

interface ReservationStatusContentProps {
  hasActivities: boolean;
  initialSelectedActivity?: Activity | null;
}

export default function ReservationStatusContent({
  hasActivities,
  initialSelectedActivity = null,
}: ReservationStatusContentProps) {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    initialSelectedActivity,
  );

  if (!hasActivities) {
    return (
      <div className="flex flex-col items-center justify-center mt-[43px] min-h-[500px]">
        <EmptyState message="아직 등록한 체험이 없어요" />
      </div>
    );
  }

  return (
    <section className="mt-[24px] md:mt-[28px] xl:mt-[36px]">
      <ActivityDropdown
        selectedActivity={selectedActivity}
        onSelect={setSelectedActivity}
      />
      <ReservationCalendar
        activityId={selectedActivity?.id}
        key={selectedActivity?.id ?? "EMPTY"}
      />
    </section>
  );
}
