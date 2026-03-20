"use client";

import { Suspense } from "react";
import { useKakaoOAuth } from "./_libs/useKakaoOAuth";

const KakaoLoading = () => <div>카카오 인증 정보 확인 중...</div>;

function KakaoCallbackInner() {
  useKakaoOAuth();

  return <KakaoLoading />;
}

export default function KakaoCallbackPage() {
  return (
    <Suspense fallback={<KakaoLoading />}>
      <KakaoCallbackInner />
    </Suspense>
  );
}
