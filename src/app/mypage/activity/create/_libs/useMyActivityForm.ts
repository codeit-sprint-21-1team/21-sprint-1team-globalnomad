"use client";

import { getActivityDetail } from "@/apis/activities.api";
import {
  myActivityFormSchema,
  MyActivityFormValues,
} from "@/app/mypage/activity/create/_libs/myActivityForm.schema";
import { useDialog } from "@/components/ui/Dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { CATEGORY_OPTIONS } from "../../../../../commons/consts/activities";
import {
  createMyActivity,
  postUploadImageMyActivity,
  updateMyActivity,
} from "@/apis/myActivities.api";
import { format } from "date-fns";
import {
  ActivityDetail,
  CreateActivityRequest,
  CreateActivityResponse,
  UpdateActivityRequest,
} from "@/types/myActivities.type";
import axios from "axios";
import { useEffect } from "react";
import { PostcodeData } from "@/types/window";

interface UseMyActivityFormProps {
  mode: "register" | "edit";
  activityId?: number | null;
}

export const useMyActivityForm = ({
  mode,
  activityId,
}: UseMyActivityFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { showDialog } = useDialog();

  const { data: initialData } = useQuery({
    queryKey: ["activity", activityId],
    queryFn: () => getActivityDetail(activityId as number),
    enabled: mode === "edit" && !!activityId,
  });

  // TODO:: 제거
  console.log("서버에서 온 원본 데이터:", initialData);

  const formMethods = useForm<MyActivityFormValues>({
    resolver: zodResolver(myActivityFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    values:
      mode === "edit" && initialData
        ? {
            ...initialData,
            price: initialData.price.toLocaleString(),
            category:
              CATEGORY_OPTIONS.find((opt) => opt.label === initialData.category)
                ?.value || initialData.category,
            schedules: (initialData as ActivityDetail).schedules.map((s) => ({
              id: s.id,
              date: new Date(s.date),
              startTime: s.startTime,
              endTime: s.endTime,
            })),
            bannerImage: [initialData.bannerImageUrl],
            subImages: (initialData.subImages || []).map((img: unknown) =>
              typeof img === "string"
                ? img
                : (img as { imageUrl: string }).imageUrl,
            ),
          }
        : undefined,
    defaultValues: {
      title: "",
      category: "",
      description: "",
      price: "",
      address: "",
      schedules: [{ date: null, startTime: "", endTime: "" }],
      bannerImage: [],
      subImages: [],
    },
  });

  const { control, setValue, handleSubmit, trigger, watch, reset, getValues } =
    formMethods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedules",
  });

  const addSchedule = () => append({ date: null, startTime: "", endTime: "" });
  const removeSchedule = async (index: number) => {
    remove(index);
    await trigger("schedules");
  };

  const handleAddressSearch = () => {
    if (window.daum?.Postcode) {
      new window.daum.Postcode({
        oncomplete: (data: PostcodeData) => {
          setValue("address", data.address);
          trigger("address");
        },
      }).open();
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (finalData: unknown) => {
      if (mode === "edit" && activityId) {
        return updateMyActivity(
          Number(activityId),
          finalData as UpdateActivityRequest,
        );
      }
      return createMyActivity(finalData as CreateActivityRequest);
    },
    onSuccess: (data: CreateActivityResponse) => {
      queryClient.invalidateQueries({ queryKey: ["myActivities"] });
      queryClient.invalidateQueries({ queryKey: ["activity", data.id] });
      const successMessage =
        mode === "edit"
          ? "수정이 완료되었습니다!"
          : "체험 등록이 완료되었습니다!";
      showDialog({
        type: "alert",
        content: successMessage,
        onConfirm: () => {
          reset(getValues());
          window.location.replace(`/activities/${data.id}`);
        },
      });
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          mode === "edit"
            ? "수정에 실패했습니다."
            : "체험 등록에 실패했습니다.";

        showDialog({
          type: "alert",
          content: error.response?.data?.message || errorMessage,
        });
      } else {
        console.error(error);
      }
    },
  });

  const onSubmit = async (data: MyActivityFormValues) => {
    try {
      const typedInitialData = initialData as ActivityDetail;

      const bannerImageInput = data.bannerImage[0];
      const bannerImageUrl =
        bannerImageInput instanceof File
          ? (await postUploadImageMyActivity(bannerImageInput)).activityImageUrl
          : (bannerImageInput as string);

      const selectedCategoryLabel =
        CATEGORY_OPTIONS.find((opt) => opt.value === data.category)?.label ||
        data.category;

      // TODO:: 추후 작업 (유튜브)
      // const separator = "||VIDEO_URL||";
      // const finalDescription = data.videoUrl
      //   ? `${data.description}${separator}${data.videoUrl}`
      //   : data.description;

      // edit
      if (mode === "edit" && typedInitialData) {
        const subImageUrlsToAdd = await Promise.all(
          data.subImages
            .filter((img): img is File => img instanceof File)
            .map(
              async (file) =>
                (await postUploadImageMyActivity(file)).activityImageUrl,
            ),
        );

        const subImageIdsToRemove = typedInitialData.subImages
          .filter((oldImg) => !data.subImages.includes(oldImg.imageUrl))
          .map((oldImg) => oldImg.id);

        const schedulesToAdd = data.schedules
          .filter((s) => !("id" in s))
          .map((s) => ({
            date: format(s.date as Date, "yyyy-MM-dd"),
            startTime: s.startTime,
            endTime: s.endTime,
          }));

        const currentScheduleIds = data.schedules
          .filter(
            (
              s,
            ): s is {
              id: number;
              date: string | Date | null;
              startTime: string;
              endTime: string;
            } => "id" in s,
          )
          .map((s) => s.id);

        const scheduleIdsToRemove = typedInitialData.schedules
          .filter((oldS) => !currentScheduleIds.includes(oldS.id))
          .map((oldS) => oldS.id);

        const finalUpdateData: UpdateActivityRequest = {
          title: data.title,
          category: selectedCategoryLabel,
          // TODO:: 추후 작업 (유튜브)
          // description: finalDescription,
          description: data.description,
          address: data.address,
          price: Number(String(data.price).replace(/,/g, "")),
          bannerImageUrl,
          subImageIdsToRemove,
          subImageUrlsToAdd,
          scheduleIdsToRemove,
          schedulesToAdd,
        };
        // TODO:: 추후 작업
        // console.log("edit finalUpdateData::", finalUpdateData);

        mutate({
          ...finalUpdateData,
          id: Number(activityId),
        });
      } else {
        // register
        const subImageUrls = await Promise.all(
          data.subImages.map(async (img) => {
            if (img instanceof File)
              return (await postUploadImageMyActivity(img)).activityImageUrl;
            return img as string;
          }),
        );

        // TODO:: 추후 작업
        // console.log("register data::", data, finalDescription);

        mutate({
          title: data.title,
          category: selectedCategoryLabel,
          // TODO:: 추후 작업 (유튜브)
          // description: finalDescription,
          description: data.description,
          address: data.address,
          price: Number(String(data.price).replace(/,/g, "")),
          bannerImageUrl,
          subImageUrls: subImageUrls,
          schedules: data.schedules.map((s) => ({
            date: format(s.date as Date, "yyyy-MM-dd"),
            startTime: s.startTime,
            endTime: s.endTime,
          })),
        });
      }
    } catch (error) {
      console.error("체험 등록 실패:", error);

      showDialog({
        type: "alert",
        content: axios.isAxiosError(error)
          ? error.response?.data?.message
          : "데이터 처리 중 오류가 발생했습니다.",
      });
    }
  };

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      showDialog({
        type: "confirm",
        content: "저장되지 않았습니다.\n 정말 뒤로 가시겠습니까?",
        onConfirm: () => {
          window.removeEventListener("popstate", handlePopState);
          window.history.go(-2);
        },
        onCancel: () => {
          window.history.pushState(null, "", window.location.href);
          console.log("취소버튼클릭");
        },
      });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [router, showDialog]);

  return {
    formMethods,
    fields,
    addSchedule,
    removeSchedule,
    handleAddressSearch,
    onSubmit,
    isPending,
    control,
    register: formMethods.register,
    handleSubmit,
    watch,
    trigger,
    append,
    remove,
    errors: formMethods.formState.errors,
  };
};
