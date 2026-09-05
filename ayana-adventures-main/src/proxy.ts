import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Run on everything except static assets, so the auth session cookie stays fresh
     * everywhere, and specifically gate /admin/* (checked inside updateSession).
     */
    "/((?!_next/static|_next/image|favicon.ico|videos/|assets/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|mov)$).*)",
  ],
};
