export const siteConfig = {
  name: "GrowValley Group",
  description:
    "Strategy, capital, and execution under one accountable advisory system. The strategy and advisory arm of the GrowValley ecosystem.",
  // Primary public site URL for SEO and absolute URLs
  // Prefer environment variable when provided; default to apex domain.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://gvg.ae",
  maintenanceMode: process.env.NEXT_PUBLIC_PRODUCTION_ONLINE !== "true",
};

export type SiteConfig = typeof siteConfig;
