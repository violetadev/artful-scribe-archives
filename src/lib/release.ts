/** Update these fields when you publish a new build. */
export const studioRelease = {
  version: "1.2.1",
  /** ISO date (YYYY-MM-DD) */
  releasedAt: "2026-05-25",
  downloads: {
    /** Served from public/releases/ (Vite copies public/ to site root) */
    windows: "/releases/Studio_by_Saki_1.2.1_x64_en-US.msi",
    mac: "https://github.com/violetadev/artful-scribe-archives/releases/download/v1.2.1/Studio.by.Saki_1.2.1_aarch64.dmg",
  },
} as const;
