import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { client, urlFor } from "@/lib/sanity";
import { expertisePageQuery, heroQuery, siteSettingsQuery } from "@/lib/queries";
import styles from "./Expertise.module.scss";

function splitParagraphs(text?: string): string[] {
    if (!text?.trim()) return [];
    return text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);
}

export const metadata: Metadata = {
    title: { absolute: "Our Top Expertise | GrowValley Group" },
    description:
        "Advisory. Execution. Accountability. GrowValley Group partners with organisations at critical moments of inflection.",
    openGraph: {
        title: "Our Top Expertise | GrowValley Group",
        description:
            "Where growth is being pursued, capital decisions carry weight, and execution discipline becomes essential.",
        url: "https://gv.consulting/expertise",
    },
};

export default async function ExpertisePage() {
    let pageData: any = null;
    let heroData: any = null;
    let settings: any = null;

    try {
        [pageData, heroData, settings] = await Promise.all([
            client.fetch(expertisePageQuery).catch(() => null),
            client.fetch(heroQuery, { pageSlug: "expertise" }).catch(() => null),
            client.fetch(siteSettingsQuery).catch(() => null),
        ]);
    } catch (err) {
        console.error("Expertise data fetch error:", err);
    }

    const heroImage = pageData?.heroImage
        ? urlFor(pageData.heroImage).url()
        : heroData?.image
            ? urlFor(heroData.image).url()
            : "/images/home_hero.png";

    const trustedByLine =
        settings?.trustedByLine ??
        "Trusted by leading governments, corporates, and innovators across the region.";

    const impactStats =
        pageData?.impactStats?.length > 0
            ? pageData.impactStats
            : [
                  { prefix: "$", number: "3B", suffix: "+", label: "Revenues" },
                  { prefix: "$", number: "1B", suffix: "+", label: "Capital" },
                  {
                      prefix: "",
                      number: "500",
                      suffix: "+",
                      label: "Mandates Generated through Growth Advisory",
                  },
                  { prefix: "", number: "", suffix: "", label: "Structured through Capital Advisory" },
                  { prefix: "", number: "", suffix: "", label: "Delivered through Innovation Advisory" },
              ];

    const areas = pageData?.expertiseAreas ?? [];
    const principles = pageData?.engagementPrinciples ?? [];

    return (
        <main>
            <Hero
                eyebrow={pageData?.heroEyebrow ?? heroData?.eyebrow ?? "OUR TOP EXPERTISE"}
                headline={pageData?.heroHeadline ?? heroData?.headline ?? "Our Top Expertise"}
                subheadline={
                    <>
                        {pageData?.heroAccent && (
                            <strong style={{ display: "block", marginBottom: "0.75rem" }}>
                                {pageData.heroAccent}
                            </strong>
                        )}
                        {pageData?.heroSubheadline ?? heroData?.subheadline ??
                            "GrowValley Group partners with organisations at critical moments of inflection — when growth is being pursued, capital decisions carry weight, and execution discipline becomes essential."}
                    </>
                }
                image={heroImage}
                hasCTA
                ctaText={pageData?.heroCtaLabel ?? "Talk to Our Advisor"}
                ctaHref={pageData?.heroCtaLink ?? "/contact"}
                trustBarText={trustedByLine}
            />

            {impactStats.length > 0 && (
                <section className={`${styles.section} ${styles.statsSectionWrap}`} aria-label="Impact statistics">
                    <div className="container">
                        {pageData?.impactStatsHeadline?.trim() && (
                            <h2 className={styles.statsSectionHeadline}>{pageData.impactStatsHeadline.trim()}</h2>
                        )}
                        <div className={styles.impactStats}>
                            {impactStats.map((s: any, i: number) => {
                                const hasNum =
                                    (s.prefix && String(s.prefix).trim()) ||
                                    (s.number && String(s.number).trim()) ||
                                    (s.suffix && String(s.suffix).trim());
                                return (
                                    <div
                                        key={s._key ?? i}
                                        className={`${styles.impactStat} ${!hasNum ? styles.impactStatLabelOnly : ""}`}
                                    >
                                        {hasNum ? (
                                            <span className={styles.num}>
                                                {s.prefix ?? ""}
                                                {s.number ?? ""}
                                                {s.suffix ?? ""}
                                            </span>
                                        ) : null}
                                        <span className={styles.lbl}>{s.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Expertise Areas */}
            {areas.length > 0 && (
                <section className={`${styles.section} ${styles.bgLight}`}>
                    <div className="container">
                        {pageData?.expertiseAreasEyebrow?.trim() && (
                            <div className={styles.sectionHeader}>
                                <span className={styles.eyebrow}>{pageData.expertiseAreasEyebrow.trim()}</span>
                            </div>
                        )}

                        <div className={styles.areasGrid}>
                            {areas.map((area: any, i: number) => (
                                <article key={i} className={styles.areaCard}>
                                    <h3>{area.title}</h3>
                                    {area.body && <p>{area.body}</p>}
                                    {area.outcomes && area.outcomes.length > 0 && (
                                        <>
                                            <span className={styles.areaOutcomesLabel}>Typical outcomes</span>
                                            <ul>
                                                {area.outcomes.map((o: string, j: number) => (
                                                    <li key={j}>{o}</li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                    {area.ctaLabel && (
                                        <div className={styles.areaCta}>
                                            <Link href={area.ctaLink ?? "/contact"}>
                                                <Button variant="outline" size="sm">{area.ctaLabel}</Button>
                                            </Link>
                                        </div>
                                    )}
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {(pageData?.howWeEngageHeadline ||
                pageData?.howWeEngageBody?.trim() ||
                principles.length > 0 ||
                pageData?.howWeEngageClosing?.trim() ||
                pageData?.howWeEngageCtaLabel) && (
                <section className={`${styles.section} ${styles.howWeEngageSection}`}>
                    <div className="container">
                        <div className={styles.howWeEngageHeader}>
                            <h2>{pageData?.howWeEngageHeadline?.trim() || "How We Engage"}</h2>
                            {pageData?.howWeEngageBody?.trim() &&
                                splitParagraphs(pageData.howWeEngageBody).map((para, idx) => (
                                    <p key={idx}>{para}</p>
                                ))}
                        </div>

                        {principles.length > 0 && (
                            <ol className={styles.principlesGrid}>
                                {principles.map((p: any, i: number) => (
                                    <li key={p._key ?? i} className={styles.principle}>
                                        <span className={styles.principleNum}>{String(i + 1).padStart(2, "0")}</span>
                                        <h4>{p.title}</h4>
                                        {p.description && <p>{p.description}</p>}
                                    </li>
                                ))}
                            </ol>
                        )}

                        {(pageData?.howWeEngageClosing?.trim() || pageData?.howWeEngageCtaLabel) && (
                            <div className={styles.howWeEngageCtaWrap}>
                                <CtaBanner
                                    headline="Start a strategic conversation with GrowValley Group."
                                    description={splitParagraphs(pageData?.howWeEngageClosing ?? "")
                                        .filter(
                                            (p) =>
                                                p !==
                                                "Start a strategic conversation with GrowValley Group."
                                        )
                                        .join(" ")}
                                    ctaLabel={pageData?.howWeEngageCtaLabel ?? "Talk to Our Advisor"}
                                    ctaHref={pageData?.howWeEngageCtaLink ?? "/contact"}
                                />
                            </div>
                        )}
                    </div>
                </section>
            )}

        </main>
    );
}
