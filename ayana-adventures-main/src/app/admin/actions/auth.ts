"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
  next: z.string().startsWith("/admin").optional(),
});

export type LoginState = { status: "idle" | "error"; message?: string };

export async function login(input: z.infer<typeof loginSchema>): Promise<LoginState> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { status: "error", message: "Incorrect email or password." };
  }

  redirect(parsed.data.next && parsed.data.next !== "/admin/login" ? parsed.data.next : "/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
