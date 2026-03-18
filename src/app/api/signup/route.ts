import { NextRequest } from "next/server";
import { handleAuthPost } from "@/apis/auth.post";

export async function POST(request: NextRequest) {
  return handleAuthPost(request, "users");
}
