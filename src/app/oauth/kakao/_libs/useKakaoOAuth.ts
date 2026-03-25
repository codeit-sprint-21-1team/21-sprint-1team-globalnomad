import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDialog } from "@/components/ui/Dialog";
import { postOAuthKaKaoSignin, postOAuthKaKaoSignup } from "@/apis/oauth.api";
import { generateRandomNickname } from "@/commons/utils/randomNickname";
import { handleApiError } from "@/commons/utils/handleApiError";
import axios from "axios";

export function useKakaoOAuth() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const mode = searchParams.get("state");
  const isProcessing = useRef<boolean>(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { showDialog } = useDialog();

  const redirectToKakao = useCallback((targetMode: "login" | "signup") => {
    const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login&state=${targetMode}`;

    window.location.href = KAKAO_AUTH_URL;
  }, []);

  const processSignup = useCallback(
    async (signupData: {
      token: string;
      redirectUri: string;
      nickname: string;
    }) => {
      await postOAuthKaKaoSignup(signupData);
      showDialog({
        type: "alert",
        content:
          "회원가입이 완료되었습니다!\n안전한 서비스 이용을 위해 카카오 인증을 한 번 더 진행해 주세요.",
        onConfirm: () => {
          redirectToKakao("login");
        },
      });
    },
    [showDialog, redirectToKakao],
  );

  const { mutate: kakaoLoginMutation } = useMutation({
    mutationFn: (authData: { token: string; redirectUri: string }) =>
      postOAuthKaKaoSignin(authData),
    onSuccess: (response) => {
      const user = response?.data?.data?.user || response?.data?.user;

      if (user) {
        queryClient.setQueryData(["user"], user);
      }

      router.replace("/");
    },
    onError: (error) => {
      const errorMessage = handleApiError(error);
      showDialog({
        type: "alert",
        content: errorMessage,
      });
    },
  });

  const showErrorAndRedirect = useCallback(
    (error: unknown) => {
      const errorMessage = handleApiError(error);
      showDialog({
        type: "alert",
        content: errorMessage,
        onConfirm: () => {
          if (mode === "signup") {
            router.push("/auth/signup");
          } else {
            router.push("/auth/login");
          }
        },
      });
    },
    [mode, showDialog, router],
  );

  useEffect(() => {
    if (!code || isProcessing.current) return;
    isProcessing.current = true;

    const handleAuth = async () => {
      if (mode === "signup") {
        const signupData = {
          token: code,
          redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || "",
          nickname: generateRandomNickname(),
        };
        try {
          await processSignup(signupData);
        } catch (error) {
          if (
            axios.isAxiosError(error) &&
            error.response?.status === 400 &&
            error.response?.data?.message?.includes("이미 등록된 사용자")
          ) {
            showDialog({
              type: "alert",
              content:
                "이미 가입된 계정입니다.\n안전한 서비스 이용을 위해 카카오 인증을 한 번 더 진행해 주세요.",
              onConfirm: () => {
                redirectToKakao("login");
              },
            });
          } else {
            showErrorAndRedirect(error);
          }
        }
      } else {
        const loginData = {
          token: code,
          redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || "",
        };
        kakaoLoginMutation(loginData);
      }
    };

    handleAuth();
  }, [
    code,
    mode,
    processSignup,
    kakaoLoginMutation,
    showErrorAndRedirect,
    redirectToKakao,
    showDialog,
  ]);
}
