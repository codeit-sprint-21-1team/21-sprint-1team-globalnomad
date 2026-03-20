import { Button } from "@/components/ui/Buttons/Button";
import Image from "next/image";

export function KaKaoButton() {
  const onKakaoSignUp = () => {
    const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Button variant="secondary" size="lg" onClick={onKakaoSignUp}>
      <Image width={24} height={24} src="/icons/kakao.svg" alt="" />
      카카오로 시작하기
    </Button>
  );
}
