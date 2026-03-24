import z from "zod";

export const userProfileFormSchema = z.object({
  imageFile: z
    .instanceof(File)
    .nullable()
    .optional()
    .superRefine((file, ctx) => {
      if (!file) return;

      const ACCEPTED_TYPES = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!ACCEPTED_TYPES.includes(file.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "JPG, PNG, WEBP 형식의 이미지만 업로드 가능합니다.",
        });
      }

      if (file.size > 5 * 1024 * 1024) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "파일 크기는 최대 5MB를 넘을 수 없습니다.",
        });
      }
    }),
  email: z.string(),
  nickname: z
    .string()
    .min(1, "닉네임을 입력해주세요.")
    .max(10, "닉네임은 10자 이하로 작성해주세요."),
});
export type userProfileValues = z.infer<typeof userProfileFormSchema>;

export const userPasswordFormSchema = z
  .object({
    newPassword: z
      .string()
      .nonempty("비밀번호를 입력해주세요.")
      .min(8, "비밀번호를 8자 이상 입력해주세요."),
    passwordConfirmation: z.string().nonempty("비밀번호 확인을 입력해주세요."),
    passwordScore: z.number(),
  })
  .refine((data) => data.passwordScore >= 3, {
    message: "8~16자의 영문 소문자, 숫자, 특수문자를 조합하여 설정해 주세요.",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.passwordConfirmation, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirmation"],
  });
export type userPasswordValues = z.infer<typeof userPasswordFormSchema>;

export interface UpdateUserRequest {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
}
