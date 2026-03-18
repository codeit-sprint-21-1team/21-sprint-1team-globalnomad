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
  cookieStore: Awaited<ReturnType<typeof cookies>>,
): Promise<string | null> {
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) return null;

  const res = await fetch(`${API_BASE}/auth/tokens`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) return null;

  const { accessToken } = await res.json();
  cookieStore.set("access_token", accessToken, {
    ...cookieOptions,
    maxAge: 60 * 30,
  });
  return accessToken;
}

export async function setAuthCookies(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  tokens: { accessToken: string; refreshToken: string },
): Promise<void> {
  cookieStore.set("access_token", tokens.accessToken, {
    ...cookieOptions,
    maxAge: 60 * 30,
  });

  cookieStore.set("refresh_token", tokens.refreshToken, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 14,
  });
}
