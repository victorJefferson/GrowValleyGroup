"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./Solutions.module.scss";
import { Button } from "@/components/ui/Button";
import { SOLUTIONS_HUB_FALLBACK } from "@/config/homepageContent.defaults";

const defaultItems = [
    {
        id: "growth-advisory",
        title: "Growth Advisory",
        tagline: "Strengthening to maximize revenues.",
        body: "We help established businesses to increase revenues with strategy and systems to improve products, process, and performance, and governance – creating a strong foundation for scale.",
        howNeedsMet:
            "Strategy, structuring, optimisation, scaling systems – engineered to scale with revenues.",
        ctaPrompt: "Discuss Your Growth Priorities Today.",
        href: "/our-capabilities/growth-advisory",
    },
    {
        id: "capital-advisory",
        title: "Capital Advisory",
        tagline: "Strengthening to raise capital.",
        body: "We prepare businesses to attract, structure, and deploy capital intelligently by building investment readiness, valuation defensibility, and transaction preparedness.",
        howNeedsMet:
            "Strategy, investment readiness, legal library, compliance – engineered to scale with capital.",
        ctaPrompt: "Discuss Your Capital Priorities Today.",
        href: "/our-capabilities/capital-advisory",
    },
    {
        id: "innovation-advisory",
        title: "Innovation Advisory",
        tagline: "Strengthening to become an industry leader.",
        body: "We design and build innovation engines to build the next-gen products and ventures through structured venture-building models to become industry leaders.",
        howNeedsMet:
            "Strategy, research, product development, startup building – engineered to scale with industry domination.",
        ctaPrompt: "Discuss Your Innovation Priorities Today.",
        href: "/our-capabilities/innovation-advisory",
    },
    {
        id: "pmo",
        title: "PMO",
        tagline: "Strengthening to deliver complex programs.",
        body: "We design and operate enterprise-grade Project Management Offices so leadership retains full visibility into delivery performance, accountability, and portfolio risk.",
        howNeedsMet:
            "Operating cadence, PMO tooling, accountability systems – engineered to scale with certainty of delivery.",
        ctaPrompt: "Discuss Your PMO Priorities Today.",
        href: "/our-capabilities/pmo",
    },
    {
        id: "family-office-advisory",
        title: "Family Office Advisory",
        tagline: "Structuring governance for enduring wealth.",
        body: "We help families build the governance frameworks, investment operating models, and structural foundations that allow wealth to be managed, preserved, and grown across generations.",
        howNeedsMet:
            "Structure, mandates, succession alignment – engineered for multi-generational governance.",
        ctaPrompt: "Discuss Family Office Advisory Today.",
        href: "/our-capabilities/family-office-advisory",
    },
];

export type SolutionsCmsItem = {
    id?: string;
    title?: string;
    subtitle?: string;
    tagline?: string;
    body?: string;
    howNeedsMet?: string;
    ctaPrompt?: string;
    href?: string;
};

/** CMS may still contain this deprecated one-liner; never surface it in the UI. */
function normalizeCapabilitiesLeadIn(raw: string | undefined, fallback: string | undefined): string | undefined {
    const merged = (raw ?? fallback ?? "").trim();
    if (!merged) return undefined;
    if (/^(?:[\u2014\u2013\-]\s*)?our capabilities:?\s*$/i.test(merged)) return undefined;
    return merged;
}

function normalizeItem(raw: SolutionsCmsItem, index: number): (typeof defaultItems)[number] {
    const base = defaultItems[Math.min(index, defaultItems.length - 1)];
    const subtitle = (raw.subtitle || "").trim();
    const sentence = subtitle.match(/^[\s\S]{3,240}?[.!?](\s|$)/);
    const first = sentence ? sentence[0].trim() : "";
    const remainder =
        first && subtitle.startsWith(first) ? subtitle.slice(first.length).trim() : subtitle;

    return {
        id: raw.id || base.id,
        title: raw.title || base.title,
        tagline: (raw.tagline || first || base.tagline).trim(),
        body: (raw.body || remainder || subtitle || base.body).trim(),
        howNeedsMet: (raw.howNeedsMet || base.howNeedsMet).trim(),
        ctaPrompt: (raw.ctaPrompt || base.ctaPrompt).trim(),
        href: raw.href || base.href,
    };
}

interface SolutionsProps {
    cmsData?: {
        headline?: string;
        description?: string;
        capabilitiesLeadIn?: string;
        items?: SolutionsCmsItem[];
    };
    advisorHref?: string;
    advisorLabel?: string;
    /** Homepage: center intro + pillar blocks. */
    layout?: "default" | "centered";
}

export const Solutions = ({
    cmsData,
    advisorHref = "/contact",
    advisorLabel = "Talk to our Advisor",
    layout = "default",
}: SolutionsProps) => {
    const displayHeadline = cmsData?.headline ?? SOLUTIONS_HUB_FALLBACK.headline;
    const displayDescription = cmsData?.description ?? SOLUTIONS_HUB_FALLBACK.description;
    const leadIn = normalizeCapabilitiesLeadIn(
        cmsData?.capabilitiesLeadIn,
        SOLUTIONS_HUB_FALLBACK.capabilitiesLeadIn,
    );
    const rawItems = cmsData?.items?.length ? cmsData.items : defaultItems;

    const items = rawItems.map((item, idx) => normalizeItem(item, idx));

    return (
        <section
            className={`${styles.solutionsSection} ${layout === "centered" ? styles.solutionsSectionCentered : ""}`}>
            <div className={`container ${styles.intro}`}>
                <h2 className={styles.ecoTitle}>{displayHeadline}</h2>
                <p className={styles.ecoLead}>{displayDescription}</p>
                {leadIn ? <p className={styles.ecoDivider}>{leadIn}</p> : null}
            </div>

            <div className={`container ${styles.splitList}`}>
                {items.map((item) => (
                    <article
                        key={item.id}
                        className={styles.pillarRow}
                        aria-labelledby={`pillar-${item.id}`}>
                        <div className={styles.leftCol}>
                            <h3 id={`pillar-${item.id}`} className={styles.pillarTitle}>
                                {item.title}
                            </h3>
                            <p className={styles.tagline}>{item.tagline}</p>
                            <div className={styles.hDivider} aria-hidden />
                            <p className={styles.body}>{item.body}</p>
                            <p className={styles.supportingHow}>
                                <span className={styles.howLabel}>How:</span>&nbsp;{item.howNeedsMet}
                            </p>
                            <Link href={item.href} className={styles.detailLink} prefetch={false}>
                                Learn more about {item.title}{" "}
                                <ArrowRight size={14} aria-hidden strokeWidth={2} />
                            </Link>
                        </div>
                        <div className={styles.rightCol}>
                            <div className={styles.actionCard}>
                                <p className={styles.needsLabel}>— HOW NEEDS ARE MET</p>
                                <p className={styles.needsItalic}>{item.howNeedsMet}</p>
                                <div className={styles.needsRule} aria-hidden />
                                <p className={styles.ctaLead}>{item.ctaPrompt}</p>
                                <Link href={advisorHref} className={styles.advisorWrap} prefetch={false}>
                                    <Button type="button" variant="advisor" size="lg">
                                        <span>{advisorLabel}</span>
                                        <ArrowRight size={18} aria-hidden strokeWidth={2} />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};
