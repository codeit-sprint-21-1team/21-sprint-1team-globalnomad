"use client";

import { useState } from "react";
import { Activity } from "@/types/myActivities.type";
import ActivityDropdown from "./ActivityDropdown";

export default function ReservationStatusContent() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );

  // 캘린더도 여기서 관리예정

  return (
    <section className="mt-[24px] md:mt-[28px] xl:mt-[36px]">
      <ActivityDropdown
        selectedActivity={selectedActivity}
        onSelect={setSelectedActivity}
      />
    </section>
  );
}
