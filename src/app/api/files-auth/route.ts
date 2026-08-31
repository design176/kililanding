import { NextRequest, NextResponse } from "next/server";
import { FILES_COOKIE, filesAuthToken } from "@/lib/files-auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (typeof password !== "string" || password !== process.env.FILES_PASSWORD) {
    return NextResponse.json({ error: "wrong password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(FILES_COOKIE, filesAuthToken(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/files",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
