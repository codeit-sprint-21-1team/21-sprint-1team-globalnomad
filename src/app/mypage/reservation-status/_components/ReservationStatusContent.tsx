"use client";

import { useState } from "react";
import { Activity } from "@/types/myActivities.type";
import ActivityDropdown from "./ActivityDropdown";
import ReservationCalendar from "./ReservationCalendar";

export default function ReservationStatusContent() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );

  return (
    <section className="mt-[24px] md:mt-[28px] xl:mt-[36px]">
      <ActivityDropdown
        selectedActivity={selectedActivity}
        onSelect={setSelectedActivity}
      />
      <ReservationCalendar activityId={selectedActivity?.id} />
    </section>
  );
}
