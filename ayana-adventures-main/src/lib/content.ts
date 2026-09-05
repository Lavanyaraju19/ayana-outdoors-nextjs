import { cache } from "react";
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
  cta_tertiary_label: string;
  cta_tertiary_link: string;
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

export interface GalleryPhoto {
  id: string;
  title: string;
  image_path: string;
}

// Every fetcher below is wrapped in React's cache() so multiple call sites within the same
// request/render (e.g. layout.tsx and page.tsx both reading site_settings) share one Supabase
// round trip instead of racing independent ones — the actual root cause of a dev-only transient
// hydration mismatch found in InstagramMedia/Footer (see git history for details). Memoization is
// scoped to a single request; it never serves stale data across requests.

export const getHeroContent = cache(async (): Promise<HeroContent | null> => {
  const supabase = await createClient();
  const { data } = await supabase.from("hero_content").select("*").single();
  return data;
});

export const getImpactStats = cache(async (): Promise<ImpactStat[]> => {
  const supabase = await createClient();
  const { data } = await supabase.from("impact_stats").select("*").order("sort_order");
  return data ?? [];
});

export const getAdventures = cache(async (): Promise<Adventure[]> => {
  const supabase = await createClient();
  const { data } = await supabase.from("adventures").select("*").order("sort_order");
  return data ?? [];
});

export const getWhyAyanaItems = cache(async (): Promise<HomeCardItem[]> => {
  const supabase = await createClient();
  const { data } = await supabase.from("why_ayana_items").select("*").order("sort_order");
  return data ?? [];
});

export const getJourneyWithItems = cache(async (): Promise<HomeCardItem[]> => {
  const supabase = await createClient();
  const { data } = await supabase.from("journey_with_items").select("*").order("sort_order");
  return data ?? [];
});

export const getTestimonials = cache(async (): Promise<HomeCardItem[]> => {
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*").order("sort_order");
  return data ?? [];
});

export const getGalleryItems = cache(async (): Promise<GalleryItem[]> => {
  const supabase = await createClient();
  const { data } = await supabase.from("gallery_items").select("*").order("sort_order");
  return data ?? [];
});

export const getGalleryPhotos = cache(async (): Promise<GalleryPhoto[]> => {
  const supabase = await createClient();
  const { data } = await supabase.from("gallery_photos").select("*").order("sort_order");
  return data ?? [];
});

export const getMediaItems = cache(async (): Promise<HomeCardItem[]> => {
  const supabase = await createClient();
  const { data } = await supabase.from("media_items").select("*").order("sort_order");
  return data ?? [];
});

export const getFounderFacts = cache(async (): Promise<FounderFact[]> => {
  const supabase = await createClient();
  const { data } = await supabase.from("founder_facts").select("*").order("sort_order");
  return data ?? [];
});

export const getFaqItems = cache(async (): Promise<FaqItem[]> => {
  const supabase = await createClient();
  const { data } = await supabase.from("faq_items").select("*").order("sort_order");
  return data ?? [];
});

export const getAdditionalFaqQuestions = cache(async (): Promise<AdditionalFaqQuestion[]> => {
  const supabase = await createClient();
  const { data } = await supabase.from("additional_faq_questions").select("*").order("sort_order");
  return data ?? [];
});

export const getContactOptions = cache(async (): Promise<ContactOption[]> => {
  const supabase = await createClient();
  const { data } = await supabase.from("contact_options").select("*").order("sort_order");
  return data ?? [];
});

export const getSiteSettings = cache(async (): Promise<SiteSettings | null> => {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").single();
  return data;
});
