import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage =
        nextUrl.pathname.startsWith("/signin") ||
        nextUrl.pathname.startsWith("/signup");

      if (isAuthPage) {
        if (isLoggedIn)
          return Response.redirect(new URL("/dashboard", nextUrl));
        return true;
      }

      if (!isLoggedIn) {
        return Response.redirect(new URL("/signin", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Auth providers will be added in auth.ts
} satisfies NextAuthConfig;
