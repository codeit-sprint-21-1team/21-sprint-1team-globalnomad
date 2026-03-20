import axios from "./axios";
import { OAuthSignInRequest, OAuthSignUpRequest } from "@/types/auth.type";

interface KakaoUserData {
  nickname: string;
  accessToken: string;
}

export const getKakaoUserInfo = async (code: string) => {
  return await axios.post<KakaoUserData>("/oauth/kakao", { code });
};

export const postOAuthKaKaoSignup = async (data: OAuthSignUpRequest) => {
  return await axios.post("/oauth/sign-up/kakao", data);
};

export const postOAuthKaKaoSignin = async (data: OAuthSignInRequest) => {
  return await axios.post("/oauth/sign-in/kakao", data);
};
