import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { tryRefresh, clearAuthCookies } from "@/apis/auth.server";

const API_BASE = process.env.API_BASE_URL;

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";
type RouteParams = { params: Promise<{ path: string[] }> };

async function proxy(req: NextRequest, path: string[], method: HttpMethod) {
  if (!API_BASE) {
    throw new Error("환경 변수 API_BASE_URL이 설정되지 않았습니다.");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  const targetUrl = `${API_BASE}/${path.join("/")}${new URL(req.url).search}`;
  const contentType = req.headers.get("content-type") ?? "";
  const isMultipart = contentType.includes("multipart/form-data");

  const headers: HeadersInit = {
    "Content-Type": isMultipart ? contentType : "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  let body: BodyInit | undefined;
  try {
    if (method !== "GET") {
      body = isMultipart
        ? await req.blob()
        : JSON.stringify(await req.json().catch(() => ({})));
    }

    const res = await fetch(targetUrl.toString(), { method, headers, body });

    if (res.status === 401) {
      const errorData = await res.json().catch(() => ({}));
      const unauthorizedResponse = NextResponse.json(errorData, {
        status: 401,
      });

      const newToken = await tryRefresh(unauthorizedResponse, refreshToken);

      if (newToken) {
        headers["Authorization"] = `Bearer ${newToken}`;
        const retryRes = await fetch(targetUrl, { method, headers, body });
        const retryData = await retryRes.json().catch(() => ({}));
        const finalResponse = NextResponse.json(retryData, {
          status: retryRes.status,
        });

        finalResponse.cookies.set("access_token", newToken, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 30,
        });
        return finalResponse;
      } else {
        clearAuthCookies(unauthorizedResponse);
        return unauthorizedResponse;
      }
    }

    const data = res.status === 204 ? null : await res.json().catch(() => ({}));
    if (res.status === 204) {
      return new NextResponse(null, { status: 204 });
    }
    const response = NextResponse.json(data, { status: res.status });

    return response;
  } catch {
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
