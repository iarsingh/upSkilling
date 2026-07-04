import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

const COOKIE_NAME = "portfolio_admin_session";

// Optimistic-only check (reads the cookie, no DB call) per Next.js guidance -
// the real enforcement lives in lib/dal.ts's verifySession(), called from
// every admin page and server action. This just avoids a flash of protected
// UI before that check runs.
export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isLoginRoute = path === "/admin/login";
  const isAdminRoute = path.startsWith("/admin") && !isLoginRoute;

  if (!isAdminRoute && !isLoginRoute) return NextResponse.next();

  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  const session = await decrypt(cookie);

  if (isAdminRoute && !session?.username) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isLoginRoute && session?.username) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
