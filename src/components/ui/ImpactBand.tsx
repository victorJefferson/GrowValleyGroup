"use client";

import type { CSSProperties } from "react";
import styles from "./ImpactBand.module.scss";
import { CountUp } from "./CountUp";

interface StatRow {
    prefix?: string;
    number: number;
    suffix?: string;
    label: string;
    midLabel?: string;
    descriptor?: string;
}

interface ImpactBandProps {
    eyebrow?: string;
    /** Optional headline (hidden on gv-style band when eyebrow-led) */
    headline?: string;
    description?: string;
    stats: StatRow[];
}

export function ImpactBand({ eyebrow, headline, description, stats }: ImpactBandProps) {
    if (!stats?.length) return null;

    const colCount = Math.min(Math.max(stats.length, 1), 6);

    return (
        <section className={styles.impactBand} aria-labelledby={eyebrow ? "impact-band-eyebrow" : undefined}>
            <div className={`container ${styles.inner}`}>
                {eyebrow ? (
                    <p id="impact-band-eyebrow" className={styles.eyebrow}>
                        {eyebrow}
                    </p>
                ) : null}
                {headline || description ? (
                    <header className={styles.copyBlock}>
                        {headline ? <h2 className={styles.headline}>{headline}</h2> : null}
                        {description ? <p className={styles.description}>{description}</p> : null}
                    </header>
                ) : null}
                <div className={styles.rule} aria-hidden />
                <div
                    className={styles.grid}
                    style={
                        {
                            "--impact-cols": colCount,
                        } as CSSProperties
                    }
                >
                    {stats.map((stat, idx) => {
                        const midTrim = stat.midLabel?.trim();
                        const descTrim = stat.descriptor?.trim();
                        const useSplitCaption = !!(midTrim && descTrim);
                        const singleCaption = useSplitCaption
                            ? ""
                            : descTrim ||
                              midTrim ||
                              (typeof stat.label === "string" ? stat.label.trim() : "");

                        return (
                            <div key={`${stat.label}-${idx}`} className={styles.col}>
                                <div className={styles.value}>
                                    <CountUp prefix={stat.prefix} end={stat.number} suffix={stat.suffix} />
                                </div>
                                {useSplitCaption ? (
                                    <>
                                        <div className={styles.mid}>{midTrim}</div>
                                        <p className={styles.fine}>{descTrim}</p>
                                    </>
                                ) : (
                                    <p className={styles.captionSingle}>{singleCaption}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className={styles.rule} aria-hidden />
            </div>
        </section>
    );
}
