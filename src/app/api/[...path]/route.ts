import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  tryRefresh,
  clearAuthCookies,
  setAuthCookies,
} from "@/apis/auth.server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";
type RouteParams = { params: Promise<{ path: string[] }> };

async function proxy(req: NextRequest, path: string[], method: HttpMethod) {
  if (!API_BASE) {
    throw new Error("환경 변수 NEXT_PUBLIC_API_URL이 설정되지 않았습니다.");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const targetUrl = `${API_BASE}/${path.join("/")}${new URL(req.url).search}`;
  const contentType = req.headers.get("content-type") ?? "";
  const isMultipart = contentType.includes("multipart/form-data");

  const headers: HeadersInit = {
    "Content-Type": isMultipart ? contentType : "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  let body: BodyInit | undefined;
  try {
    let body: BodyInit | undefined;
    if (method !== "GET") {
      body = isMultipart
        ? await req.blob()
        : JSON.stringify(await req.json().catch(() => ({})));
    }

    let res = await fetch(targetUrl.toString(), { method, headers, body });

    if (res.status === 401) {
      const newToken = await tryRefresh(cookieStore);
      if (newToken) {
        headers["Authorization"] = `Bearer ${newToken}`;
        res = await fetch(targetUrl, { method, headers, body });
      } else {
        const data = await res.json().catch(() => ({}));
        const response = NextResponse.json(data, { status: 401 });
        clearAuthCookies(response);
        return response;
      }
    }

    const data = await res.json().catch(() => ({}));

    if (res.ok && path.includes("sign-in") && path.includes("kakao")) {
      const cookieStore = await cookies();

      if (data.accessToken && data.refreshToken) {
        await setAuthCookies(cookieStore, {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
      }
    }

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  return proxy(req, path, "GET");
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  return proxy(req, path, "POST");
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  return proxy(req, path, "PATCH");
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  return proxy(req, path, "DELETE");
}
