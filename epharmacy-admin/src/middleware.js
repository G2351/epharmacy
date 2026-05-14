import { NextResponse } from "next/server";

export function middleware(request) {
  const loginCookie = request.cookies.get("login");
  const { pathname, searchParams } = request.nextUrl;
  const redirectTo = searchParams.get("redirect") || "/private/dashboard";

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/private/dashboard", request.url));
  }

  if (loginCookie && loginCookie.value === "true") {
    if (pathname === "/public/auth/login") {
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
  } else {
    if (!pathname.startsWith("/public")) {
      return NextResponse.redirect(new URL("/public/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|mock|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp)$).*)",
  ],
};