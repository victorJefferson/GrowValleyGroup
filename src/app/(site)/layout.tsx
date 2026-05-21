import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { FloatingContact } from "../../components/ui/FloatingContact";
import { TrustGuard } from "trust-guard-js";
import { trustGuardConfig } from "../../trustguard.config";
import { siteConfig } from "../../config/siteConfig";
import { MaintenanceMode } from "../../components/ui/MaintenanceMode";

import { client } from "../../lib/sanity";
import { serviceCategoriesQuery, siteSettingsQuery } from "../../lib/queries";

export const revalidate = 3600;

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (siteConfig.maintenanceMode) {
    return <MaintenanceMode />;
  }

  let siteSettings = null;
  let pillars: { title?: string; slug?: string }[] = [];
  try {
    [siteSettings, pillars] = await Promise.all([
      client.fetch(siteSettingsQuery),
      client.fetch(serviceCategoriesQuery),
    ]);
  } catch (e) {
    console.error("Error fetching site settings:", e);
  }

  return (
    <TrustGuard config={trustGuardConfig}>
      <Navbar settings={siteSettings} />
      <main className="siteWrapper">
        {children}
      </main>
      <Footer settings={siteSettings} pillars={pillars} />
      <FloatingContact />
    </TrustGuard>
  );
}
