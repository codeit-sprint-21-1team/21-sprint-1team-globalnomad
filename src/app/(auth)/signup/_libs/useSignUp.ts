import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema, SignUpValues } from "./signup.schema";
import { usePasswordStrength } from "@/components/ui/PasswordStrengthBar";
import { useEffect } from "react";

export function useSignup() {
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

  const passwordValue = watch("password");
  const { passwordScore } = usePasswordStrength<SignUpValues>(
    passwordValue,
    setValue,
  );
  useEffect(() => {
    if (passwordValue) {
      trigger("password");
    }
  }, [passwordScore, trigger]);

  const onSubmit = (data: SignUpValues) => {
    console.log(data);
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
