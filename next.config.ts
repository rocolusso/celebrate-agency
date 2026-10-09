import type { NextConfig } from "next";

/**
 * Locales: ro (default, no prefix) and ru (/ru prefix).
 * Routing is file-based with two root layouts, src/app/(ro) and src/app/ru;
 * each renders its own <html lang> via src/app/_locale-pages/locale-layout.tsx.
 * No middleware and no built-in Next.js i18n config.
 */
const nextConfig: NextConfig = {
  experimental: {
    // URLs that match no route have no locale and no root layout:
    // Next.js renders src/app/global-not-found.tsx for them.
    globalNotFound: true,
  },
};

export default nextConfig;
