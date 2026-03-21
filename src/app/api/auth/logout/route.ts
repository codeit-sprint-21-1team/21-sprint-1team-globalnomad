import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/apis/auth.server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 },
    );

    clearAuthCookies(response);

    return response;
  } catch {
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}
