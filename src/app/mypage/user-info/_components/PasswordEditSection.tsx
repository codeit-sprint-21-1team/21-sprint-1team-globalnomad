"use client";

import { useUserInfo } from "../_libs/useUserInfo";
import { Input } from "@/components/ui/Input/Input";
import { PasswordStrengthBar } from "@/components/ui/PasswordStrengthBar/PasswordStrengthBar";
import { Button } from "@/components/ui/Buttons/Button";
import { cn } from "@/commons/utils/cn";

export default function PasswordEditSection() {
  const { userPasswordForm, onPasswordFormSubmit, passwordScore } =
    useUserInfo();
  const {
    register,
    formState: { errors, isValid },
  } = userPasswordForm;

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
          비밀번호 변경
        </div>

        <div
          className={cn(
            "text-sm leading-[-2.5%] align-middle text-[#84858C]",
            "mt-[4px]",
          )}
        >
          비밀번호를 수정하실 수 있습니다.
        </div>
      </div>
      <section className="mt-[20px] md:mt-[24px] xl:mt-[24px]">
        <article>
          <form onSubmit={onPasswordFormSubmit}>
            <Input
              {...register("newPassword")}
              labelTxt="비밀번호"
              id="newPassword"
              type="password"
              placeholder="8자 이상 입력해 주세요"
              errorTxt={errors.newPassword?.message}
            />
            {<PasswordStrengthBar score={passwordScore} />}

            <Input
              {...register("passwordConfirmation")}
              labelTxt="비밀번호 확인"
              id="passwordConfirmation"
              type="password"
              placeholder="비밀번호를 한 번 더 입력해 주세요"
              errorTxt={errors.passwordConfirmation?.message}
            />

            <Button type="submit" disabled={!isValid}>
              저장하기
            </Button>
          </form>
        </article>
      </section>
    </>
  );
}
