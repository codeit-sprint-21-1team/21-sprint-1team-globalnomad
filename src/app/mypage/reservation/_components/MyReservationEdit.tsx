import { useReservation } from "@/app/(public)/activities/[id]/_components/ReservationCalendar/lib/useReservation";
import { DateTimeStep } from "@/app/(public)/activities/[id]/_components/UpwardPanel/ui/DateTimeStep";
import { HeadcountStep } from "@/app/(public)/activities/[id]/_components/UpwardPanel/ui/HeadcountStep";
import { formatPrice } from "@/commons/utils/etcUtils";

interface EditProps {
  activityId: number;
  price: number;
  initialData: {
    reservationId: number;
    scheduleId: number;
    headcount: number;
    date: string;
  };
  onClose: () => void;
}

export function MyReservationEdit({
  activityId,
  price,
  initialData,
  onClose,
}: EditProps) {
  const res = useReservation(activityId, price, initialData);

  const handleUpdateClick = () => {
    if (!res.selectedSlot) return;

    res.updateReservation({
      scheduleId: res.selectedSlot.id,
      headCount: res.headcount,
    });
    onClose();
  };

  const isButtonDisabled = !res.selectedSlot || res.isUpdating;

  return (
    <div className="w-[273px] h-[450px] md:w-[400px] md:h-[485px] xl:w-[630px] xl:h-[550px] flex flex-col text-[14px] md:text-[16px] font-medium text-black break-all">
      <h2 className="text-xl font-bold border-b pb-4 shrink-0">예약 변경</h2>

      <div className="flex-1 overflow-y-auto pr-1 mt-4 scrollbar-hide">
        <div className="flex flex-col [&>div]:!flex-col [&>div]:!w-full gap-8">
          <DateTimeStep
            scheduleMap={res.scheduleMap}
            selectedDate={res.selectedDate}
            toDateStr={res.toDateStr}
            onDayClick={res.handleDayClick}
            timeSlots={res.timeSlots}
            selectedSlot={res.selectedSlot}
            onSelectSlot={res.setSelectedSlot}
            month={res.currentMonth}
            onMonthChange={res.setCurrentMonth}
          />
        </div>

        <div className="border-t pt-6 bg-gray-50 p-4 rounded-lg mt-[20px]">
          <h3 className="font-bold mb-3">인원 수정</h3>
          <HeadcountStep
            headcount={res.headcount}
            onDecrement={() => res.setHeadcount((n) => Math.max(1, n - 1))}
            onIncrement={() => res.setHeadcount((n) => n + 1)}
            onBack={() => {}}
            isNotBack={true}
          />
          <div className="mt-[25px] flex justify-between items-center font-bold">
            <span>총 금액</span>
            <span className="text-blue-600">
              ₩{formatPrice(res.totalPrice)}
            </span>
          </div>
        </div>

        <button
          className={`w-full py-4 bg-[#3D9EF2] text-white rounded-xl font-bold transition-colors mt-[20px] ${
            isButtonDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#3D9EF2] text-white hover:bg-[#2b8cd9]"
          }`}
          onClick={handleUpdateClick}
          disabled={isButtonDisabled}
        >
          {res.isUpdating ? "변경 중..." : "예약 변경 완료"}
        </button>
      </div>
    </div>
  );
}
