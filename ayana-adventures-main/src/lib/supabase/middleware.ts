import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ADMIN_PREFIX = "/admin";
const LOGIN_PATH = "/admin/login";

/**
 * Refreshes the Supabase auth session on every request and gates /admin/* behind login.
 * Server-side authorization (this + RLS policies), not a client-side check — a signed-out
 * request is redirected before any admin page renders.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdminRoute = request.nextUrl.pathname.startsWith(ADMIN_PREFIX);
  const isLoginRoute = request.nextUrl.pathname === LOGIN_PATH;

  if (isAdminRoute && !isLoginRoute) {
    if (!user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = LOGIN_PATH;
      redirectUrl.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
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
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = LOGIN_PATH;
      redirectUrl.searchParams.set("error", "not_authorized");
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (isLoginRoute && user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = ADMIN_PREFIX;
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}
