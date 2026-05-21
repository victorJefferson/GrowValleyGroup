import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import { client, urlFor } from "@/lib/sanity";
import { partnerPageQuery, heroQuery } from "@/lib/queries";
import styles from "../PartnerWithUs.module.scss";

const VALID_TYPES = ["expert", "technology", "business", "media"] as const;
type PartnerType = (typeof VALID_TYPES)[number];

const TYPE_LABEL: Record<PartnerType, string> = {
    expert: "Expert Partners",
    technology: "Technology Partners",
    business: "Business Partners",
    media: "Media Partners",
};

export async function generateStaticParams() {
    return VALID_TYPES.map((type) => ({ type }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ type: string }>;
}): Promise<Metadata> {
    const { type } = await params;
    const label = TYPE_LABEL[type as PartnerType] ?? "Partner With Us";
    return {
        title: `${label} | GrowValley Group`,
        description: `Explore ${label.toLowerCase()} opportunities with GrowValley Group.`,
    };
}

export default async function PartnerSubPage({
    params,
}: {
    params: Promise<{ type: string }>;
}) {
    const { type } = await params;

    if (!VALID_TYPES.includes(type as PartnerType)) {
        notFound();
    }

    let pageData: any = null;
    let heroData: any = null;

    try {
        [pageData, heroData] = await Promise.all([
            client.fetch(partnerPageQuery, { pageKey: type }).catch(() => null),
            client.fetch(heroQuery, { pageSlug: "partner-with-us" }).catch(() => null),
        ]);
    } catch (err) {
        console.error(`Partner sub-page (${type}) data fetch error:`, err);
    }

    const heroImage = pageData?.heroImage
        ? urlFor(pageData.heroImage).url()
        : heroData?.image
            ? urlFor(heroData.image).url()
            : "/images/home_hero.png";

    const label = TYPE_LABEL[type as PartnerType];

    return (
        <main>
            <Hero
                isShort
                eyebrow={pageData?.heroEyebrow ?? label.toUpperCase()}
                headline={pageData?.heroHeadline ?? label}
                subheadline={
                    <>
                        {pageData?.heroAccent && (
                            <strong style={{ display: "block", marginBottom: "0.75rem" }}>
                                {pageData.heroAccent}
                            </strong>
                        )}
                        {pageData?.heroSubheadline}
                    </>
                }
                image={heroImage}
                hasCTA
                ctaText={pageData?.heroCtaLabel ?? "Talk to Our Advisor"}
                ctaHref={pageData?.heroCtaLink ?? "/contact"}
            />

            <section className={styles.section}>
                <div className="container">
                    <div className={styles.subpageBody}>
                        {pageData?.tagline && (
                            <p style={{ fontSize: "1.35rem", color: "var(--color-primary-navy)", fontWeight: 500 }}>
                                {pageData.tagline}
                            </p>
                        )}
                        {pageData?.narrativeBody && <p>{pageData.narrativeBody}</p>}

                        {pageData?.whoFor && pageData.whoFor.length > 0 && (
                            <div className={styles.bulletBlock}>
                                <h3>{pageData.whoForHeadline ?? "Who this is for"}</h3>
                                <ul>
                                    {pageData.whoFor.map((item: string, i: number) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {pageData?.howEngage && pageData.howEngage.length > 0 && (
                            <div className={styles.bulletBlock}>
                                <h3>{pageData.howEngageHeadline ?? "How we engage"}</h3>
                                <ul>
                                    {pageData.howEngage.map((item: string, i: number) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {pageData?.whatGain && pageData.whatGain.length > 0 && (
                            <div className={styles.bulletBlock}>
                                <h3>{pageData.whatGainHeadline ?? "What you gain"}</h3>
                                <ul>
                                    {pageData.whatGain.map((item: string, i: number) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className="container">
                    <div className={styles.closing}>
                        <h2>{pageData?.closingHeadline ?? "Let's Build Together."}</h2>
                        {pageData?.closingBody && <p>{pageData.closingBody}</p>}
                        <Link href={pageData?.closingCtaLink ?? "/contact"}>
                            <Button variant="secondary" size="lg">
                                {pageData?.closingCtaLabel ?? "Talk to Our Advisor"}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
