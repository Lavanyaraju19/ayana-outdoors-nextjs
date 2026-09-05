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
};

export default nextConfig;
