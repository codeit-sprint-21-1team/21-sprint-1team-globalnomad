import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema, SignUpRequest, SignUpValues } from "./signup.schema";
import { usePasswordStrength } from "@/components/ui/PasswordStrengthBar";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { handleApiError } from "@/commons/utils/handleApiError";
import { postSignup } from "@/apis/auth.api";
import { useDialog } from "@/components/ui/Dialog";
import { useRouter } from "next/navigation";

export function useSignup() {
  const { showDialog } = useDialog();
  const router = useRouter();

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(signUpFormSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      passwordConfirmation: "",
      terms: false,
      passwordScore: 0,
    },
  });

  // eslint-disable-next-line -- React Hook Form의 watch API와 리액트 컴파일러 간의 호환성 이슈로 인한 예외 처리
  const passwordValue = watch("password");
  const { passwordScore } = usePasswordStrength<SignUpValues>(
    passwordValue,
    setValue,
  );
  useEffect(() => {
    if (passwordValue) {
      trigger("password");
    }
  }, [passwordValue, passwordScore, trigger]);

  const { mutate: signupMutation } = useMutation({
    mutationFn: (signUpData: SignUpRequest) => postSignup(signUpData),
    onSuccess: () => {
      showDialog({
        type: "alert",
        content: "가입이 완료되었습니다.",
        onConfirm: () => {
          router.push("/auth/login");
        },
      });
    },
    onError: (error) => {
      const errorMessage = handleApiError(error);
      showDialog({
        type: "alert",
        content: errorMessage,
      });
    },
  });

  const onSubmit = (data: SignUpValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { terms, passwordConfirmation, passwordScore, ...signUpData } = data;
    signupMutation(signUpData);
  };

  return {
    register,
    control,
    errors,
    isValid,
    onFormSubmit: handleSubmit(onSubmit),
    passwordScore,
  };
}
