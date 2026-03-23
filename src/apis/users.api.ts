import axios from "./axios";
import { UpdateUserRequest } from "@/app/mypage/user-info/_libs/userInfo.schema";

export const postUserMeImage = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", image);

  const response = await axios.post("/users/me/image", formData);
  return response.data.profileImageUrl;
};

export const patchUserMe = async (data: UpdateUserRequest) => {
  return await axios.patch("/users/me", data);
};
