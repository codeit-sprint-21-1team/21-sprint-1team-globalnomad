import * as z from "zod";
import { format } from "date-fns";

// 5Mb 제한 //
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const imageSchema = z.union([
  z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "파일 크기는 5MB 이하여야 합니다.",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "jpg, png, webp 형식의 이미지 파일만 가능합니다.",
    }),
  z.string(),
]);

export const myActivityFormSchema = z.object({
  title: z.string().min(5, { message: "제목은 5자 이상이어야 합니다." }),
  category: z.string().min(1, { message: "카테고리를 선택해주세요." }),
  description: z.string().min(1, { message: "설명을 입력해주세요." }),
  price: z
    .string()
    .min(1, { message: "최소 1원 이상 입력해주세요." })
    .refine(
      (val) => {
        const num = Number(val.replace(/,/g, ""));
        return !isNaN(num) && num >= 1;
      },
      {
        message: "최소 1원 이상 입력해주세요.",
      },
    ),
  address: z.string().min(1, { message: "주소를 입력해주세요." }),
  schedules: z
    .array(
      z.object({
        date: z
          .any()
          .nullable()
          .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
            message: "날짜를 선택해주세요.",
          }),
        startTime: z.string().min(1, { message: "시작 시간 필수" }),
        endTime: z.string().min(1, { message: "종료 시간 필수" }),
      }),
    )
    .min(1)
    .superRefine((items, ctx) => {
      const now = new Date();
      const todayStr = format(now, "yyyy-MM-dd");
      const currentHour = now.getHours();

      items.forEach((item, index) => {
        if (!item.date || !item.startTime || !item.endTime) return;

        const itemDateStr = format(item.date, "yyyy-MM-dd");
        const isToday = itemDateStr === todayStr;
        // const isPastDate = itemDateStr < todayStr;

        const startHour = parseInt(item.startTime.split(":")[0]);
        const endHour = parseInt(item.endTime.split(":")[0]);

        if (isToday && startHour <= currentHour) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "현재 시간 이후로만 선택 가능합니다.",
            path: [index, "startTime"],
          });
        }

        if (startHour >= endHour) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "시작 시간은 종료 시간보다 빨라야 합니다.",
            path: [index, "startTime"],
          });
        }

        const currentStart = parseInt(item.startTime.replace(":", ""));
        const currentEnd = parseInt(item.endTime.replace(":", ""));

        const isTimeOverlap = items.some((compare, i) => {
          if (i === index) return false;
          if (!compare.date || !compare.startTime || !compare.endTime)
            return false;

          const isSameDate =
            format(compare.date, "yyyy-MM-dd") ===
            format(item.date, "yyyy-MM-dd");

          if (!isSameDate) return false;

          const compareStart = parseInt(compare.startTime.replace(":", ""));
          const compareEnd = parseInt(compare.endTime.replace(":", ""));

          return currentStart < compareEnd && currentEnd > compareStart;
        });

        if (isTimeOverlap) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "중복된 스케줄이 존재합니다.",
            path: [index, "date"],
          });
        }
      });
    }),
  bannerImage: z
    .array(imageSchema)
    .min(1, { message: "배너 이미지를 등록해주세요." }),
  subImages: z.array(imageSchema),
  videoUrl: z.string().optional(),
});

export type MyActivityFormValues = z.infer<typeof myActivityFormSchema>;
