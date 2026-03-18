import axios from "./axios";
import { SignUpValues } from "@/app/(auth)/signup/_libs/signup.schema";
import { signInValues } from "@/app/(auth)/login/_libs/login.schema";

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
