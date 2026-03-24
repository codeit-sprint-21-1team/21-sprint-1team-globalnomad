"use client";

import { Suspense } from "react";
import { useKakaoOAuth } from "./_libs/useKakaoOAuth";
import KaKaoLoading from "./_libs/KakaoLoading";

const KakaoLoading = () => <KaKaoLoading />;

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
