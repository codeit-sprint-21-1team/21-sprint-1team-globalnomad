import z from "zod";

export const signInFormSchema = z.object({
  email: z
    .string()
    .nonempty("이메일을 입력해주세요.")
    .email("잘못된 이메일 형식입니다."),
  password: z.string().min(1, "비밀번호를 입력해 주세요"),
  rememberEmail: z.boolean().default(false),
});

export type signInValues = z.infer<typeof signInFormSchema>;
