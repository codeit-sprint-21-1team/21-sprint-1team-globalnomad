"use client";

import { useUserProfile } from "../_libs/useUserInfo";
import { Input } from "@/components/ui/Input/Input";
import { ProfileSection } from "../../_components/ProfileSection";
import { Button } from "@/components/ui/Buttons/Button";
import { cn } from "@/commons/utils/cn";

export default function ProfileEditSection() {
  const {
    userProfileForm,
    onProfileFormSubmit,
    onProfileFormReset,
    imageProps,
    isSubmitting,
  } = useUserProfile();
  const {
    register,
    formState: { errors, isValid, isDirty },
  } = userProfileForm;
  const { previewUrl, ...restProps } = imageProps;

  return (
    <div>
      <div className="mt-[10px]">
        <div
          className={cn(
            "w-full",
            "font-bold text-lg leading-[100%] tracking-[-2.5%] text-[#1F1F22]",
            "align-middle mt-[10px]",
          )}
        >
          내 정보
        </div>

        <div
          className={cn(
            "text-sm leading-[-2.5%] align-middle text-[#84858C]",
            "mt-[4px]",
          )}
        >
          프로필 이미지와 닉네임을 수정하실 수 있습니다.
        </div>
      </div>
      <section className="mt-[20px] md:mt-[24px]">
        <article>
          <form
            className="flex flex-col gap-[18px] md:gap-[24px]"
            onSubmit={onProfileFormSubmit}
          >
            <ProfileSection
              imageSrc={previewUrl}
              imageProps={restProps}
              isEditable={true}
            />
            {errors.imageFile?.message && (
              <p className="mt-2 text-sm text-red-500 leading-tight">
                {errors.imageFile.message}
              </p>
            )}

            <Input
              {...register("email")}
              labelTxt="이메일"
              id="email"
              type="email"
              readOnly
              errorTxt={errors.email?.message}
            />

            <Input
              {...register("nickname")}
              labelTxt="닉네임"
              id="nickname"
              type="text"
              placeholder="닉네임을 입력해주세요"
              errorTxt={errors.nickname?.message}
            />

            <div className="flex justify-center gap-[12px] mt-[16px] md:mt-0">
              <Button
                size="sm"
                variant="secondary"
                type="button"
                onClick={onProfileFormReset}
                disabled={!isDirty || isSubmitting}
                className="flex-1 md:max-w-[120px]"
              >
                되돌리기
              </Button>
              <Button
                size="sm"
                type="submit"
                disabled={!isValid || !isDirty || isSubmitting}
                className="flex-1 md:max-w-[120px]"
              >
                저장하기
              </Button>
            </div>
          </form>
        </article>
      </section>
    </div>
  );
}
