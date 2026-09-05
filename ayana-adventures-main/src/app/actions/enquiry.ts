"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(200),
  email: z.string().trim().email("Please enter a valid email address.").max(320),
  phone: z.string().trim().min(7, "Please enter a valid phone or WhatsApp number.").max(30),
  childName: z.string().trim().max(200).optional().or(z.literal("")),
  childAge: z.string().trim().max(20).optional().or(z.literal("")),
  adventureId: z.string().uuid().optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  sourcePage: z.string().trim().min(1).max(200),
  // Honeypot: real visitors never fill this in — a filled value means a bot submitted the form.
  companyWebsite: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export type EnquiryFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof EnquiryInput, string>>;
};

export async function submitEnquiry(input: EnquiryInput): Promise<EnquiryFormState> {
  const parsed = enquirySchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors: EnquiryFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof enquirySchema>;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  // Bot caught by the honeypot: pretend success so it doesn't learn to adapt, but do nothing.
  if (parsed.data.companyWebsite) {
    return { status: "success" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("enquiries").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    child_name: parsed.data.childName || null,
    child_age: parsed.data.childAge || null,
    adventure_id: parsed.data.adventureId || null,
    message: parsed.data.message || null,
    source_page: parsed.data.sourcePage,
  });

  if (error) {
    console.error("Failed to save enquiry:", error);
    return {
      status: "error",
      message: "Something went wrong on our end saving your enquiry. Please try WhatsApp or call us directly.",
    };
  }

  // Best-effort notification only — the enquiry is already safely stored above regardless of
  // whether this succeeds. No-ops until RESEND_API_KEY is set (see .env.example).
  await notifyNewEnquiry(parsed.data).catch((err) => console.error("Enquiry email notification failed:", err));

  return { status: "success", message: "Thanks — we've received your enquiry and will get back to you shortly." };
}

async function notifyNewEnquiry(data: z.infer<typeof enquirySchema>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const notifyTo = process.env.ENQUIRY_NOTIFICATION_EMAIL;
  if (!notifyTo) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Ayana Outdoors Website <onboarding@resend.dev>",
      to: notifyTo,
      subject: `New enquiry from ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        data.childName && `Child's name: ${data.childName}`,
        data.childAge && `Child's age: ${data.childAge}`,
        data.message && `Message: ${data.message}`,
        `Submitted from: ${data.sourcePage}`,
      ]
        .filter(Boolean)
        .join("\n"),
    }),
  });
}
