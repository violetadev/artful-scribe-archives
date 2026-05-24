/** Update these fields when you publish a new build. */
export const studioRelease = {
  version: "1.0.0",
  /** ISO date (YYYY-MM-DD) */
  releasedAt: "2026-05-21",
  downloads: {
    /** Served from public/releases/ (Vite copies public/ to site root) */
    windows: "/releases/Studio_1.0.0_x64_en-US.msi",
    mac: "https://github.com/violetadev/artful-scribe-archives/releases/download/v1.0.0/Studio_1.0.0_aarch64.dmg",
  },
} as const;
