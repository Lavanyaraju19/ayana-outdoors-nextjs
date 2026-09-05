import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ContinuousBackgroundVideo from "@/components/ContinuousBackgroundVideo";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SchemaMarkup from "@/components/SchemaMarkup";
import { createClient } from "@/lib/supabase/server";
import "./globals.css";

const SITE_URL = "https://www.ayanaoutdoors.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ayana Outdoors | Kids Adventure Camps & Weekend Treks from Bangalore",
    template: "%s | Ayana Outdoors",
  },
  description:
    "Ayana Outdoors offers safe, immersive adventure camps and weekend treks for children near Bangalore. Book Himalayan summer camps, Western Ghats experiences, and family-friendly weekend treks today.",
  authors: [{ name: "Ayana Outdoors" }],
  openGraph: {
    title: "Ayana Outdoors | Kids Adventure Camps from Bangalore",
    description:
      "Ayana Outdoors offers safe, immersive adventure camps and weekend treks for children near Bangalore. Book Himalayan summer camps, Western Ghats experiences, and family-friendly weekend treks today.",
    type: "website",
    url: SITE_URL,
    images: [{ url: "/assets/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayana Outdoors | Outdoor Learning for Children",
    description:
      "Safe guided treks, nature-based education, and adventure learning programs for children and families from Bangalore.",
    images: ["/assets/og-image.jpg"],
  },
};

async function getSiteSettings() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").single();
  return data;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  // Falls back to the site's real published details if the settings row is ever missing —
  // never fabricated data, just the same values seed.sql ships so the site never renders blank.
  const footerSettings = {
    phone: settings?.phone ?? "+91 98765 43210",
    whatsappNumber: settings?.whatsapp_number ?? "919876543210",
    email: settings?.email ?? "info@ayanaoutdoors.com",
    addressLocality: settings?.address_locality ?? "Bengaluru",
    addressRegion: settings?.address_region ?? "Karnataka",
    socialInstagram: settings?.social_instagram ?? null,
    socialYoutube: settings?.social_youtube ?? null,
    socialFacebook: settings?.social_facebook ?? null,
    socialLinkedin: settings?.social_linkedin ?? null,
  };

  return (
    <html lang="en">
      <body>
        <SchemaMarkup addressLocality={footerSettings.addressLocality} addressRegion={footerSettings.addressRegion} />
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ContinuousBackgroundVideo posterSrc="/images/camp-hero.jpg" />
          <CustomCursor />
          <Navbar />
          {children}
          <Footer settings={footerSettings} />
          <WhatsAppButton whatsappNumber={footerSettings.whatsappNumber} />
        </TooltipProvider>
      </body>
    </html>
  );
}
