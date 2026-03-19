import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/mypage"];
const AUTH_ROUTES = ["/auth"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (/\.\w+$/.test(pathname)) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const hasValidSession = accessToken || refreshToken;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !hasValidSession) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isAuthRoute && hasValidSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mypage/:path*", "/auth/:path*"],
};
