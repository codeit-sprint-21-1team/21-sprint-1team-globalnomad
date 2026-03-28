"use client";

import { useLogin } from "./_libs/useLogin";
import { Button } from "@/components/ui/Buttons/Button";
import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/Checkbox/Checkbox";
import { Input } from "@/components/ui/Input/Input";
import { cn } from "@/commons/utils/cn";

export default function LoginPage() {
  const { register, control, errors, isValid, onFormSubmit } = useLogin();

  const handleInput = () => {
    window.dispatchEvent(new CustomEvent("typing-start"));
  };

  return (
    <>
      <form
        className="flex flex-col gap-[16px] md:gap-[20px]"
        onSubmit={onFormSubmit}
        onInput={handleInput}
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
          {...register("password")}
          labelTxt="비밀번호"
          id="password"
          type="password"
          placeholder="8자 이상 입력해 주세요"
          errorTxt={errors.password?.message}
        />

        <Controller
          name="rememberEmail"
          control={control}
          render={({ field }) => (
            <div
              className={cn(
                "flex items-center gap-[10px]",
                "text-[16px] font-bold tracking-[-0.025em] text-gray-900",
              )}
            >
              <Checkbox
                id="rememberEmail"
                checked={field.value}
                onCheckedChange={field.onChange}
                onBlur={field.onBlur}
              />
              <label
                htmlFor="rememberEmail"
                className="cursor-pointer select-none leading-none"
              >
                이메일 기억하기
              </label>
            </div>
          )}
        />

        <Button
          type="submit"
          className="mt-[8px] md:mt-[10px]"
          disabled={!isValid}
        >
          로그인하기
        </Button>
      </form>
    </>
  );
}
