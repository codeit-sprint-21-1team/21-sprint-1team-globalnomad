"use client";

import { useUserInfo } from "../_libs/useUserInfo";
import { Input } from "@/components/ui/Input/Input";
import { ProfileSection } from "../../_components/ProfileSection";
import { Button } from "@/components/ui/Buttons/Button";
import { cn } from "@/commons/utils/cn";

export default function ProfileEditSection() {
  const { userProfileForm, onProfileFormSubmit, profileImageUrl } =
    useUserInfo();
  const {
    register,
    formState: { errors, isValid, isDirty },
  } = userProfileForm;

  return (
    <>
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
      <section className="mt-[20px] md:mt-[24px] xl:mt-[24px]">
        <article>
          <form onSubmit={onProfileFormSubmit}>
            <ProfileSection imageSrc={profileImageUrl} />

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

            <Button type="submit" disabled={!isValid || !isDirty}>
              저장하기
            </Button>
          </form>
        </article>
      </section>
    </>
  );
}
