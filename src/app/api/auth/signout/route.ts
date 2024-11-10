import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();

    // Clear all possible auth-related cookies
    const cookieOptions = {
      name: "", // Will be set for each cookie
      path: "/",
      domain:
        process.env.NODE_ENV === "production"
          ? "marses-dashboard.vercel.app"
          : undefined,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
    };

    // Delete cookies one by one with proper options
    [
      "authjs.session-token",
      "next-auth.session-token",
      "authjs.csrf-token",
      "next-auth.csrf-token",
      "authjs.callback-url",
      "__Secure-next-auth.session-token",
    ].forEach((cookieName) => {
      cookieStore.delete({
        ...cookieOptions,
        name: cookieName,
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sign out error:", error);
    return NextResponse.json({ error: "Error signing out" }, { status: 500 });
  }
}
