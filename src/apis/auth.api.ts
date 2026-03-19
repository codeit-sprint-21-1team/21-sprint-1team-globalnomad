import axios from "./axios";
import { SignUpValues } from "@/app/(auth)/signup/_libs/signup.schema";
import { signInValues } from "@/app/(auth)/login/_libs/login.schema";
import { UserType } from "@/types/user.type";

export const postSignup = async (
  data: Omit<SignUpValues, "terms" | "passwordConfirmation" | "passwordScore">,
) => {
  return await axios.post("/signup", data);
};

export const postSignIn = async (data: Omit<signInValues, "rememberEmail">) => {
  return await axios.post("/login", data);
};

export const postLogout = async () => {
  return await axios.post("/logout");
};

export const getUserMe = async (): Promise<UserType | null> => {
  const res = await axios.get("/users/me");
  return res.data;
};
