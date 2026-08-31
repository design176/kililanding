import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { FILES_COOKIE, isValidFilesAuthCookie } from "@/lib/files-auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (process.env.FILES_AUTH_DISABLED === "true") {
    return NextResponse.next();
  }

  if (pathname === "/files/login") {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(FILES_COOKIE)?.value;
  if (isValidFilesAuthCookie(cookie)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/files/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/files/:path*"],
};
