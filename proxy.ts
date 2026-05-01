import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  isValidMemberSessionToken,
  memberSessionCookieName,
} from "./app/lib/member-auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/members/login")) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get(memberSessionCookieName)?.value;

  if (!isValidMemberSessionToken(sessionToken)) {
    const loginUrl = request.nextUrl.clone();

    loginUrl.pathname = "/members/login";
    loginUrl.searchParams.set("next", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/members", "/members/:path*"],
};
