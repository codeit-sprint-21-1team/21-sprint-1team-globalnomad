"use client";

import { cn } from "@/commons/utils/cn";
import { useViewport } from "@/commons/hooks/useViewport";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/Drawer/Drawer";
import { X } from "lucide-react";
import ReservationDetailContent from "./ReservationDetailContent";
import type {
  ReservationMutationStatus,
  ReservationStatusFilter,
  ReservationWithUserItem,
  ReservedScheduleItem,
} from "@/types/myActivities.type";

interface ReservationDetailDrawerProps {
  selectedDate: string | null;
  onClose: () => void;
  // Panel Props
  isMutating: boolean;
  reservations: ReservationWithUserItem[];
  schedules: ReservedScheduleItem[];
  selectedScheduleId: number | null;
  selectedStatus: ReservationStatusFilter | null;
  statusLabels: Record<ReservationStatusFilter, string>;
  onScheduleSelect: (scheduleId: number) => void;
  onStatusSelect: (status: ReservationStatusFilter) => void;
  onReservationAction: (
    reservationId: number,
    status: ReservationMutationStatus,
  ) => void;
}

export default function ReservationDetailDrawer({
  selectedDate,
  onClose,
  ...panelProps
}: ReservationDetailDrawerProps) {
  const { isDesktop } = useViewport();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  if (!selectedDate) {
    return null;
  }

  // formats "YYYY-MM-DD" into "YY년 M월 D일"
  const formattedTitle = (() => {
    try {
      const [year, month, day] = selectedDate.split("-");
      return `${year.slice(2)}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
    } catch {
      return selectedDate;
    }
  })();

  return (
    <Drawer
      direction={isDesktop ? "right" : "bottom"}
      open={!!selectedDate}
      onOpenChange={handleOpenChange}
    >
      <DrawerContent
        className={cn(
          "outline-none bg-white",
          isDesktop ? "p-6" : "p-[24px] rounded-t-[30px]",
        )}
      >
        <DrawerHeader className="relative pb-6 flex items-center justify-between text-left p-0 flex-row mb-[30px]">
          <DrawerTitle className="text-[20px] font-bold text-[#1B1B1B] tracking-[-0.025em]">
            {formattedTitle}
          </DrawerTitle>
          <DrawerClose className="rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-6 h-6 text-[#1B1B1B]" strokeWidth={2.5} />
          </DrawerClose>
        </DrawerHeader>
        <div className="flex-1 overflow-x-hidden overflow-y-auto w-full pb-8 scrollbar-hide flex flex-col gap-[30px]">
          <ReservationDetailContent {...panelProps} isDesktop={isDesktop} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
