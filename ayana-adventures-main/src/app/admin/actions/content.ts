"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/**
 * Every table the generic admin CRUD UI is allowed to touch. This allowlist is the actual
 * security boundary for the *shape* of what a client can ask for (RLS + is_admin() is the
 * boundary for *who* can write) — a table name that isn't in this list is rejected outright,
 * so a compromised/buggy client can never even attempt to write to auth.users or similar.
 */
const SORTABLE_TABLES = [
  "impact_stats",
  "adventures",
  "why_ayana_items",
  "journey_with_items",
  "testimonials",
  "gallery_items",
  "gallery_photos",
  "media_items",
  "founder_facts",
  "faq_items",
  "additional_faq_questions",
  "contact_options",
] as const;

const SINGLETON_TABLES = ["hero_content", "site_settings"] as const;

export type SortableTable = (typeof SORTABLE_TABLES)[number];
export type SingletonTable = (typeof SINGLETON_TABLES)[number];

function assertSortable(table: string): asserts table is SortableTable {
  if (!SORTABLE_TABLES.includes(table as SortableTable)) {
    throw new Error(`"${table}" is not an admin-editable table.`);
  }
}

function assertSingleton(table: string): asserts table is SingletonTable {
  if (!SINGLETON_TABLES.includes(table as SingletonTable)) {
    throw new Error(`"${table}" is not an admin-editable singleton.`);
  }
}

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const { data: profile } = await supabase.from("admin_profiles").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!profile) throw new Error("Not authorized.");

  return supabase;
}

function revalidateEverything() {
  // Simplest correct option for a low-traffic site: bust the whole tree (layout + every
  // nested page) rather than maintaining a table -> route map that can silently drift.
  revalidatePath("/", "layout");
}

export async function listRows(table: SortableTable) {
  const supabase = await createClient();
  assertSortable(table);
  const { data, error } = await supabase.from(table).select("*").order("sort_order");
  if (error) throw error;
  return data;
}

export async function createRow(table: SortableTable, values: Record<string, unknown>) {
  assertSortable(table);
  const supabase = await requireAdmin();

  const { count } = await supabase.from(table).select("*", { count: "exact", head: true });
  const { error } = await supabase.from(table).insert({ ...values, sort_order: count ?? 0 });
  if (error) throw error;

  revalidateEverything();
}

export async function updateRow(table: SortableTable, id: string, values: Record<string, unknown>) {
  assertSortable(table);
  const supabase = await requireAdmin();

  const { error } = await supabase.from(table).update(values).eq("id", id);
  if (error) throw error;

  revalidateEverything();
}

export async function deleteRow(table: SortableTable, id: string) {
  assertSortable(table);
  const supabase = await requireAdmin();

  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;

  revalidateEverything();
}

export async function moveRow(table: SortableTable, id: string, direction: "up" | "down") {
  assertSortable(table);
  const supabase = await requireAdmin();

  const { data: rows, error } = await supabase.from(table).select("id, sort_order").order("sort_order");
  if (error) throw error;

  const index = rows.findIndex((r) => r.id === id);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapWith < 0 || swapWith >= rows.length) return;

  const a = rows[index];
  const b = rows[swapWith];

  const [{ error: err1 }, { error: err2 }] = await Promise.all([
    supabase.from(table).update({ sort_order: b.sort_order }).eq("id", a.id),
    supabase.from(table).update({ sort_order: a.sort_order }).eq("id", b.id),
  ]);
  if (err1 || err2) throw err1 || err2;

  revalidateEverything();
}

export async function getSingleton(table: SingletonTable) {
  const supabase = await createClient();
  assertSingleton(table);
  const { data, error } = await supabase.from(table).select("*").single();
  if (error) throw error;
  return data;
}

export async function updateSingleton(table: SingletonTable, values: Record<string, unknown>) {
  assertSingleton(table);
  const supabase = await requireAdmin();

  const { error } = await supabase.from(table).update(values).eq("id", true);
  if (error) throw error;

  revalidateEverything();
}

export async function listEnquiries(status?: string) {
  const supabase = await requireAdmin();
  let query = supabase.from("enquiries").select("*, adventures(title)").order("created_at", { ascending: false });
  if (status && status !== "all") query = query.eq("status", status);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function updateEnquiryStatus(id: string, status: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/enquiries");
}
