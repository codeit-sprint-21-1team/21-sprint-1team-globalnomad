import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { usePasswordStrength } from "@/components/ui/PasswordStrengthBar";
import {
  userProfileFormSchema,
  userPasswordFormSchema,
  userPasswordValues,
  userProfileValues,
} from "./userInfo.schema";
import { useAuth } from "@/commons/contexts/AuthContext";
import z from "zod";

export function useUserInfo() {
  const { user } = useAuth();
  useQueryClient();

  const userProfileForm = useForm<z.infer<typeof userProfileFormSchema>>({
    resolver: zodResolver(userProfileFormSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      profileImageUrl: "",
      nickname: "",
    },
  });

  const userPasswordForm = useForm<z.infer<typeof userPasswordFormSchema>>({
    resolver: zodResolver(userPasswordFormSchema),
    mode: "onTouched",
    defaultValues: {
      newPassword: "",
      passwordConfirmation: "",
      passwordScore: 0,
    },
  });

  const {
    reset: resetProfile,
    watch: watchProfile,
    handleSubmit: handleSubmitProfile,
  } = userProfileForm;

  const {
    reset: resetPassword,
    watch: watchPassword,
    setValue: setPasswordValue,
    trigger: triggerPassword,
    handleSubmit: handleSubmitPassword,
  } = userPasswordForm;

  useEffect(() => {
    if (user) {
      resetProfile({
        email: user.email ?? "",
        profileImageUrl: user.profileImageUrl ?? "",
        nickname: user.nickname ?? "",
      });

      resetPassword({
        newPassword: "",
        passwordConfirmation: "",
        passwordScore: 0,
      });
    }
  }, [user, resetProfile, resetPassword]);

  // eslint-disable-next-line -- React Hook Form의 watch API와 리액트 컴파일러 간의 호환성 이슈로 인한 예외 처리
  const profileImageUrl = watchProfile("profileImageUrl");

  const passwordValue = watchPassword("newPassword");
  const { passwordScore } = usePasswordStrength<userPasswordValues>(
    passwordValue,
    setPasswordValue,
  );
  useEffect(() => {
    if (passwordValue) {
      triggerPassword("newPassword");
    }
  }, [passwordScore, passwordValue, triggerPassword]);

  const onProfileSubmit = (data: userProfileValues) => {
    console.log(data);
  };

  const onPasswordSubmit = (data: userPasswordValues) => {
    console.log(data);
  };

  return {
    userProfileForm,
    userPasswordForm,
    onProfileFormSubmit: handleSubmitProfile(onProfileSubmit),
    onPasswordFormSubmit: handleSubmitPassword(onPasswordSubmit),
    profileImageUrl,
    passwordScore,
  };
}
