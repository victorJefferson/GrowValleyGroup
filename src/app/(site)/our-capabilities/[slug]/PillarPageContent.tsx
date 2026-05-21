import React from "react";
import Link from "next/link";
import { Hero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check } from "lucide-react";
import styles from "../Capabilities.module.scss";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";
import { TrustedBy } from "@/components/ui/TrustedBy";
import {
  InsightsCarousel,
  type InsightItem,
} from "@/components/ui/InsightsCarousel";
import { features } from "@/config/features";
import {
  getPillarCapabilityLayout,
  resolvePillarCapabilityImageUrl,
  resolvePillarSectionImageUrl,
  type PillarCapabilityLayout,
} from "@/lib/pillarCapabilityCard";

/** Canonical display order for Growth Advisory pillar services (other pillars ignore unknown slugs). */
const GROWTH_ADVISORY_SERVICE_ORDER = [
  "growth-strategy",
  "business-transformation",
  "leadership-transformation",
  "operations-transformation",
  "business-structuring",
];

/** Canonical display order for Capital Advisory pillar services. */
const CAPITAL_ADVISORY_SERVICE_ORDER = [
  "capital-strategy",
  "investment-readiness",
  "investment-materials",
  "capital-structuring",
  "transaction-readiness",
];

/** Canonical display order for Innovation Advisory pillar services. */
const INNOVATION_ADVISORY_SERVICE_ORDER = [
  "innovation-strategy",
  "venture-studio",
  "corporate-venture-studios",
  "family-office-venture-studios",
  "university-venture-studios",
  "community-venture-studios",
];

/** Canonical display order for Project Advisory pillar services. */
const PROJECT_ADVISORY_SERVICE_ORDER = [
  "strategy-and-design",
  "portfolio-tracking",
  "risk-and-issue-management",
  "project-feasibility",
  "project-investment-readiness",
  "capability-building-and-handover",
];

/** Canonical display order for Family Office Advisory pillar services. */
const FAMILY_OFFICE_SETUP_SERVICE_ORDER = [
  "governance-and-structure",
  "wealth-structuring",
  "investment-operations",
  "long-term-management",
];

