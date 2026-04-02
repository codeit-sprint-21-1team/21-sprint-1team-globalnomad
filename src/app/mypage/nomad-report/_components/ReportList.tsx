import { Activity } from "@/types/activities";
import MostReservationCard from "./MostReservationCard";
import MostActivityCard from "./MostActivityCard";

interface ReportListPropsType {
  user: string;
  mostReservation: {
    data: Activity | undefined;
    count: number;
  };
  mostActivity: {
    data: Activity | undefined;
    count: number;
  };
}

export default function ReportList({
  user,
  mostReservation,
  mostActivity,
}: ReportListPropsType) {
  return (
    <div className="flex justify-center items-center flex-col md:flex-row gap-[24px]">
      <MostReservationCard
        user={user || ""}
        mostReservation={mostReservation}
      />
      <MostActivityCard user={user || ""} mostActivity={mostActivity} />
    </div>
  );
}
