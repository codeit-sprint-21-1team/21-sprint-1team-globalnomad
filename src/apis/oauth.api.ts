import axios from "./axios";
import { OAuthSignInRequest, OAuthSignUpRequest } from "@/types/auth.type";

export const postOAuthKaKaoSignup = async (data: OAuthSignUpRequest) => {
  return await axios.post("/oauth/sign-up/kakao", data);
};

export const postOAuthKaKaoSignin = async (data: OAuthSignInRequest) => {
  return await axios.post("/oauth/sign-in/kakao", data);
};
