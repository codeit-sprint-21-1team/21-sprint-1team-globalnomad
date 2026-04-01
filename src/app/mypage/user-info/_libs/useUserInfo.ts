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
  UpdateUserRequest,
} from "./userInfo.schema";
import { patchUserMe, postUserMeImage } from "@/apis/users.api";
import { useDialog } from "@/components/ui/Dialog";
import { handleApiError } from "@/commons/utils/handleApiError";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  const { showDialog } = useDialog();

  return useMutation({
    mutationFn: (updateUserData: UpdateUserRequest) =>
      patchUserMe(updateUserData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      showDialog({
        type: "alert",
        content: "내 정보가 수정되었습니다.",
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
};

export function useUserProfile() {
  const { user } = useAuth();
  const { mutate: updateInfo, isPending } = useUpdateUserMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [blobUrl, setBlobUrl] = useState<string>("");
  const previewUrl = blobUrl || user?.profileImageUrl || "";
  const { showDialog } = useDialog();

  const userProfileForm = useForm<z.infer<typeof userProfileFormSchema>>({
    resolver: zodResolver(userProfileFormSchema),
    mode: "onChange",
    values: {
      imageFile: null,
      email: user?.email ?? "",
      nickname: user?.nickname ?? "",
    },
  });

  const {
    setValue,
    reset: resetProfile,
    handleSubmit: handleSubmitProfile,
  } = userProfileForm;

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    if (blobUrl) URL.revokeObjectURL(blobUrl);
    const newUrl = URL.createObjectURL(selectedFile);
    setBlobUrl(newUrl);

    setValue("imageFile", selectedFile, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleProfileFormReset = () => {
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setBlobUrl("");
    resetProfile();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  const { mutateAsync: updateUserProfileImage, isPending: isImageUploading } =
    useMutation({
      mutationFn: (updateUserFile: File) => postUserMeImage(updateUserFile),
      onError: (error) => {
        const errorMessage = handleApiError(error);
        showDialog({
          type: "alert",
          content: errorMessage,
        });
      },
    });

  const onProfileSubmit = async (data: userProfileValues) => {
    const updateProfileData: UpdateUserRequest = {};

    if (data.nickname !== user?.nickname) {
      updateProfileData.nickname = data.nickname;
    }

    if (data.imageFile && previewUrl !== (user?.profileImageUrl || "")) {
      const imageUrl = await updateUserProfileImage(data.imageFile);
      updateProfileData.profileImageUrl = imageUrl;
    }

    if (Object.keys(updateProfileData).length > 0) {
      updateInfo(updateProfileData);
    }
  };

  return {
    userProfileForm,
    onProfileFormSubmit: handleSubmitProfile(onProfileSubmit),
    onProfileFormReset: handleProfileFormReset,
    imageProps: {
      previewUrl,
      fileInputRef,
      onImageButtonClick: handleImageButtonClick,
      onImageFileChange: handleImageFileChange,
    },
    isSubmitting: isImageUploading || isPending,
  };
}

export function useUserPassword() {
  const { mutate: updateInfo, isPending } = useUpdateUserMutation();

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
    watch: watchPassword,
    setValue: setPasswordValue,
    trigger: triggerPassword,
    reset: resetPassword,
    handleSubmit: handleSubmitPassword,
  } = userPasswordForm;

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

  const onPasswordSubmit = (data: userPasswordValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirmation, passwordScore, ...updatePasswordData } = data;
    updateInfo(updatePasswordData, {
      onSuccess: () => {
        resetPassword({
          newPassword: "",
          passwordConfirmation: "",
          passwordScore: 0,
        });
      },
    });
  };

  return {
    userPasswordForm,
    onPasswordFormSubmit: handleSubmitPassword(onPasswordSubmit),
    passwordScore,
    isSubmitting: isPending,
  };
}
