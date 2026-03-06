import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    // Check for NextAuth session cookies (supports both HTTP and HTTPS configurations)
    const sessionToken = req.cookies.get("next-auth.session-token") || req.cookies.get("__Secure-next-auth.session-token");
    const isAuth = !!sessionToken;

    const pathname = req.nextUrl.pathname;

    const isAuthPage =
        pathname.startsWith("/sign-in") ||
        pathname.startsWith("/sign-up") ||
        pathname.startsWith("/email-verification") ||
        pathname.startsWith("/reset-password-email") ||
        pathname.startsWith("/reset-password-otp");

    const isProtectedRoute = pathname === "/checkout" || pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

    if (isAuthPage) {
        if (isAuth) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    } else if (isProtectedRoute && !isAuth) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
