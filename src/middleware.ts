import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (/\.\w+$/.test(pathname)) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  const isProtectedRoute = pathname.startsWith("/mypage");
  if (isProtectedRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const isAuthRoute = pathname.startsWith("/auth");
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mypage/:path*", "/auth/:path*"],
};
