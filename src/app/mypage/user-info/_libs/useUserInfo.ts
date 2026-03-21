import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/commons/contexts/AuthContext";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { usePasswordStrength } from "@/components/ui/PasswordStrengthBar";
import {
  userProfileFormSchema,
  userPasswordFormSchema,
  userPasswordValues,
  userProfileValues,
} from "./userInfo.schema";

export function useUserInfo() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    user?.profileImageUrl || "",
  );

  const userProfileForm = useForm<z.infer<typeof userProfileFormSchema>>({
    resolver: zodResolver(userProfileFormSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      imageFile: null,
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
    setValue,
    reset: resetProfile,
    handleSubmit: handleSubmitProfile,
  } = userProfileForm;

  const {
    watch: watchPassword,
    setValue: setPasswordValue,
    trigger: triggerPassword,
    handleSubmit: handleSubmitPassword,
  } = userPasswordForm;

  useEffect(() => {
    if (user) {
      resetProfile({
        email: user.email ?? "",
        nickname: user.nickname ?? "",
      });
    }
  }, [user, resetProfile]);

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    const blobUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(blobUrl);
    setValue("imageFile", selectedFile, { shouldDirty: true });
  };

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // eslint-disable-next-line -- React Hook Form의 watch API와 리액트 컴파일러 간의 호환성 이슈로 인한 예외 처리
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
    passwordScore,
    imageProps: {
      previewUrl,
      fileInputRef,
      onImageButtonClick: handleImageButtonClick,
      onImageFileChange: handleImageFileChange,
    },
  };
}
