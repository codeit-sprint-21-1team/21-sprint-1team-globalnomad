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

export function useUserInfo() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    user?.profileImageUrl || "",
  );
  const queryClient = useQueryClient();
  const { showDialog } = useDialog();

  const userProfileForm = useForm<z.infer<typeof userProfileFormSchema>>({
    resolver: zodResolver(userProfileFormSchema),
    mode: "onChange",
    defaultValues: {
      imageFile: null,
      email: "",
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
    reset: resetPassword,
    handleSubmit: handleSubmitPassword,
  } = userPasswordForm;

  useEffect(() => {
    if (user) {
      resetProfile({
        imageFile: null,
        email: user.email ?? "",
        nickname: user.nickname ?? "",
      });

      setPreviewUrl(user.profileImageUrl || "");
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
    setValue("imageFile", selectedFile, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleImageReset = () => {
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    const originalUrl = user?.profileImageUrl || "";
    setPreviewUrl(originalUrl);
    setValue("imageFile", null, { shouldDirty: true, shouldValidate: true });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

  const { mutate: updateUserMutation, isPending: isInfoUpdating } = useMutation(
    {
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
    },
  );

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
      updateUserMutation(updateProfileData);
    }
  };

  const onPasswordSubmit = (data: userPasswordValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirmation, passwordScore, ...updatePasswordData } = data;
    updateUserMutation(updatePasswordData, {
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
      onImageReset: handleImageReset,
      isImageChanged: previewUrl !== (user?.profileImageUrl || ""),
    },
    isSubmitting: isImageUploading || isInfoUpdating,
  };
}
