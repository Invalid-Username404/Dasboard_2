import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/mail/:path*",
    "/tasks/:path*",
    "/share/:path*",
    "/clock/:path*",
    "/voice-chat/:path*",
    "/signin",
    "/signup",
  ],
};
