"use client";

import { useLogin } from "./_libs/useLogin";
import { Button } from "@/components/ui/Buttons/Button";
import Image from "next/image";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/Checkbox/Checkbox";

export default function LoginPage() {
  const { register, control, errors, isValid, touchedFields, onFormSubmit } =
    useLogin();

  return (
    <div>
      <div className="container">
        <Link href="/">auth 로고 이미지 추가 예정</Link>
        <form onSubmit={onFormSubmit}>
          <>
            <label htmlFor="email">이메일</label>
            <input
              {...register("email")}
              type="text"
              id="email"
              placeholder="이메일을 입력해주세요"
            />
            {touchedFields.email && errors.email?.message && (
              <div className="active">{errors.email?.message}</div>
            )}
          </>

          <>
            <label htmlFor="password">비밀번호</label>
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="8자 이상 입력해 주세요"
            />
            {touchedFields.password && errors.password?.message && (
              <div className="active">{errors.password?.message}</div>
            )}
          </>

          <Controller
            name="rememberEmail"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  id="rememberEmail"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  onBlur={field.onBlur}
                />
                <label htmlFor="rememberEmail">이메일 기억하기</label>
              </>
            )}
          />

          <Button type="submit" disabled={!isValid}>
            로그인하기
          </Button>
        </form>
        <div className="kakao-signin">
          <p>SNS 계정으로 로그인하기</p>
          <Button variant="secondary" size="lg">
            <Image width={24} height={24} src="/icons/kakao.svg" alt="" />
            카카오 로그인하기
          </Button>
        </div>
        <div className="go-to-login">
          회원이 아니신가요?<Link href="/signup">회원가입하기</Link>
        </div>
      </div>
    </div>
  );
}
