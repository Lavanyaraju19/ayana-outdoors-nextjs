import { createClient } from "@/lib/supabase/server";

export interface ImpactStat {
  id: string;
  value: string;
  label: string;
  description: string;
}

export interface Adventure {
  id: string;
  title: string;
  image_path: string;
  description: string;
  duration: string;
  difficulty: string;
  age_group: string;
  learn_link: string;
  enquiry_link: string;
}

export interface HomeCardItem {
  id: string;
  title: string;
  description: string;
  link: string;
  label?: string | null;
}

export interface GalleryItem {
  id: string;
  title: string;
  image_path: string;
  description: string;
  link: string;
}

export interface FounderFact {
  id: string;
  title: string;
  subtitle: string | null;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface AdditionalFaqQuestion {
  id: string;
  question: string;
}

export interface ContactOption {
  id: string;
  title: string;
  description: string;
  action: string;
  link: string;
  external: boolean;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  headline_highlight: string;
  subheadline: string;
  highlights: string[];
  cta_primary_label: string;
  cta_primary_link: string;
  cta_secondary_label: string;
  cta_secondary_link: string;
  cta_tertiary_label: string | null;
  cta_tertiary_link: string | null;
}

export interface SiteSettings {
  phone: string;
  whatsapp_number: string;
  email: string;
  address_locality: string;
  address_region: string;
  social_instagram: string | null;
  social_youtube: string | null;
  social_facebook: string | null;
  social_linkedin: string | null;
}

export async function getHeroContent(): Promise<HeroContent | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("hero_content").select("*").single();
  return data;
}

export async function getImpactStats(): Promise<ImpactStat[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("impact_stats").select("*").order("sort_order");
  return data ?? [];
}

export async function getAdventures(): Promise<Adventure[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("adventures").select("*").order("sort_order");
  return data ?? [];
}

export async function getWhyAyanaItems(): Promise<HomeCardItem[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("why_ayana_items").select("*").order("sort_order");
  return data ?? [];
}

export async function getJourneyWithItems(): Promise<HomeCardItem[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("journey_with_items").select("*").order("sort_order");
  return data ?? [];
}

export async function getTestimonials(): Promise<HomeCardItem[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*").order("sort_order");
  return data ?? [];
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("gallery_items").select("*").order("sort_order");
  return data ?? [];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  image_path: string;
}

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("gallery_photos").select("*").order("sort_order");
  return data ?? [];
}

export async function getMediaItems(): Promise<HomeCardItem[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("media_items").select("*").order("sort_order");
  return data ?? [];
}

export async function getFounderFacts(): Promise<FounderFact[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("founder_facts").select("*").order("sort_order");
  return data ?? [];
}

export async function getFaqItems(): Promise<FaqItem[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("faq_items").select("*").order("sort_order");
  return data ?? [];
}

export async function getAdditionalFaqQuestions(): Promise<AdditionalFaqQuestion[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("additional_faq_questions").select("*").order("sort_order");
  return data ?? [];
}

export async function getContactOptions(): Promise<ContactOption[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("contact_options").select("*").order("sort_order");
  return data ?? [];
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").single();
  return data;
}
