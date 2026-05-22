import React from "react";
import Link from "next/link";
import { Hero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import styles from "../../our-capabilities/Capabilities.module.scss";
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

function splitParagraphs(text?: string): string[] {
    if (!text?.trim()) return [];
    return text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);
}

/**
 * Service block for company detail pages.
 * Intentionally has no "Read more" link since individual service sub-pages
 * do not exist in the /companies route structure.
 */
function CompanyCapabilityBlock({
    service,
    index,
}: {
    service: any;
    index: number;
}) {
    const layout = getPillarCapabilityLayout(index);
    const imageSrc = resolvePillarCapabilityImageUrl(service, index, urlFor);
    const alt = service.title ? `${service.title} capability` : "Capability";

    const copy = (
        <div className={styles.capabilityCopy}>
            <h3 className={styles.capabilityCardTitle}>{service.title ?? ""}</h3>
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

export function CompanyPageContent({
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

    const pillarSlug = pillarData.slug ?? "";

    const heroEyebrow = heroData?.eyebrow ?? pillarData.title?.toUpperCase() ?? "";
    const heroHeadline = heroData?.headline ?? pillarData.heroHeadline ?? pillarData.title ?? "";
    const heroSubheadline = heroData?.subheadline ?? pillarData.heroSubheadline ?? "";
    const heroHasCTA = heroData?.hasCTA ?? (heroData?.ctaText ? true : false);
    const heroCtaText = heroData?.ctaText ?? "";
    const heroCtaHref = heroData?.ctaHref ?? "";

    const heroImage =
        pillarData.heroImage
            ? urlFor(pillarData.heroImage).url()
            : heroData?.image
                ? urlFor(heroData.image).url()
                : undefined;

    const services: any[] = pillarData.services ?? [];

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
        tag: item.tag ?? "Insight",
        image: item.mainImage ? urlFor(item.mainImage).url() : "",
        slug: item.slug,
    }));

    return (
        <main>
            <Hero
                isShort
                eyebrow={heroEyebrow}
                headline={heroHeadline}
                subheadline={heroSubheadline}
                image={heroImage}
                hasCTA={heroHasCTA}
                ctaText={heroCtaText}
                ctaHref={heroCtaHref}
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

            {/* Challenges / What We Do */}
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
                                        alt={pillarData.challengesHeadline ?? "What we do"}
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
                                        <p key={i} className={styles.pillarSpotlightLead}>{p}</p>
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

            {/* Services / Capabilities — rendered without sub-page links */}
            {services.length > 0 && (
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
                            {services.map((service: any, i: number) => (
                                <CompanyCapabilityBlock key={service.slug ?? i} service={service} index={i} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Who we work with */}
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
                                                <div key={i} className={styles.whoPill}>{item}</div>
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
                                        alt={pillarData.cardGridHeadline ?? "Who we work with"}
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

            {/* Engagement models & outcomes (Why section) */}
            {(pillarData.engagementModels?.length > 0 || pillarData.engagementOutcomes?.length > 0) && (
                <section className={`section-padding ${styles.engagementPanelSection}`}>
                    <div className="container">
                        {(() => {
                            const hasModels = pillarData.engagementModels?.length > 0;
                            const hasOutcomes = pillarData.engagementOutcomes?.length > 0;
                            const isWhyLayout = hasModels !== hasOutcomes;

                            return (
                        <div
                            className={[
                                styles.engagementPanel,
                                isWhyLayout ? styles.engagementPanelWhy : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}>
                            <div
                                className={[
                                    styles.engagementSplit,
                                    isWhyLayout ? styles.engagementSplitWhy : "",
                                    isWhyLayout ? styles.engagementSplitSingle : "",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}>
                                {hasModels &&
                                    (isWhyLayout ? (
                                        <div className={styles.engagementColWhy}>
                                            <h3 className={styles.engagementWhyTitle}>
                                                {pillarData.engagementModelsHeadline ?? ""}
                                            </h3>
                                            <span className={styles.engagementWhyRule} aria-hidden />
                                            {splitParagraphs(pillarData.engagementModelsIntro).map((p, i) => (
                                                <p key={i} className={styles.engagementWhyIntro}>
                                                    {p}
                                                </p>
                                            ))}
                                            <ul className={styles.engagementWhyList}>
                                                {pillarData.engagementModels.map((item: string) => (
                                                    <li key={item} className={styles.engagementWhyListItem}>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <div className={styles.engagementCol}>
                                            <h3>{pillarData.engagementModelsHeadline ?? ""}</h3>
                                            {splitParagraphs(pillarData.engagementModelsIntro).map((p, i) => (
                                                <p key={i} className={styles.engagementIntro}>
                                                    {p}
                                                </p>
                                            ))}
                                            <ul className={styles.engagementList}>
                                                {pillarData.engagementModels.map((item: string, i: number) => (
                                                    <li key={i} className={styles.engagementListItem}>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                {pillarData.engagementOutcomes && pillarData.engagementOutcomes.length > 0 && (
                                    <div className={styles.engagementCol}>
                                        <h3>{pillarData.engagementOutcomesHeadline ?? ""}</h3>
                                        <ul className={styles.engagementList}>
                                            {pillarData.engagementOutcomes.map((item: string, i: number) => (
                                                <li key={i} className={styles.engagementListItem}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                            );
                        })()}
                    </div>
                </section>
            )}

            {/* Insights carousel */}
            {features.insights && insightCarouselItems.length > 0 && (
                <InsightsCarousel
                    title="Insights"
                    description="Perspectives on strategy, growth, and execution."
                    exploreLink={{ text: "View all insights", href: "/insights" }}
                    insights={insightCarouselItems}
                />
            )}

            {/* Closing CTA — nextSection */}
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
                                    <p key={i} className={styles.ctaBannerPanelLead}>{p}</p>
                                ))}
                                {pillarData.nextSectionCtaLabel && (
                                    <Link href={pillarData.nextSectionCtaHref ?? "/contact"}>
                                        <Button size="lg" variant="secondary">
                                            {pillarData.nextSectionCtaLabel}
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </section>
                )}

            {/* Fallback closing CTA */}
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
                            {pillarData.ctaButtonLabel && (
                                <Link href="/contact">
                                    <Button size="lg" variant="secondary">
                                        {pillarData.ctaButtonLabel}
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
