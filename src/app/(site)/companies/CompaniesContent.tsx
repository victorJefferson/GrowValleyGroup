"use client";

import { Hero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { Solutions } from "@/components/sections/Solutions/Solutions";
import { WhoWeWorkWith } from "@/components/sections/WhoWeWorkWith/WhoWeWorkWith";
import styles from "../our-capabilities/Capabilities.module.scss";
import companiesStyles from "./Companies.module.scss";

interface CompaniesContentProps {
    heroData?: any;
    companiesPageSettings?: any;
    solutionsData?: any;
    whoWeWorkWithData?: any;
}

export default function CompaniesContent({
    heroData,
    companiesPageSettings,
    solutionsData,
    whoWeWorkWithData,
}: CompaniesContentProps) {
    const heroImage = heroData?.image ? urlFor(heroData.image).url() : undefined;

    const introHeading = companiesPageSettings?.introHeading ?? "";
    const introParagraph = companiesPageSettings?.introParagraph ?? "";
    const darkBlockStatement = companiesPageSettings?.darkBlockStatement ?? "";
    const darkBlockBody = companiesPageSettings?.darkBlockBody ?? "";
    const statsStrip: string[] = companiesPageSettings?.statsStrip ?? [];
    const bottomCtaHeadline = companiesPageSettings?.bottomCtaHeadline ?? "";
    const bottomCtaButtonText = companiesPageSettings?.bottomCtaButtonText ?? "";
    const bottomCtaButtonLink = companiesPageSettings?.bottomCtaButtonLink ?? "/contact";

    const showIntro = !!(introHeading || introParagraph);
    const showDarkBlock = !!(darkBlockStatement || darkBlockBody);
    const showStatsStrip = statsStrip.length > 0;
    const showBottomCta = !!(bottomCtaHeadline || bottomCtaButtonText);

    return (
        <main>
            {/* HERO */}
            <Hero
                eyebrow={heroData?.eyebrow ?? ""}
                headline={heroData?.headline ?? ""}
                subheadline={heroData?.subheadline ?? ""}
                ctaText={heroData?.ctaText ?? ""}
                ctaHref={heroData?.ctaHref ?? ""}
                hasCTA={heroData?.hasCTA ?? false}
                image={heroImage}
            />

            {/* POSITIONING STATEMENT */}
            {showIntro && (
                <section className={styles.introSection}>
                    <div className="container">
                        <div className={styles.introContent}>
                            {introHeading && (
                                <h2 className={styles.introHeading}>{introHeading}</h2>
                            )}
                            {introParagraph && (
                                <p
                                    className={styles.introParagraph}
                                    dangerouslySetInnerHTML={{
                                        __html: introParagraph.replace(/\n/g, "<br />"),
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* DARK POSITIONING BLOCK */}
            {showDarkBlock && (
                <section className={companiesStyles.darkBlock}>
                    <div className="container">
                        <div className={companiesStyles.darkBlockInner}>
                            {darkBlockStatement && (
                                <p className={companiesStyles.darkBlockStatement}>{darkBlockStatement}</p>
                            )}
                            {darkBlockBody && (
                                <p
                                    className={companiesStyles.darkBlockBody}
                                    dangerouslySetInnerHTML={{
                                        __html: darkBlockBody.replace(/\n/g, "<br />"),
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* COMPANIES GRID */}
            <Solutions cmsData={solutionsData} />

            {/* STATS STRIP */}
            {showStatsStrip && (
                <section className={companiesStyles.statsStripSection}>
                    <div className="container">
                        <ul className={companiesStyles.statsStrip}>
                            {statsStrip.map((stat: string, i: number) => (
                                <li key={i} className={companiesStyles.statsStripItem}>
                                    <span className={companiesStyles.statsStripText}>{stat}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {/* WHO WE WORK WITH */}
            <WhoWeWorkWith cmsData={whoWeWorkWithData} />

            {/* BOTTOM CTA */}
            {showBottomCta && (
                <section className={styles.ctaBanner}>
                    <div className="container">
                        <div className={styles.ctaBannerPanel}>
                            {bottomCtaHeadline && (
                                <h2 className={styles.speakToAnExpertBannerHeading}>
                                    {bottomCtaHeadline}
                                </h2>
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
