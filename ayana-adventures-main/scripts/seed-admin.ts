/**
 * Creates (or re-uses) one admin account for local development, using the service-role key.
 * Reads DEV_ADMIN_EMAIL / DEV_ADMIN_PASSWORD from .env.local — see .env.example.
 *
 * This script is dev-only. In production, create admin accounts via the Supabase dashboard
 * (Authentication > Users > Add user) and then insert a matching row into admin_profiles —
 * there is deliberately no public admin signup flow.
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.DEV_ADMIN_EMAIL;
const password = process.env.DEV_ADMIN_PASSWORD;

if (!url || !serviceKey || !email || !password) {
  console.error(
    "Missing one of NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / DEV_ADMIN_EMAIL / DEV_ADMIN_PASSWORD in .env.local",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const { data: existing } = await supabase.auth.admin.listUsers();
  let user = existing?.users.find((u) => u.email === email);

  if (!user) {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error) throw error;
    user = data.user;
    console.log(`Created auth user ${email}`);
  } else {
    console.log(`Auth user ${email} already exists`);
  }

  if (!user) throw new Error("Failed to resolve admin user");

  const { error: profileError } = await supabase
    .from("admin_profiles")
    .upsert({ user_id: user.id, full_name: "Ayana Outdoors Admin", role: "admin" });
  if (profileError) throw profileError;

  console.log(`admin_profiles row ready for ${email}`);
  console.log(`\nLog in at /admin/login with:\n  email: ${email}\n  password: ${password}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
