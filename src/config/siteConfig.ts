export const siteConfig = {
  name: "GrowValley Group",
  description:
    "Strategy, capital, and execution under one accountable advisory system. The strategy and advisory arm of the GrowValley ecosystem.",
  url: "https://gv.consulting",
  maintenanceMode: process.env.NEXT_PUBLIC_PRODUCTION_ONLINE !== "true",
};

export type SiteConfig = typeof siteConfig;
