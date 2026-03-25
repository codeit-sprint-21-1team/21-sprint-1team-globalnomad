import { NextRequest } from "next/server";
import { handleAuthPost } from "@/apis/auth.post";

export async function POST(req: NextRequest) {
  return handleAuthPost(req, "oauth/sign-in/kakao");
}
