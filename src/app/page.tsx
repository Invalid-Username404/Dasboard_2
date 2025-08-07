import { redirect } from "next/navigation";

export default async function Home() {
  // Redirect all users directly to dashboard without authentication
  redirect("/dashboard");
}
