import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ADMIN_PREFIX = "/admin";
const LOGIN_PATH = "/admin/login";

/**
 * Refreshes the Supabase auth session on every request and gates /admin/* behind login.
 * Server-side authorization (this + RLS policies), not a client-side check — a signed-out
 * request is redirected before any admin page renders.
 */
function redirectToLogin(request: NextRequest, error?: string) {
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = LOGIN_PATH;
  if (error) redirectUrl.searchParams.set("error", error);
  else redirectUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
}

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request });
  const isAdminRoute = request.nextUrl.pathname.startsWith(ADMIN_PREFIX);
  const isLoginRoute = request.nextUrl.pathname === LOGIN_PATH;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Supabase isn't configured (missing env vars). This must never take down public pages —
  // only /admin/* depends on it, and there we fail closed (redirect to login) rather than
  // silently grant access or crash the request.
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      "Supabase env vars are not configured (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY missing) — skipping session refresh.",
    );
    return isAdminRoute && !isLoginRoute ? redirectToLogin(request) : response;
  }

  try {
    let refreshedResponse = NextResponse.next({ request });

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          refreshedResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            refreshedResponse.cookies.set(name, value, options);
          });
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (isAdminRoute && !isLoginRoute) {
      if (!user) {
        return redirectToLogin(request);
      }

      // Belt-and-suspenders: confirm the signed-in user is actually an admin.
      // The real authorization boundary is RLS on the content/enquiries tables themselves —
      // this just avoids showing the admin shell to a signed-in-but-unauthorized account.
      const { data: profile } = await supabase
        .from("admin_profiles")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!profile) {
        return redirectToLogin(request, "not_authorized");
      }
    }

    if (isLoginRoute && user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = ADMIN_PREFIX;
      redirectUrl.search = "";
      return NextResponse.redirect(redirectUrl);
    }

    return refreshedResponse;
  } catch (error) {
    // A Supabase/network failure here must not 500 the whole site — only admin routes need
    // to fail closed. The underlying error is still logged, not hidden.
    console.error("Supabase session refresh failed in middleware:", error);
    return isAdminRoute && !isLoginRoute ? redirectToLogin(request) : response;
  }
}
