import { cn } from "@/commons/utils/cn";
import { LabeledSelect } from "@/components/ui/Select/Select";
import {
  Control,
  UseFormWatch,
  Controller,
  FieldValues,
  Path,
} from "react-hook-form";
import { format } from "date-fns";

const options_time = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  const time = `${hour}:00`;
  return { value: time, label: time };
});

interface ScheduleTimeRowProps<T extends FieldValues = FieldValues> {
  index: number;
  control: Control<T>;
  watch: UseFormWatch<T>;
  trigger: (name?: Path<T> | Path<T>[]) => Promise<boolean>;
}

export default function ScheduleTimeRow<T extends FieldValues>({
  index,
  control,
  watch,
  trigger,
}: ScheduleTimeRowProps<T>) {
  const selectedDate = watch(`schedules.${index}.date` as Path<T>);
  const startTimeValue = watch(`schedules.${index}.startTime` as Path<T>);
  const endTimeValue = watch(`schedules.${index}.endTime` as Path<T>);

  const now = new Date();
  const todayStr = format(now, "yyyy-MM-dd");
  const selectedDateStr = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : "";

  const isToday = selectedDateStr === todayStr;
  const isPastDate = selectedDateStr !== "" && selectedDateStr < todayStr;

  const currentHour = now.getHours();
  const isClosed = isPastDate || (isToday && currentHour >= 23);

  const filteredStartOptions = options_time.filter((option) => {
    const isCurrentSelection = option.value === startTimeValue;
    if (isPastDate) return isCurrentSelection;
    if (!isToday) return true;

    const optionHour = parseInt(option.value.split(":")[0]);
    const isFuture = optionHour > currentHour;

    return isFuture || isCurrentSelection;
  });

  const filteredEndOptions = options_time.filter((option) => {
    const isCurrentSelection = option.value === endTimeValue;

    if (isPastDate) return isCurrentSelection;

    const optionHour = parseInt(option.value.split(":")[0]);

    if (isToday && optionHour <= currentHour && !isCurrentSelection)
      return false;

    if (startTimeValue) {
      const startHour = parseInt(startTimeValue.split(":")[0]);
      return optionHour > startHour || isCurrentSelection;
    }
    return true;
  });

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex w-full items-start gap-[10px]">
          <div className="flex-1">
            <Controller
              name={`schedules.${index}.startTime` as Path<T>}
              control={control}
              render={({ field, fieldState }) => (
                <LabeledSelect
                  key={`${selectedDate?.getTime()}-${isClosed}`}
                  labelTxt={index === 0 ? "시작 시간" : ""}
                  items={filteredStartOptions}
                  value={(field.value as string) || undefined}
                  onBlur={field.onBlur}
                  onValueChange={(val) => {
                    field.onChange(val);
                    trigger(`schedules.${index}.endTime` as Path<T>);
                    trigger("schedules" as Path<T>);
                  }}
                  errorTxt={isClosed ? "선택 불가" : fieldState.error?.message}
                  className="w-full h-[54px]"
                  maxHeight="max-h-[200px]"
                  placeholder="0:00"
                  disabled={isClosed || filteredStartOptions.length === 0}
                />
              )}
            />
          </div>
          <div
            className={cn(
              "flex h-[54px] items-center text-[20px] font-bold text-gray-500",
              index === 0 ? "mt-0 md:mt-[26px]" : "mt-0",
            )}
          >
            -
          </div>
          <div className="flex-1">
            <Controller
              name={`schedules.${index}.endTime` as Path<T>}
              control={control}
              render={({ field, fieldState }) => (
                <LabeledSelect
                  key={`${selectedDate?.getTime()}-${isClosed}`}
                  labelTxt={index === 0 ? "종료 시간" : ""}
                  items={filteredEndOptions}
                  value={(field.value as string) || undefined}
                  onValueChange={(val) => {
                    field.onChange(val);
                    trigger(`schedules.${index}.startTime` as Path<T>);
                    trigger("schedules" as Path<T>);
                  }}
                  onBlur={field.onBlur}
                  errorTxt={isClosed ? "선택 불가" : fieldState.error?.message}
                  className="w-full h-[54px]"
                  maxHeight="max-h-[200px]"
                  placeholder="0:00"
                  disabled={isClosed || filteredEndOptions.length === 0}
                />
              )}
            />
          </div>
        </div>
        <div className="mt-1 text-sm text-red-500 leading-tight">
          {isPastDate
            ? "지난 날짜의 스케줄은 수정하거나 선택할 수 없습니다."
            : isClosed
              ? "23시 이후 마감된 시간이거나 지난 시간입니다."
              : ""}
        </div>
      </div>
    </>
  );
}
