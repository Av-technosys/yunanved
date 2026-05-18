import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { ADMIN_EMAILS } from "@/const/globalconst";

const adminEmails = new Set(ADMIN_EMAILS.map((email) => email.toLowerCase()));

function notFound(req: NextRequest) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin-not-found";
    url.search = "";

    return NextResponse.rewrite(url, { status: 404 });
}

export async function proxy(req: NextRequest) {
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

    const isAdminRoute = pathname.startsWith("/admin");
    const isProtectedRoute = pathname === "/checkout" || pathname.startsWith("/dashboard") || isAdminRoute;

    if (isAuthPage) {
        if (isAuth) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    } else if (isProtectedRoute && !isAuth) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    if (isAdminRoute) {
        const token = await getToken({ req, secret: process.env.AUTH_SECRET });
        const email = token?.email?.toLowerCase();

        if (!email || !adminEmails.has(email)) {
            return notFound(req);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
