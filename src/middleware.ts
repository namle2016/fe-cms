import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticatedCookies, isAuthenticatedLocalStore } from "./lib/auth";
//import { useAppSelector } from "./store";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith('/') && isAuthenticatedCookies(request.cookies)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!isAuthenticatedCookies(request.cookies) && !pathname.startsWith('/admin/dang-nhap')) {
    return Response.redirect(new URL('/admin/dang-nhap', request.url))
  }
}

export const config = {
  matcher: [
    "/admin",
    "/admin/thong-ke",
    "/admin/he-thong",
    "/admin/he-thong/bai-viet",
    "/admin/he-thong/bai-viet/new",
    '/admin/he-thong/bai-viet/:path*',
    "/admin/he-thong/catalog",
    "/admin/he-thong/catalog-chi-tiet",
    "/admin/he-thong/menu",
    "/admin/he-thong/nhom",
    "/admin/he-thong/nhom/new",
    "/admin/he-thong/nhom/:path*",
    "/admin/he-thong/san-pham",
    "/admin/he-thong/slide",
    "/admin/he-thong/slide/new",
    "/admin/he-thong/slide/:path*",
  ],
};