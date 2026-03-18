import { SignUpValues } from "@/app/(auth)/signup/_libs/signup.schema";
import axios from "./axios";

export const postSignup = async (
  data: Omit<SignUpValues, "terms" | "passwordConfirmation" | "passwordScore">,
) => {
  return await axios.post("/signup", data);
};
