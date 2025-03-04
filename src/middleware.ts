import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { NextResponse } from "next/server";

import {
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "./routes";
const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req) {
    const { nextUrl } = req
    const { pathname } = nextUrl
    const isLoggedIn = !!req.auth;

    const isPublicRoute = pathname === "/" || publicRoutes.includes(pathname);
    const isAuthRoute = authRoutes.includes(pathname)
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

    if (isApiAuthRoute) {
        return
    }

    if (!isPublicRoute && !isAuthRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", nextUrl));
    }
    if (isAuthRoute && isLoggedIn) {
        return NextResponse.redirect(new URL("/app", nextUrl));
    }
})
export const config = {
    matcher: [
        "/((?!.+\\.[\\w]+$|_next).*)",
        "/",
        "/(api|trpc)(.*)",
    ],
};
