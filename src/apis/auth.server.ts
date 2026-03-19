import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

export function clearAuthCookies(res: NextResponse) {
  res.cookies.delete("access_token");
  res.cookies.delete("refresh_token");
}

export async function tryRefresh(
  res: NextResponse,
  refreshToken: string | undefined,
): Promise<string | null> {
  if (!refreshToken) return null;

  try {
    const response = await fetch(`${API_BASE}/auth/tokens`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) return null;

    const { accessToken } = await response.json();

    res.cookies.set("access_token", accessToken, {
      ...cookieOptions,
      maxAge: 60 * 30,
    });

    return accessToken;
  } catch (error) {
    return null;
  }
}

export function setAuthCookies(
  res: NextResponse,
  tokens: { accessToken: string; refreshToken: string },
): void {
  res.cookies.set("access_token", tokens.accessToken, {
    ...cookieOptions,
    maxAge: 60 * 30,
  });

  res.cookies.set("refresh_token", tokens.refreshToken, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 14,
  });
}
