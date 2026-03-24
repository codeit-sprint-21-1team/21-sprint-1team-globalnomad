"use client";

import { Controller } from "react-hook-form";
import { useSignup } from "./_libs/useSignUp";
import { Input } from "@/components/ui/Input/Input";
import { Checkbox } from "@/components/ui/Checkbox/Checkbox";
import { PasswordStrengthBar } from "@/components/ui/PasswordStrengthBar/PasswordStrengthBar";
import { Button } from "@/components/ui/Buttons/Button";
import { useModal } from "@/components/ui/Modal";
import { TermsContent } from "./_components/TermsContent";
import { cn } from "@/commons/utils/cn";
import Link from "next/link";

export default function SignupPage() {
  const { register, control, errors, isValid, onFormSubmit, passwordScore } =
    useSignup();

  const { showModal } = useModal();
  const handleModalClick = () => {
    showModal(<TermsContent />);
  };

  return (
    <>
      <form
        className="flex flex-col gap-[16px] md:gap-[20px]"
        onSubmit={onFormSubmit}
      >
        <Input
          {...register("email")}
          labelTxt="이메일"
          id="email"
          type="email"
          placeholder="이메일을 입력해주세요"
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

        <Input
          {...register("password")}
          labelTxt="비밀번호"
          id="password"
          type="password"
          placeholder="8자 이상 입력해 주세요"
          extra={<PasswordStrengthBar score={passwordScore} />}
          errorTxt={errors.password?.message}
        />

        <Input
          {...register("passwordConfirmation")}
          labelTxt="비밀번호 확인"
          id="passwordConfirmation"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          errorTxt={errors.passwordConfirmation?.message}
        />

        <Controller
          name="terms"
          control={control}
          render={({ field }) => (
            <div>
              <div
                className={cn(
                  "inline-flex items-center gap-[10px]",
                  "text-[16px] font-bold tracking-[-0.025em] text-gray-900",
                )}
              >
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  onBlur={field.onBlur}
                  aria-invalid={errors.terms ? "true" : "false"}
                  className="mt-[1px]"
                />
                <label
                  htmlFor="terms"
                  className="cursor-pointer select-none leading-none"
                >
                  (필수)&nbsp;
                  <Link
                    className="underline underline-offset-4"
                    href="/auth/signup"
                    onClick={(e) => {
                      e.preventDefault();
                      handleModalClick();
                    }}
                  >
                    이용약관
                  </Link>
                  &nbsp;동의
                </label>
              </div>
              {errors.terms?.message && (
                <p className="mt-2 text-sm text-red-500 leading-tight">
                  {errors.terms.message}
                </p>
              )}
            </div>
          )}
        />

        <Button
          type="submit"
          className="mt-[8px] md:mt-[10px]"
          disabled={!isValid}
        >
          회원가입하기
        </Button>
      </form>
    </>
  );
}
