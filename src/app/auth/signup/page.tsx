"use client";

import { Controller } from "react-hook-form";
import { useSignup } from "./_libs/useSignUp";
import { Input } from "@/components/ui/Input/Input";
import { Checkbox } from "@/components/ui/Checkbox/Checkbox";
import { PasswordStrengthBar } from "@/components/ui/PasswordStrengthBar/PasswordStrengthBar";
import { Button } from "@/components/ui/Buttons/Button";
import { useModal } from "@/components/ui/Modal";
import { TermsContent } from "./_components/TermsContent";
import { KaKaoButton } from "../_components/KakaoButton";
import Link from "next/link";

export default function SignupPage() {
  const { register, control, errors, isValid, onFormSubmit, passwordScore } =
    useSignup();

  const { showModal } = useModal();
  const handleModalClick = () => {
    showModal(<TermsContent />);
  };

  return (
    <div>
      <div className="container">
        <Link href="/">auth 로고 이미지 추가 예정</Link>
        <form onSubmit={onFormSubmit}>
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
            errorTxt={errors.password?.message}
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

          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <div>
                <div>
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                  <label htmlFor="terms">(필수) 이용약관 동의</label>
                  <button type="button" onClick={handleModalClick}>
                    보기
                  </button>
                </div>
                {errors.terms?.message && <p>{errors.terms.message}</p>}
              </div>
            )}
          />

          <Button type="submit" disabled={!isValid}>
            회원가입하기
          </Button>
        </form>
        <div className="kakao-signup">
          <p>SNS 계정으로 회원가입하기</p>
          <KaKaoButton mode={"signup"} />
        </div>
        <div className="go-to-login">
          회원이신가요?<Link href="/auth/login">로그인하기</Link>
        </div>
      </div>
    </div>
  );
}
