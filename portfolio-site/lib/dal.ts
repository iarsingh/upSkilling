import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export const verifySession = cache(async () => {
  const session = await getSession();
  if (!session?.username) {
    redirect("/admin/login");
  }
  return { isAuth: true, username: session.username };
});

// Same check, but returns null instead of redirecting - for use inside
// Server Actions where a thrown redirect would be the wrong UX (we want
// to return a form error instead).
export const checkSession = cache(async () => {
  const session = await getSession();
  if (!session?.username) return null;
  return { isAuth: true, username: session.username };
});
