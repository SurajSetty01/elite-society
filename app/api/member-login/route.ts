import { NextResponse } from "next/server";

import {
  getMemberCredentials,
  getMemberSessionToken,
  memberSessionCookieName,
} from "@/app/lib/member-auth";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid access request." },
      { status: 400 },
    );
  }

  const credentials = getMemberCredentials();
  const payload = body as { password?: unknown; username?: unknown };
  const username = typeof payload.username === "string" ? payload.username.trim() : "";
  const password = typeof payload.password === "string" ? payload.password : "";

  if (username !== credentials.username || password !== credentials.password) {
    return NextResponse.json(
      { message: "The access details entered are not recognized." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set(memberSessionCookieName, getMemberSessionToken(), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
