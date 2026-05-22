"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { getHomeWhoIcon } from "@/config/homeWhoIcons";
import { Hero, type StackedHeroLine } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { urlFor } from "@/lib/sanity";
import styles from "./home.module.scss";

type HomeStat = {
  metricValue?: string;
  metricLabel?: string;
  supportingLabel?: string;
};

type WhoClientType = {
  label?: string;
  icon?: string;
};

type HomeServiceBlock = {
  title?: string;
  shortDescription?: string;
  supportingCopy?: string;
  featureHighlights?: string[];
  sideCardEyebrow?: string;
  sideCardHeadline?: string;
  sideCardCtaText?: string;
  sideCardCtaHref?: string;
  pillarHref?: string;
};

interface HomeContentProps {
  heroData: Record<string, unknown> | null;
  homePage?: Record<string, unknown> | null;
}

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function arr<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

export default function HomeContent({ heroData, homePage }: HomeContentProps) {
  const h = homePage ?? {};

  const stats = arr<HomeStat>(h.stats);
  const painPointCards = arr<string>(h.painPointCards);
  const serviceBlocks = arr<HomeServiceBlock>(h.serviceBlocks);
  const whoClientTypes = arr<WhoClientType>(h.whoClientTypes);
  const whyBullets = arr<string>(h.whyBullets);
  const expertiseItems = arr<string>(h.expertiseItems);
  const expertiseHasTrailing = expertiseItems.length % 2 === 1;
  const expertisePairedItems = expertiseHasTrailing
    ? expertiseItems.slice(0, -1)
    : expertiseItems;
  const expertiseTrailingItem = expertiseHasTrailing
    ? expertiseItems[expertiseItems.length - 1]
    : null;

  const cmsStacked = arr<{ text?: string; muted?: boolean }>(heroData?.stackedLines).filter(
    (l) => l?.text,
  );
  const stackedLines: StackedHeroLine[] | undefined = cmsStacked.length
    ? cmsStacked.map((l) => ({ text: str(l.text), muted: Boolean(l.muted) }))
    : undefined;

  const heroImage = (() => {
    if (heroData?.image) {
      try {
        return urlFor(heroData.image as never).url();
      } catch {
        return undefined;
      }
    }
    return undefined;
  })();

  const heroEyebrow = str(heroData?.eyebrow);
  const heroHeadline = str(heroData?.headline);
  const heroSub = str(heroData?.subheadline);
  const heroCta = str(heroData?.ctaText);
  const heroHref = str(heroData?.ctaHref) || "/contact";
  const trustBarText = str(heroData?.trustBarText);
  const hasCTA = heroData?.hasCTA !== false;

  return (
    <main className={styles.homeMain}>
      <Hero
        eyebrow={heroEyebrow || undefined}
        headline={stackedLines?.length ? "" : heroHeadline}
        subheadline={heroSub || undefined}
        ctaText={heroCta || undefined}
        ctaHref={heroHref}
        hasCTA={hasCTA && Boolean(heroCta)}
        stackedLines={stackedLines}
        trustBarText={trustBarText || undefined}
        image={heroImage}
      />

      {stats.length > 0 && (
        <section className={styles.statsBand} aria-label="Credibility metrics">
          <div className="container">
            <ScrollReveal>
              <div className={styles.statsGrid}>
                {stats.map((stat, i) => (
                  <ScrollReveal key={`${stat.metricLabel}-${i}`} delay={i * 90} variant="fadeUp">
                    <article className={styles.statItem}>
                      <span className={styles.statValue}>{stat.metricValue}</span>
                      {stat.metricLabel ? (
                        <p className={styles.statMetric}>{stat.metricLabel}</p>
                      ) : null}
                      {stat.supportingLabel ? (
                        <p className={styles.statSupport}>{stat.supportingLabel}</p>
                      ) : null}
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {(str(h.positioningHeadline) || painPointCards.length > 0) && (
        <section className={styles.positioningBand} aria-labelledby="positioning-heading">
          <div className="container">
            <ScrollReveal>
              <div className={styles.centerBlock}>
                {str(h.positioningEyebrow) ? (
                  <p className={styles.eyebrow}>{str(h.positioningEyebrow)}</p>
                ) : null}
                {str(h.positioningHeadline) ? (
                  <h2 id="positioning-heading" className={styles.sectionTitle}>
                    {str(h.positioningHeadline)}
                  </h2>
                ) : null}
                <span className={styles.decorRule} aria-hidden />
                {str(h.positioningSupportingCopy) ? (
                  <p className={styles.lead}>{str(h.positioningSupportingCopy)}</p>
                ) : null}
              </div>
            </ScrollReveal>

            {painPointCards.length > 0 && (
              <ScrollReveal delay={80}>
                <div className={styles.painGrid}>
                  {painPointCards.map((text, idx) => (
                    <article key={`pain-${idx}`} className={styles.painCard}>
                      <span className={styles.painCardIcon} aria-hidden>
                        <X size={18} strokeWidth={2} />
                      </span>
                      <p className={styles.painCardText}>{text}</p>
                    </article>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {(str(h.positioningStatement) || str(h.positioningCtaText)) && (
              <ScrollReveal delay={120}>
                <div className={styles.statementCard}>
                  {str(h.positioningStatement) ? <p>{str(h.positioningStatement)}</p> : null}
                  {str(h.positioningCtaText) ? (
                    <div className={styles.statementCardCta}>
                      <Link href={str(h.positioningCtaHref) || "/our-capabilities"}>
                        <Button type="button" variant="advisor" size="lg">
                          <span>{str(h.positioningCtaText)}</span>
                          <ArrowRight size={18} aria-hidden strokeWidth={2} />
                        </Button>
                      </Link>
                    </div>
                  ) : null}
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>
      )}

      {(str(h.ecosystemHeadline) || serviceBlocks.length > 0) && (
        <>
          {(str(h.ecosystemHeadline) || str(h.ecosystemSupportingCopy)) && (
            <section className={styles.ecosystemBand} aria-labelledby="ecosystem-heading">
              <div className="container">
                <ScrollReveal>
                  <div className={styles.centerBlock}>
                    {str(h.ecosystemHeadline) ? (
                      <h2 id="ecosystem-heading" className={styles.sectionTitle}>
                        {str(h.ecosystemHeadline)}
                      </h2>
                    ) : null}
                    <span className={styles.decorRule} aria-hidden />
                    {str(h.ecosystemSupportingCopy) ? (
                      <p className={`${styles.lead} ${styles.muted}`}>{str(h.ecosystemSupportingCopy)}</p>
                    ) : null}
                  </div>
                </ScrollReveal>
              </div>
            </section>
          )}

          {serviceBlocks.length > 0 && (
            <section className={styles.servicesBand} aria-label="Advisory services">
              <div className={`container ${styles.serviceList}`}>
                {serviceBlocks.map((block, idx) => {
                  const features = arr<string>(block.featureHighlights);
                  const sideHeadline =
                    str(block.shortDescription) || str(block.sideCardHeadline);
                  return (
                    <ScrollReveal key={`${block.title}-${idx}`} delay={idx * 40}>
                      <article
                        className={styles.serviceRow}
                        aria-labelledby={`service-${idx}`}>
                        <div className={styles.serviceMain}>
                          <h3 id={`service-${idx}`} className={styles.serviceTitle}>
                            {block.title}
                          </h3>
                          {block.shortDescription ? (
                            <p className={styles.serviceShort}>{block.shortDescription}</p>
                          ) : null}
                          <div className={styles.serviceRule} aria-hidden />
                          {block.supportingCopy ? (
                            <p className={styles.serviceBody}>{block.supportingCopy}</p>
                          ) : null}
                          {block.pillarHref ? (
                            <Link href={block.pillarHref} className={styles.learnMoreLink}>
                              Learn more about {block.title}{" "}
                              <ArrowRight size={14} aria-hidden strokeWidth={2} />
                            </Link>
                          ) : null}
                        </div>
                        <div className={styles.serviceSide}>
                          <div className={styles.sideCard}>
                            {block.sideCardEyebrow ? (
                              <p className={styles.sideEyebrow}>{block.sideCardEyebrow}</p>
                            ) : null}
                            {sideHeadline ? (
                              <p className={styles.sideHeadline}>{sideHeadline}</p>
                            ) : null}
                            {features.length > 0 && (
                              <ul className={styles.featureList}>
                                {features.map((f) => (
                                  <li key={`side-${f}`}>{f}</li>
                                ))}
                              </ul>
                            )}
                            {block.sideCardCtaText ? (
                              <Link
                                href={block.sideCardCtaHref || "/contact"}
                                className={styles.sideCta}>
                                <Button type="button" variant="advisor" size="lg">
                                  <span>{block.sideCardCtaText}</span>
                                  <ArrowRight size={18} aria-hidden strokeWidth={2} />
                                </Button>
                              </Link>
                            ) : null}
                          </div>
                        </div>
                      </article>
                    </ScrollReveal>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}

      {str(h.whoHeadline) && (
        <section className={styles.whoBand} aria-labelledby="who-heading">
          <div className="container">
            <ScrollReveal>
              <div className={styles.centerBlock}>
                <h2 id="who-heading" className={styles.sectionTitle}>
                  {str(h.whoHeadline)}
                </h2>
                <span className={styles.decorRule} aria-hidden />
                {str(h.whoSupportingCopy) ? (
                  <p className={`${styles.lead} ${styles.muted}`}>{str(h.whoSupportingCopy)}</p>
                ) : null}
              </div>
            </ScrollReveal>

            {whoClientTypes.length > 0 && (
              <div className={styles.whoGrid}>
                {whoClientTypes.map((item, idx) => {
                  const label = str(item.label);
                  if (!label) return null;
                  const Icon = getHomeWhoIcon(item.icon);
                  return (
                    <ScrollReveal
                      key={`${label}-${idx}`}
                      delay={idx * 85}
                      className={styles.gridRevealItem}
                      variant="fadeUp">
                      <article className={styles.whoTile}>
                        <Icon className={styles.whoIcon} size={28} strokeWidth={1.5} aria-hidden />
                        <p className={styles.whoLabel}>{label}</p>
                      </article>
                    </ScrollReveal>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {str(h.whyHeadline) && (
        <section className={styles.whyBand} aria-labelledby="why-heading">
          <div className="container">
            <div className={styles.whyGrid}>
              <ScrollReveal>
                <div>
                  <h2 id="why-heading" className={styles.whyTitle}>
                    {str(h.whyHeadline)}
                  </h2>
                  <span className={styles.whyRule} aria-hidden />
                  {str(h.whySupportingCopy) ? (
                    <p className={styles.whyBody}>{str(h.whySupportingCopy)}</p>
                  ) : null}
                </div>
              </ScrollReveal>

              {(whyBullets.length > 0 || str(h.whyClosingStatement)) && (
                <ScrollReveal delay={80} variant="scaleIn">
                  <div className={styles.valueCard}>
                    {whyBullets.length > 0 && (
                      <ul className={styles.valueList}>
                        {whyBullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                    {str(h.whyClosingStatement) ? (
                      <>
                        <div className={styles.valueRule} aria-hidden />
                        <p className={styles.whyClosing}>{str(h.whyClosingStatement)}</p>
                      </>
                    ) : null}
                    {str(h.whyCtaText) ? (
                      <Link href={str(h.whyCtaHref) || "/contact"}>
                        <Button type="button" variant="advisor" size="lg">
                          <span>{str(h.whyCtaText)}</span>
                          <ArrowRight size={18} aria-hidden strokeWidth={2} />
                        </Button>
                      </Link>
                    ) : null}
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}

      {str(h.expertiseHeadline) && (
        <section className={styles.expertiseBand} aria-labelledby="expertise-heading">
          <div className="container">
            <ScrollReveal>
              <div className={styles.centerBlock}>
                <h2 id="expertise-heading" className={styles.sectionTitle}>
                  {str(h.expertiseHeadline)}
                </h2>
                <span className={styles.decorRule} aria-hidden />
                {str(h.expertiseLead) || str(h.expertiseSubheadline) ? (
                  <p className={styles.expertiseLead}>
                    {str(h.expertiseLead) || str(h.expertiseSubheadline)}
                  </p>
                ) : null}
              </div>
            </ScrollReveal>

            {expertiseItems.length > 0 && (
              <ScrollReveal delay={80}>
                <div className={styles.expertiseLayout}>
                  <div className={styles.expertiseColumns}>
                    {[0, 1].map((col) => (
                      <ul key={col} className={styles.expertiseColumn}>
                        {expertisePairedItems
                          .filter((_, idx) => idx % 2 === col)
                          .map((item) => (
                            <li key={item}>
                              <article className={styles.expertiseCard}>
                                <span className={styles.expertiseBullet} aria-hidden />
                                <p className={styles.expertiseCardText}>{item}</p>
                              </article>
                            </li>
                          ))}
                      </ul>
                    ))}
                  </div>
                  {expertiseTrailingItem ? (
                    <div className={styles.expertiseFeatured}>
                      <article className={styles.expertiseCard}>
                        <span className={styles.expertiseBullet} aria-hidden />
                        <p className={styles.expertiseCardText}>{expertiseTrailingItem}</p>
                      </article>
                    </div>
                  ) : null}
                </div>
              </ScrollReveal>
            )}

          </div>
        </section>
      )}

      {(str(h.finaleHeadline) || str(h.finaleSupportingCopy) || str(h.finaleCtaText)) && (
        <section className={styles.finaleBand} aria-labelledby="finale-heading">
          <div className="container">
            <ScrollReveal variant="fadeIn">
              <div className={`${styles.statementCard} ${styles.finaleCard}`}>
                {str(h.finaleHeadline) ? (
                  <h2 id="finale-heading" className={styles.finaleTitle}>
                    {str(h.finaleHeadline)}
                  </h2>
                ) : null}
                {str(h.finaleSupportingCopy) ? (
                  <p className={styles.finaleCopy}>{str(h.finaleSupportingCopy)}</p>
                ) : null}
                {str(h.finaleCtaText) ? (
                  <div className={styles.statementCardCta}>
                    <Link href={str(h.finaleCtaHref) || "/contact"}>
                      <Button type="button" variant="advisor" size="lg">
                        <span>{str(h.finaleCtaText)}</span>
                        <ArrowRight size={18} aria-hidden strokeWidth={2} />
                      </Button>
                    </Link>
                  </div>
                ) : null}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}
    </main>
  );
}
