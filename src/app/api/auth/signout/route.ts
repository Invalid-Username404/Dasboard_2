import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Clear all auth-related cookies
    const cookieStore = cookies();
    cookieStore.delete("authjs.session-token");
    cookieStore.delete("next-auth.session-token");
    cookieStore.delete("authjs.csrf-token");
    cookieStore.delete("next-auth.csrf-token");
    cookieStore.delete("authjs.callback-url");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sign out error:", error);
    return NextResponse.json({ error: "Error signing out" }, { status: 500 });
  }
}
