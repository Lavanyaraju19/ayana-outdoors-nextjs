"use server";

import { createClient } from "@/lib/supabase/server";

export async function uploadMedia(formData: FormData): Promise<{ path: string } | { error: string }> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No file provided." };
  }
  if (!file.type.startsWith("image/")) {
    return { error: "Only image files can be uploaded here." };
  }
  if (file.size > 10 * 1024 * 1024) {
    return { error: "Image is too large (max 10MB)." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated." };

  const ext = file.name.split(".").pop() || "jpg";
  const objectPath = `uploads/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("media").upload(objectPath, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) return { error: error.message };

  const { data } = supabase.storage.from("media").getPublicUrl(objectPath);
  return { path: data.publicUrl };
}
