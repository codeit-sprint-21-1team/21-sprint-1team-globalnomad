import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useDialog } from "@/components/ui/Dialog";
import axios from "axios";
import { postOAuthKaKaoSignin, postOAuthKaKaoSignup } from "@/apis/oauth.api";
import { generateRandomNickname } from "@/commons/utils/randomNickname";
import { handleApiError } from "@/commons/utils/handleApiError";

export function useKakaoOAuth() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const isProcessing = useRef<boolean>(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { showDialog } = useDialog();

  useEffect(() => {
    if (!code || isProcessing.current) return;
    isProcessing.current = true;

    const processLogin = async (authData: {
      token: string;
      redirectUri: string;
    }) => {
      const response = await postOAuthKaKaoSignin(authData);
      const user = response?.data?.user;
      if (user) {
        queryClient.setQueryData(["user"], user);
      }
      router.replace("/");
      router.refresh();
      return user;
    };

    const showErrorAndRedirect = (error: unknown) => {
      const errorMessage = handleApiError(error);
      showDialog({
        type: "alert",
        content: errorMessage,
        onConfirm: () => router.push("/auth/login"),
      });
    };

    const handleAuth = async () => {
      const authBaseData = {
        token: code,
        redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || "",
      };

      try {
        await processLogin(authBaseData);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          console.log("미가입 유저입니다. 회원가입을 진행합니다.");

          try {
            const signupData = {
              token: code,
              redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || "",
              nickname: generateRandomNickname(),
            };

            await postOAuthKaKaoSignup(signupData);
            await processLogin(authBaseData);
          } catch (signUpError: unknown) {
            showErrorAndRedirect(signUpError);
          }
        } else {
          showErrorAndRedirect(error);
        }
      }
    };

    handleAuth();
  }, [code, router, queryClient, showDialog]);
}
