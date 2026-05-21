"use client";

import { Hero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { Solutions } from "@/components/sections/Solutions/Solutions";
import { WhoWeWorkWith } from "@/components/sections/WhoWeWorkWith/WhoWeWorkWith";
import styles from "./Capabilities.module.scss";

interface CapabilitiesContentProps {
  heroData?: any;
  capabilitiesPageSettings?: any;
  solutionsData?: any;
  whoWeWorkWithData?: any;
}

export default function CapabilitiesContent({ 
  heroData, 
  capabilitiesPageSettings,
  solutionsData,
  whoWeWorkWithData
}: CapabilitiesContentProps) {
  const heroImage = heroData?.image ? urlFor(heroData.image).url() : undefined;

  const introHeading = capabilitiesPageSettings?.introHeading ?? "";
  const introParagraph = capabilitiesPageSettings?.introParagraph ?? "";
  const bottomCtaHeadline = capabilitiesPageSettings?.bottomCtaHeadline ?? "";
  const bottomCtaButtonText = capabilitiesPageSettings?.bottomCtaButtonText ?? "";
  const bottomCtaButtonLink = capabilitiesPageSettings?.bottomCtaButtonLink ?? "/contact";

  return (
    <main>
      <Hero
        eyebrow={heroData?.eyebrow ?? ""}
        headline={heroData?.headline ?? ""}
        subheadline={heroData?.subheadline ?? ""}
        ctaText={heroData?.ctaText ?? ""}
        ctaHref={heroData?.ctaHref ?? ""}
        hasCTA={heroData?.hasCTA ?? false}
        image={heroImage}
      />

      {/* PAGE INTRO */}
      {(introHeading || introParagraph) && (
        <section className={styles.introSection}>
          <div className="container">
            <div className={styles.introContent}>
              {introHeading && (
                <h2 className={styles.introHeading}>{introHeading}</h2>
              )}
              {introParagraph && (
                <p
                  className={styles.introParagraph}
                  dangerouslySetInnerHTML={{ __html: introParagraph.replace(/\n/g, "<br />") }}
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Solutions Section */}
      <Solutions cmsData={solutionsData} />

      {/* WHO WE WORK WITH */}
      <WhoWeWorkWith cmsData={whoWeWorkWithData} />

      {/* BOTTOM CTA */}
      {(bottomCtaHeadline || bottomCtaButtonText) && (
        <section className={styles.ctaBanner}>
          <div className="container">
            <div className={styles.ctaBannerPanel}>
              {bottomCtaHeadline && (
                <h2 className={styles.speakToAnExpertBannerHeading}>{bottomCtaHeadline}</h2>
              )}
              {bottomCtaButtonText && (
                <Link href={bottomCtaButtonLink}>
                  <Button size="lg" variant="secondary">
                    {bottomCtaButtonText}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
