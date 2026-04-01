import { Reservation } from "@/types/myReservations.type";
import { Activity } from "@/types/myActivities.type";
import MostReservationCard from "./MostReservationCard";
import MostActivityCard from "./MostActivityCard";

interface ReportListPropsType {
  reservationData: Reservation[];
  activityData: Activity[];
}

export default function ReportList({
  reservationData = [],
  activityData = [],
}: ReportListPropsType) {
  return (
    <div className="flex justify-center items-center flex-col md:flex-row gap-[24px]">
      <MostReservationCard reservationData={reservationData} />
      <MostActivityCard activityData={activityData} />
    </div>
  );
}
