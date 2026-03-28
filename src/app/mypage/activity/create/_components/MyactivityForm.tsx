"use client";

import {
  Controller,
  Control,
  FieldValues,
  UseFormWatch,
  Path,
} from "react-hook-form";
import Script from "next/script";
import { DateInputPicker } from "@/components/ui/DateInputPicker/DateInputPicker";
import { Input } from "@/components/ui/Input/Input";
import { LabeledSelect } from "@/components/ui/Select/Select";
import ImageUploader from "./ImageUploader";
import { Button } from "@/components/ui/Buttons/Button";
import { CATEGORY_OPTIONS } from "@/commons/consts/activities";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/commons/utils/cn";
import ScheduleTimeRow from "./ScheduleTimeRow";
import { useMyActivityForm } from "@/app/mypage/activity/create/_libs/useMyActivityForm";

interface MyactivityFormProp {
  mode?: "register" | "edit";
  activityId?: number | null;
}

export default function MyactivityForm({
  mode = "register",
  activityId,
}: MyactivityFormProp) {
  const {
    fields,
    addSchedule,
    removeSchedule,
    handleAddressSearch,
    onSubmit,
    isPending,
    control,
    register,
    handleSubmit,
    watch,
    trigger,
    errors,
  } = useMyActivityForm({ mode, activityId });

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) =>
          console.log("검증실패원인::", errors),
        )}
      >
        <div className="flex flex-col w-full gap-[24px] font-bold text-[18px] text-[#1F1F22]">
          <div className="py-[10px]">
            {mode === "register" ? "내 체험 등록" : "내 체험 수정"}
          </div>

          <Input
            labelTxt="제목"
            {...register("title")}
            errorTxt={errors.title?.message}
            placeholder="제목을 입력해 주세요"
          />

          <Controller
            name="category"
            control={control}
            render={({ field, fieldState }) => (
              <LabeledSelect
                key={field.value || "empty"}
                labelTxt="카테고리"
                items={CATEGORY_OPTIONS}
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                errorTxt={fieldState.error?.message}
                className="h-[54px] border-[#E0E0E5]"
                placeholder="카테고리를 선택해주세요"
              />
            )}
          />

          <div className="flex flex-col w-full">
            <label htmlFor="description" className="text-[16px] font-bold">
              설명
            </label>
            <textarea
              id="description"
              {...register("description")}
              className={cn(
                "border rounded-[16px] font-medium text-[16px] text-[#1F1F22] px-[20px] py-[16px] mt-[10px] placeholder:text-[16px] placeholder:font-medium focus-visible:outline-[#3D9EF2]",
                errors.description ? "border-red-500" : "border-[#E0E0E5]",
              )}
              placeholder="체험에 대한 설명을 입력해 주세요"
            ></textarea>
            {errors.description && (
              <p className="mt-2 text-sm text-red-500 leading-tight">
                {errors.description.message}
              </p>
            )}
          </div>

          <Input
            labelTxt="가격"
            inputMode="numeric"
            {...register("price", {
              onChange: (e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                const formattedValue = numericValue.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ",",
                );
                e.target.value = formattedValue;
              },
            })}
            errorTxt={errors.price?.message}
            placeholder="체험 금액을 입력해 주세요"
          />

          <Input
            labelTxt="주소"
            readOnly
            onClick={handleAddressSearch}
            {...register("address")}
            errorTxt={errors.address?.message}
            placeholder="주소를 입력해 주세요"
            className="cursor-pointer"
          />
          <div className="mt-[6px]">
            <div className="text-[16px] font-bold ">예약 가능한 시간대</div>

            <div className="flex flex-col w-full">
              <div className="flex flex-col w-full">
                {fields.map((field, index) => (
                  <div key={field.id}>
                    <div className="flex flex-col md:flex-row mb-[18px] items-start justify-start">
                      <div className="w-full md:w-[44%] xl:w-[47%] shrink-0">
                        <Controller
                          name={`schedules.${index}.date`}
                          control={control}
                          render={({ field, fieldState }) => (
                            <DateInputPicker
                              labelTxt={index === 0 ? "날짜" : ""}
                              value={(field.value as Date) ?? null}
                              onValueChange={field.onChange}
                              onBlur={() => {
                                field.onBlur();
                                trigger(`schedules.${index}.date`);
                              }}
                              errorTxt={fieldState.error?.message}
                            />
                          )}
                        />
                      </div>

                      <div
                        className={cn(
                          "flex w-full md:flex-1",
                          "mt-[6px]",
                          index !== 0 && "md:mt-[0] xl:mt-[0]",
                          "md:ml-[14px] items-start gap-[8px] flex-nowrap",
                        )}
                      >
                        <ScheduleTimeRow
                          key={field.id}
                          index={index}
                          control={control as unknown as Control<FieldValues>}
                          watch={watch as unknown as UseFormWatch<FieldValues>}
                          trigger={
                            trigger as unknown as (
                              name?: Path<FieldValues> | Path<FieldValues>[],
                            ) => Promise<boolean>
                          }
                        />

                        {index === 0 ? (
                          <button
                            type="button"
                            onClick={addSchedule}
                            className="flex items-center justify-center min-w-[42px] min-h-[42px] bg-[#3D9EF2] rounded-full text-white mt-[4px] md:mt-[30px] ml-[4px] shrink-0"
                          >
                            <Plus size={18} strokeWidth={3} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => removeSchedule(index)}
                            className="flex items-center justify-center min-w-[42px] min-h-[42px] bg-[#EDEEF2] rounded-full text-black mt-[4px] ml-[4px] shrink-0"
                          >
                            <Minus size={18} strokeWidth={3} />
                          </button>
                        )}
                      </div>
                    </div>

                    {index === 0 && fields.length > 1 && (
                      <div className="w-full h-[1px] bg-[#E0E0E5] my-[20px]"></div>
                    )}
                  </div>
                ))}
              </div>

              <Input
                labelTxt="동영상 주소"
                {...register("videoUrl")}
                errorTxt={errors.videoUrl?.message}
                placeholder="주소를 입력해 주세요"
                className="mb-[24px]"
                optional={true}
                disabled={true} // 유튜브시 삭제
              />

              <div className="text-[16px] font-bold bg-#1F1F22 mb-[10px]">
                배너 이미지 등록
              </div>
              <Controller
                name="bannerImage"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <ImageUploader
                      maxCount={1}
                      value={field.value}
                      onChange={(files) => {
                        field.onChange(files);
                        trigger("bannerImage");
                      }}
                    />
                    {fieldState.error && (
                      <p className="mt-2 text-sm text-red-500">
                        {fieldState.error?.message ||
                          (
                            fieldState.error as unknown as { message: string }[]
                          )?.[0]?.message}
                      </p>
                    )}
                  </>
                )}
              />

              <div className="text-[16px] font-bold bg-#1F1F22 mt-[30px] mb-[10px]">
                소개 이미지 등록
                <span className="text-blue-400 text-[14px] ml-[5px]">
                  (선택)
                </span>
              </div>
              <Controller
                name="subImages"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <ImageUploader
                      value={field.value}
                      onChange={(files) => {
                        field.onChange(files);
                        trigger("subImages");
                      }}
                    />
                    {fieldState.error && (
                      <p className="mt-2 text-sm text-red-500">
                        {fieldState.error?.message ||
                          (
                            fieldState.error as unknown as { message: string }[]
                          )?.[0]?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <Button
              type="submit"
              disabled={isPending}
              className="w-[120px] h-[41px]"
            >
              {isPending
                ? "처리 중..."
                : mode === "register"
                  ? "등록 하기"
                  : "수정 하기"}
            </Button>
          </div>
        </div>
      </form>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
    </div>
  );
}
