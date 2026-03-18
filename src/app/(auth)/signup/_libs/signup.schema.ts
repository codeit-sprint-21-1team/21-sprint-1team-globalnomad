import z from "zod";

export const signUpFormSchema = z
  .object({
    email: z
      .string()
      .nonempty("이메일을 입력해주세요.")
      .email("잘못된 이메일 형식입니다."),
    nickname: z
      .string()
      .nonempty("닉네임을 입력해주세요.")
      .max(10, "닉네임은 10자 이하로 작성해주세요."),
    password: z
      .string()
      .nonempty("비밀번호를 입력해주세요.")
      .min(8, "비밀번호를 8자 이상 입력해주세요."),
    passwordConfirmation: z.string().nonempty("비밀번호 확인을 입력해주세요."),
    terms: z.boolean().refine((val) => val === true, {
      message: "이용약관에 동의해주세요.",
    }),
    passwordScore: z.number(),
  })
  .refine((data) => data.passwordScore >= 4, {
    message: "비밀번호 보안 강도를 높여주세요.",
    path: ["password"],
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirmation"],
  });

export type SignUpValues = z.infer<typeof signUpFormSchema>;

export type SignUpRequest = Omit<
  SignUpValues,
  "terms" | "passwordConfirmation" | "passwordScore"
>;
