import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Supabase client for use in Server Components, Server Actions, and Route Handlers.
 * Reads/writes the auth session via Next.js cookies. Never import this from a Client Component.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // setAll called from a Server Component (not a Server Action/Route Handler) —
            // safe to ignore because middleware refreshes the session on every request.
          }
        },
      },
    },
  );
}

/**
 * Admin-privileged client using the service-role key. SERVER-ONLY — this key must never reach
 * the browser. Use only inside Server Actions/Route Handlers for operations that must bypass RLS
 * (e.g. creating the first admin profile). Prefer `createClient()` (RLS-enforced) everywhere else.
 */
export function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. This operation requires the service-role key and cannot run without it.",
    );
  }

  return createSupabaseClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
