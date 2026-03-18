import axios from "axios";

let errorMessage = "";
export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const serverMessage = error.response?.data?.message;
    errorMessage = serverMessage || "서버 응답 오류가 발생했습니다.";
  } else {
    errorMessage = "예상치 못한 에러가 발생했습니다.";
  }
  return errorMessage;
};