function sortPillarServices(services: any[] | undefined, pillarSlug: string) {
  if (!services?.length) return [];
  const order =
    pillarSlug === "growth-advisory"
      ? GROWTH_ADVISORY_SERVICE_ORDER
      : pillarSlug === "capital-advisory"
        ? CAPITAL_ADVISORY_SERVICE_ORDER
        : pillarSlug === "innovation-advisory"
          ? INNOVATION_ADVISORY_SERVICE_ORDER
          : pillarSlug === "project-advisory"
            ? PROJECT_ADVISORY_SERVICE_ORDER
            : pillarSlug === "family-office-advisory"
              ? FAMILY_OFFICE_SETUP_SERVICE_ORDER
              : [];
  return [...services].sort((a, b) => {
    if (!order.length) return (a.title || "").localeCompare(b.title || "");
    const ia = order.indexOf(a.slug);
    const ib = order.indexOf(b.slug);
    if (ia === -1 && ib === -1) return (a.title || "").localeCompare(b.title || "");
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

function splitParagraphs(text?: string): string[] {
  if (!text?.trim()) return [];
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function PillarCapabilityBlock({
  service,
  index,
}: {
  service: any;
  index: number;
}) {
  const layout = getPillarCapabilityLayout(index);
  const imageSrc = resolvePillarCapabilityImageUrl(service, index, urlFor);
  const href = `/our-capabilities/${service.slug}`;
  const alt = service.title ? `${service.title} capability` : "Capability";

  const copy = (
    <div className={styles.capabilityCopy}>
      <h3 className={styles.capabilityCardTitle}>{service.title}</h3>
      {service.pillarLandingTagline && (
        <p className={styles.capabilityCardTagline}>{service.pillarLandingTagline}</p>
      )}
      {service.pillarLandingBullets && service.pillarLandingBullets.length > 0 && (
        <ul className={styles.capabilityCardBullets}>
          {service.pillarLandingBullets.map((line: string, j: number) => (
            <li key={j}>{line}</li>
          ))}
        </ul>
      )}
      {!service.pillarLandingBullets?.length && service.description && (
        <p className={styles.capabilityCardFallbackDesc}>{service.description}</p>
      )}
      {service.pillarLandingOutcome && (
        <p className={styles.capabilityOutcome}>
          <strong>Client outcome:</strong> {service.pillarLandingOutcome}
        </p>
      )}
      <div className={styles.capabilityLinkRow}>
        <Link href={href} className={styles.capabilityExploreLink} prefetch={false}>
          Read more <ArrowRight size={18} strokeWidth={2} aria-hidden />
        </Link>
      </div>
    </div>
  );

  const figure = (
    <figure className={styles.capabilityFigure}>
      <img
        src={imageSrc}
        alt={alt}
        width={1400}
        height={900}
        className={styles.capabilityImg}
        loading={index < 2 ? "eager" : "lazy"}
        decoding="async"
      />
    </figure>
  );

  const shellClass = `${styles.capabilityShell} ${layoutClass(layout)}`;

  if (layout === "splitImageLeft") {
    return (
      <article className={shellClass}>
        {figure}
        <div className={styles.capabilityShellInner}>{copy}</div>
      </article>
    );
  }

  // splitImageRight
  return (
    <article className={shellClass}>
      <div className={styles.capabilityShellInner}>{copy}</div>
      {figure}
    </article>
  );
}

function layoutClass(layout: PillarCapabilityLayout): string {
  return layout === "splitImageLeft"
    ? styles.capabilityLayoutSplitLeft
    : styles.capabilityLayoutSplitRight;
}

export function PillarPageContent({
  pillarData,
  heroData,
  trustedByLine,
  insightsCarousel = [],
}: {
  pillarData: any;
  heroData?: any;
  trustedByLine?: string;
  insightsCarousel?: unknown[];
}) {
  if (!pillarData) return null;

  const pillarSlug = pillarData.slug || "";

  const defaultHero = {
    eyebrow: pillarData.title?.toUpperCase() || "CAPABILITIES",
    headline: pillarData.heroHeadline || pillarData.title,
    subheadline: pillarData.heroSubheadline,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1400",
    hasCTA: true,
    ctaText: "Talk to Our Advisor",
    ctaHref: "/contact",
  };

  const displayHero = { ...defaultHero, ...heroData };
  const heroImage = pillarData.heroImage
    ? urlFor(pillarData.heroImage).url()
    : heroData?.image
      ? urlFor(heroData.image).url()
      : displayHero.image;

  const servicesSorted = sortPillarServices(pillarData.services, pillarSlug);

  const pillarSlugChecksum =
    pillarSlug.split("").reduce((acc: number, ch: string) => acc + ch.charCodeAt(0), 0) || 0;
  const challengesSectionImageSrc = resolvePillarSectionImageUrl(
    pillarData.challengesSectionImage,
    pillarSlugChecksum,
    urlFor
  );
  const whoSectionImageSrc = resolvePillarSectionImageUrl(
    pillarData.whoWeWorkWithSectionImage,
    pillarSlugChecksum + 19,
    urlFor
  );

  const showClosingBanner =
    (pillarData.ctaHeadline || pillarData.ctaBody) &&
    !pillarData.nextSectionTitle &&
    !pillarData.nextSectionBody?.trim();

  const insightCarouselItems: InsightItem[] = (insightsCarousel as any[]).map((item: any) => ({
    id: item._id,
    title: item.title,
    date: item.publishedAt
      ? new Date(item.publishedAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "",
    tag: item.tag || "Insight",
    image: item.mainImage ? urlFor(item.mainImage).url() : "",
    slug: item.slug,
  }));

  return (
    <main>
      <Hero
        isShort
        eyebrow={displayHero.eyebrow}
        headline={displayHero.headline}
        subheadline={displayHero.subheadline}
        image={heroImage}
        hasCTA={displayHero.hasCTA !== false && !!(displayHero.ctaText && displayHero.ctaHref)}
        ctaText={displayHero.ctaText}
        ctaHref={displayHero.ctaHref}
      />

      <TrustedBy line={trustedByLine} />

      {/* Impact stats */}
      {pillarData.stats && pillarData.stats.length > 0 && (
        <section className={styles.impactStripSection} aria-label="Impact statistics">
          <div className="container">
            <ul className={styles.impactStrip}>
              {pillarData.stats.map((s: any, i: number) => {
                const hasNumber = s.number && String(s.number).trim().length > 0;
                return (
                  <li key={i} className={styles.impactStripItem}>
                    {hasNumber ? (
                      <>
                        <span className={styles.impactStripNumber}>{s.number}</span>
                        <span className={styles.impactStripLabel}>{s.label}</span>
                      </>
                    ) : (
                      <span className={styles.impactStripLabelOnly}>{s.label}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* OUR APPROACH (optional) */}
      {(pillarData.approachHeadline || pillarData.approachBody?.length) && (
        <section className={`${styles.introSection} ${styles.bgLight}`}>
          <div className="container">
            <div className={styles.introContent}>
              <span className={styles.sectionEyebrow}>OUR APPROACH</span>
              {pillarData.approachHeadline && (
                <h2 className={styles.introHeading}>{pillarData.approachHeadline}</h2>
              )}
              {pillarData.approachBody && (
                <div className={styles.introBody}>
                  <div className={styles.introParagraph}>
                    <PortableText value={pillarData.approachBody} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Challenges — image left, copy right (desktop); no CTA */}
      {(pillarData.challengesHeadline ||
        pillarData.challengesBullets?.length > 0 ||
        pillarData.challengesClosing?.trim()) && (
        <section
          className={`section-padding ${styles.pillarSpotlightSection} ${styles.pillarSpotlightSectionChallenges}`}
        >
          <div className="container">
            <div className={styles.pillarSpotlightGrid}>
              <figure className={styles.pillarSpotlightFigure}>
                <img
                  src={challengesSectionImageSrc}
                  alt={pillarData.challengesHeadline || "Challenges we solve"}
                  width={1400}
                  height={900}
                  className={styles.pillarSpotlightImg}
                  loading="eager"
                  decoding="async"
                />
              </figure>
              <div className={styles.pillarSpotlightCopy}>
                {pillarData.challengesHeadline && (
                  <h2 className={styles.pillarSpotlightHeading}>{pillarData.challengesHeadline}</h2>
                )}
                {splitParagraphs(pillarData.challengesIntro).map((p, i) => (
                  <p key={i} className={styles.pillarSpotlightLead}>
                    {p}
                  </p>
                ))}
                {pillarData.challengesBullets && pillarData.challengesBullets.length > 0 && (
                  <ul className={styles.challengeBulletList}>
                    {pillarData.challengesBullets.map((item: string, i: number) => (
                      <li key={i}>
                        <Check className={styles.challengeCheck} size={18} aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {pillarData.challengesClosing?.trim() && (
                  <p className={styles.pillarSpotlightLead}>{pillarData.challengesClosing.trim()}</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Capabilities / services */}
      {servicesSorted.length > 0 && (
        <section className={`section-padding ${styles.capabilitiesSection}`}>
          <div className="container">
            {(pillarData.servicesHeadline || pillarData.servicesSubheadline) && (
              <header className={styles.capabilitiesHeader}>
                {pillarData.servicesHeadline && (
                  <h2 className={styles.capabilitiesTitle}>{pillarData.servicesHeadline}</h2>
                )}
                {pillarData.servicesSubheadline && (
                  <p className={styles.capabilitiesIntro}>{pillarData.servicesSubheadline}</p>
                )}
              </header>
            )}

            <div className={styles.capabilityCardGrid}>
              {servicesSorted.map((service: any, i: number) => (
                <PillarCapabilityBlock key={service.slug} service={service} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Who we work with — copy left, image right; positioning quote; no CTA */}
      {(pillarData.cardGridEyebrow ||
        pillarData.cardGridHeadline ||
        pillarData.cardGridBody ||
        pillarData.whoWeWorkWith?.length > 0) && (
        <section
          className={`section-padding ${styles.pillarSpotlightSection} ${styles.pillarSpotlightSectionWho}`}
        >
          <div className="container">
            <div className={styles.pillarSpotlightGrid}>
              <div className={styles.pillarSpotlightCopy}>
                {pillarData.cardGridEyebrow && (
                  <span className={styles.pillarSpotlightEyebrow}>{pillarData.cardGridEyebrow}</span>
                )}
                {pillarData.cardGridHeadline && (
                  <h2 className={styles.pillarSpotlightHeading}>{pillarData.cardGridHeadline}</h2>
                )}
                {pillarData.cardGridBody && (
                  <p className={styles.pillarSpotlightLead}>{pillarData.cardGridBody}</p>
                )}

                {pillarData.whoWeWorkWith && pillarData.whoWeWorkWith.length > 0 && (
                  <div className={styles.whoPillGrid}>
                    {pillarData.whoWeWorkWith.map((item: string, i: number) => (
                      <div key={i} className={styles.whoPill}>
                        {item}
                      </div>
                    ))}
                  </div>
                )}

                {pillarData.positioningText && (
                  <blockquote className={styles.pillarQuote}>{pillarData.positioningText}</blockquote>
                )}
              </div>

              <figure className={styles.pillarSpotlightFigure}>
                <img
                  src={whoSectionImageSrc}
                  alt={pillarData.cardGridHeadline || "Who we work with"}
                  width={1400}
                  height={900}
                  className={styles.pillarSpotlightImg}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
          </div>
        </section>
      )}

      {/* Engagement models & outcomes */}
      {(pillarData.engagementModels?.length > 0 || pillarData.engagementOutcomes?.length > 0) && (
        <section className={`section-padding ${styles.engagementPanelSection}`}>
          <div className="container">
            <div className={styles.engagementPanel}>
              <div className={styles.engagementSplit}>
                {pillarData.engagementModels && pillarData.engagementModels.length > 0 && (
                  <div className={styles.engagementCol}>
                    <h3>{pillarData.engagementModelsHeadline || "Engagement Models"}</h3>
                    {pillarData.engagementModelsIntro && (
                      <p className={styles.engagementIntro}>{pillarData.engagementModelsIntro}</p>
                    )}
                    <ul className={styles.engagementList}>
                      {pillarData.engagementModels.map((item: string, i: number) => (
                        <li key={i} className={styles.engagementListItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {pillarData.engagementOutcomes && pillarData.engagementOutcomes.length > 0 && (
                  <div className={styles.engagementCol}>
                    <h3>{pillarData.engagementOutcomesHeadline || "Engagement Outcomes"}</h3>
                    <ul className={styles.engagementList}>
                      {pillarData.engagementOutcomes.map((item: string, i: number) => (
                        <li key={i} className={styles.engagementListItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Insights carousel — gated by features.insights (same as home) */}
      {features.insights && insightCarouselItems.length > 0 && (
        <InsightsCarousel
          title="Insights"
          description="Perspectives on strategy, growth, and execution."
          exploreLink={{ text: "View all insights", href: "/insights" }}
          insights={insightCarouselItems}
        />
      )}

      {/* Closing CTA — same pattern as capabilities index (`ctaBanner` + `ctaBannerPanel`) */}
      {(pillarData.nextSectionTitle ||
        (pillarData.nextSectionBody && pillarData.nextSectionBody.trim())) && (
        <section className={styles.ctaBanner}>
          <div className="container">
            <div className={styles.ctaBannerPanel}>
              {pillarData.nextSectionTitle && (
                <h2 className={styles.speakToAnExpertBannerHeading}>{pillarData.nextSectionTitle}</h2>
              )}
              {(pillarData.nextSectionBody
                ? splitParagraphs(pillarData.nextSectionBody)
                : []
              ).map((p, i) => (
                <p key={i} className={styles.ctaBannerPanelLead}>
                  {p}
                </p>
              ))}
              <Link href={pillarData.nextSectionCtaHref || "/contact"}>
                <Button size="lg" variant="secondary">
                  {pillarData.nextSectionCtaLabel || "Talk to Our Advisor"}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Fallback CTA when no next-section block */}
      {showClosingBanner && (
        <section className={styles.ctaBanner}>
          <div className="container">
            <div className={styles.ctaBannerPanel}>
              {pillarData.ctaHeadline && (
                <h2 className={styles.speakToAnExpertBannerHeading}>{pillarData.ctaHeadline}</h2>
              )}
              {pillarData.ctaBody && (
                <p className={styles.ctaBannerPanelLead}>{pillarData.ctaBody}</p>
              )}
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                  {pillarData.ctaButtonLabel || "Talk to Our Advisor"}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Removed from Growth-style flow: how it works, old positioning strip, duplicate stats placement */}
    </main>
  );
}
