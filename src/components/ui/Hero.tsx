import React from "react";
import styles from "./Hero.module.scss";
import { Button } from "./Button";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { ArrowRight } from "lucide-react";

export type StackedHeroLine = { text: string; muted?: boolean };

interface HeroProps {
    eyebrow?: React.ReactNode;
    headline: React.ReactNode;
    subheadline?: React.ReactNode;
    ctaText?: string;
    ctaHref?: string;
    hasCTA?: boolean;
    /** Homepage optional stacked oversized lines on top of the photo hero */
    stackedLines?: StackedHeroLine[];
    /** Bottom trust rail (full-height heroes only; omitted when `isShort`) */
    trustBarText?: string;
    /** @deprecated Ignored — hero always uses the photo + overlay treatment */
    immersionMode?: boolean;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
    image?: unknown;
    isShort?: boolean;
}

export function Hero({
    eyebrow,
    headline,
    subheadline,
    ctaText,
    ctaHref,
    hasCTA = true,
    stackedLines,
    trustBarText,
    secondaryCtaText,
    secondaryCtaHref,
    image,
    isShort = false,
}: HeroProps) {
    const heroImageSrc =
        typeof image === "string"
            ? image
            : image && typeof image === "object" && image !== null && "asset" in image && (image as { asset?: unknown }).asset
              ? urlFor(image as never).url()
              : "/images/home_hero.png";

    const useStackedCopy = Boolean(stackedLines?.length);
    const showTrustRail = !isShort && Boolean(trustBarText?.trim());

    return (
        <section
            className={`${styles.heroSection} ${isShort ? styles.isShort : ""} ${showTrustRail ? styles.hasTrustRail : ""}`}>
            <img src={heroImageSrc} alt="" aria-hidden className={styles.heroBg} />
            <div className={styles.heroOverlay} aria-hidden />

            <div className={styles.heroInner}>
                <div className={styles.heroContent}>
                    {!useStackedCopy && eyebrow ? (
                        <span className={styles.eyebrow}>{eyebrow}</span>
                    ) : null}

                    {useStackedCopy ? (
                        <h1 className={styles.stackedHeadingOnImage}>
                            {stackedLines!.map((line, i) =>
                                line.text ? (
                                    <span
                                        key={`${line.text}-${i}`}
                                        className={line.muted ? styles.stackedOnImageMuted : styles.stackedOnImageStrong}>
                                        {line.text}
                                    </span>
                                ) : null,
                            )}
                        </h1>
                    ) : (
                        <h1 className={styles.headline}>{headline}</h1>
                    )}

                    {subheadline ? <p className={styles.subheadline}>{subheadline}</p> : null}

                    {hasCTA && ctaText && ctaHref ? (
                        <div className={styles.ctaGroup}>
                            <Link href={ctaHref}>
                                <Button variant="advisor" size="lg">
                                    {ctaText}
                                    <ArrowRight size={18} aria-hidden strokeWidth={2} />
                                </Button>
                            </Link>
                            {secondaryCtaText && secondaryCtaHref ? (
                                <Link href={secondaryCtaHref}>
                                    <Button variant="outline" size="lg">
                                        {secondaryCtaText}
                                    </Button>
                                </Link>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </div>

            {showTrustRail ? (
                <div className={styles.trustedBar} role="note">
                    <span className={styles.trustedLine} aria-hidden />
                    <span className={styles.trustedLabel}>{trustBarText}</span>
                </div>
            ) : null}
        </section>
    );
}
