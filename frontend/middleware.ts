import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  // For client-side storage, we'll check in the component
  // This middleware mainly handles redirects based on path
  const { pathname } = request.nextUrl;

  // If user is on login page and has a token in localStorage
  // (checked on client side), redirect to pokemon
  if (pathname === "/login") {
    // We can't access localStorage from middleware (server-side)
    // So we'll handle this redirect in the login page component
    return NextResponse.next();
  }

  // If accessing protected routes without token
  if (pathname.startsWith("/pokemon")) {
    // We'll check authentication in the layout component
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pokemon/:path*", "/login"],
};
