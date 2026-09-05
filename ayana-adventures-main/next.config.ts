import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Pins file tracing to this project even if a parent directory happens to have its own
  // lockfile (harmless either way, just silences a misleading warning about which root Next
  // thinks it's in).
  outputFileTracingRoot: path.join(__dirname),
  // Local dev/test tooling (Playwright, curl) hits the server via 127.0.0.1 while Next's own
  // dev server identifies as localhost — without this, dev-only HMR requests from 127.0.0.1
  // get blocked, which silently breaks client-side hydration (forms fall back to native
  // submission). Production is unaffected — this only gates dev-mode resources.
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  // Admin-uploaded gallery/media images are stored in Supabase Storage and referenced by their
  // absolute public URL (see src/app/admin/actions/media.ts) — next/image refuses to optimize an
  // external host unless it's explicitly allowed here.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co', pathname: '/storage/v1/object/public/**' },
      { protocol: 'http', hostname: '127.0.0.1', pathname: '/storage/v1/object/public/**' },
    ],
  },
};

export default nextConfig;
