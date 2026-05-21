import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import { client, urlFor } from "@/lib/sanity";
import { partnerPageQuery, heroQuery, siteSettingsQuery } from "@/lib/queries";
import styles from "./PartnerWithUs.module.scss";

export const metadata: Metadata = {
    title: { absolute: "Partner With Us | GrowValley Group" },
    description:
        "Expertise. Reach. Execution. GrowValley Group partners with experts, operators, platforms, and ecosystem builders.",
    openGraph: {
        title: "Partner With Us | GrowValley Group",
        description:
            "Long-term, structured partnerships built around execution-led growth.",
        url: "https://gv.consulting/partner-with-us",
    },
};

const fallbackPartnerTypes = [
    {
        key: "expert",
        title: "Expert Partners",
        tagline: "Bringing specialist depth to complex mandates.",
        body:
            "GVC engages senior experts who want to apply their experience to execution-led engagements where results are the only measure of success.",
        whoForHeadline: "Who this is for",
        whoFor: [
            "Former CXOs and senior operators",
            "Industry specialists in strategy, finance, operations, or transformation",
            "Practitioners with deep domain expertise in specific sectors or functions",
        ],
        howEngageHeadline: "How we engage",
        howEngage: [
            "Project-based or retainer advisory",
            "Board and leadership advisory roles",
            "Venture studio mentorship and oversight",
            "Institutional transformation mandates",
        ],
        whatGainHeadline: "What you gain",
        whatGain: [
            "Senior-level engagements with real scope and accountability",
            "Long-term advisory relationships, not one-off projects",
            "Platform leverage and institutional access beyond solo consulting",
        ],
        ctaLabel: "Join Our Expert Network",
        ctaLink: "/contact",
    },
    {
        key: "technology",
        title: "Technology Partners",
        tagline: "Powering execution through platforms, tools, and systems.",
        body:
            "GVC integrates technology into how we design, manage, and scale client operations. We partner with platforms whose tools are built for enterprise-grade execution.",
        whoForHeadline: "Who this is for",
        whoFor: [
            "Technology platforms and SaaS providers",
            "AI, data, and automation companies",
            "Systems and infrastructure providers for transformation, PMO, or venture operations",
        ],
        howEngageHeadline: "How we engage",
        howEngage: [
            "Integration of your platform into GVC client engagements",
            "Co-creation of execution tools aligned to GVC service delivery",
            "Venture studio and PMO enablement",
            "Technology-led transformation programs",
        ],
        whatGainHeadline: "What you gain",
        whatGain: [
            "Enterprise and institutional access through GVC client relationships",
            "Long-term platform adoption with credible reference cases",
            "Strategic integration into complex, multi-stakeholder programs",
        ],
        ctaLabel: "Partner as a Technology Provider",
        ctaLink: "/contact",
    },
    {
        key: "business",
        title: "Business Partners",
        tagline: "Extending GVC's reach across markets and geographies.",
        body:
            "We partner with operators and market specialists who can extend our delivery capability into new geographies, sectors, and client segments.",
        whoForHeadline: "Who this is for",
        whoFor: [
            "Regional operators with established market relationships",
            "Growth and market-entry specialists",
            "Firms with complementary service lines seeking structured co-delivery",
        ],
        howEngageHeadline: "How we engage",
        howEngage: [
            "Market expansion and joint delivery initiatives",
            "Local execution partnerships on GVC mandates",
            "Distribution of GVC programs and frameworks where applicable",
        ],
        whatGainHeadline: "What you gain",
        whatGain: [
            "Access to GVC service IP and delivery methodology",
            "Structured go-to-market models with clear governance",
            "Regional growth opportunities through a credible institutional platform",
        ],
        ctaLabel: "Explore Business Partnership",
        ctaLink: "/contact",
    },
    {
        key: "media",
        title: "Media Partners",
        tagline: "Amplifying execution-led thinking across the ecosystem.",
        body:
            "We partner with media platforms, event organizers, and ecosystem builders who want access to credible, practitioner-level content on growth, transformation, and venture building.",
        whoForHeadline: "Who this is for",
        whoFor: [
            "Business media platforms and publications",
            "Event organizers and forum producers",
            "Industry community and ecosystem builders",
        ],
        howEngageHeadline: "How we engage",
        howEngage: [
            "Thought leadership and practitioner content",
            "Events, roundtables, and executive forums",
            "Co-branded initiatives aligned to GVC positioning and audience",
        ],
        whatGainHeadline: "What you gain",
        whatGain: [
            "Access to credible, execution-focused narratives",
            "Institutional credibility through association with GVC client base and mandate work",
            "Long-term ecosystem collaboration, not transactional content deals",
        ],
        ctaLabel: "Collaborate as a Media Partner",
        ctaLink: "/contact",
    },
];

function splitParagraphs(text?: string): string[] {
    if (!text?.trim()) return [];
    return text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);
}

export default async function PartnerWithUsLandingPage() {
    let pageData: any = null;
    let heroData: any = null;
    let settings: any = null;

    try {
        [pageData, heroData, settings] = await Promise.all([
            client.fetch(partnerPageQuery, { pageKey: "landing" }).catch(() => null),
            client.fetch(heroQuery, { pageSlug: "partner-with-us" }).catch(() => null),
            client.fetch(siteSettingsQuery).catch(() => null),
        ]);
    } catch (err) {
        console.error("Partner With Us data fetch error:", err);
    }

    const heroImage = pageData?.heroImage
        ? urlFor(pageData.heroImage).url()
        : heroData?.image
            ? urlFor(heroData.image).url()
            : "/images/home_hero.png";
    const whySectionImage = pageData?.whySectionImage
        ? urlFor(pageData.whySectionImage).url()
        : "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1400";

    const trustedByLine =
        settings?.trustedByLine ??
        "Trusted by leading governments, corporates, and innovators across the region.";

    const partnerTypes = pageData?.partnerTypes && pageData.partnerTypes.length > 0
        ? pageData.partnerTypes
        : fallbackPartnerTypes;

    return (
        <main>
            <Hero
                eyebrow={pageData?.heroEyebrow ?? heroData?.eyebrow ?? "PARTNER WITH US"}
                headline={pageData?.heroHeadline ?? heroData?.headline ?? "Partner With Us"}
                subheadline={
                    <>
                        {pageData?.heroAccent && (
                            <strong style={{ display: "block", marginBottom: "0.75rem" }}>
                                {pageData.heroAccent}
                            </strong>
                        )}
                        {pageData?.heroSubheadline ?? heroData?.subheadline ??
                            "GrowValley Group partners with experts, operators, platforms, and ecosystem builders who share a commitment to execution-led growth and long-term value creation."}
                    </>
                }
                image={heroImage}
                hasCTA
                ctaText={pageData?.heroCtaLabel ?? "Talk to Our Advisor"}
                ctaHref={pageData?.heroCtaLink ?? "/contact"}
                trustBarText={trustedByLine}
            />

            <section className={styles.section}>
                <div className="container">
                    <div className={styles.whySplit}>
                        <figure className={styles.whyVisual}>
                            <img
                                src={whySectionImage}
                                alt={pageData?.whyHeadline ?? "Why partner with GrowValley Group"}
                                loading="lazy"
                                decoding="async"
                            />
                        </figure>
                        <div className={styles.whyContent}>
                            <h2>{pageData?.whyHeadline ?? "Why Partner With GrowValley Group"}</h2>
                            {pageData?.whyBody ? (
                                splitParagraphs(pageData.whyBody).map((p, i) => <p key={i}>{p}</p>)
                            ) : (
                                <>
                                    <p>
                                        GVC operates at the intersection of strategy and execution across complex,
                                        high-stakes mandates. Our partners extend that capability, bringing specialist
                                        depth, market reach, and platform infrastructure that strengthens what we deliver.
                                    </p>
                                    <p>
                                        Partnerships at GVC are structured, governed, and built for the long term. We do
                                        not work with vendors. We work with collaborators.
                                    </p>
                                </>
                            )}

                            {pageData?.whyAccessPoints && pageData.whyAccessPoints.length > 0 && (
                                <div className={styles.whyAccessBlock}>
                                    <h3>{pageData?.whyAccessHeadline ?? "What partners gain access to"}</h3>
                                    <ol className={styles.whyAccessList}>
                                        {pageData.whyAccessPoints.map((point: string, i: number) => (
                                            <li key={i}>
                                                <span className={styles.whyAccessNum}>
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                <span className={styles.whyAccessText}>{point}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className={`${styles.section} ${styles.bgLight}`}>
                <div className="container">
                    <div className={styles.intro} style={{ marginBottom: "3rem" }}>
                        <span className={styles.eyebrow}>Partner Types</span>
                        <h2>Four ways to partner with GVC</h2>
                    </div>

                    <div className={styles.partnerTypesStack}>
                        {partnerTypes.map((p: any, i: number) => (
                            <article key={p.key ?? i} className={styles.partnerTypeSection}>
                                <span className={styles.partnerNumber}>0{i + 1}</span>
                                <h3>{p.title}</h3>
                                {p.tagline && <p className={styles.partnerTagline}>{p.tagline}</p>}
                                {p.body && <p>{p.body}</p>}
                                <div className={styles.partnerSubBlocks}>
                                    {p.whoFor?.length > 0 && (
                                        <div className={styles.partnerSubBlock}>
                                            <h4>{p.whoForHeadline ?? "Who this is for"}</h4>
                                            <ul>
                                                {p.whoFor.map((item: string, idx: number) => (
                                                    <li key={idx}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {p.howEngage?.length > 0 && (
                                        <div className={styles.partnerSubBlock}>
                                            <h4>{p.howEngageHeadline ?? "How we engage"}</h4>
                                            <ul>
                                                {p.howEngage.map((item: string, idx: number) => (
                                                    <li key={idx}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {p.whatGain?.length > 0 && (
                                        <div className={styles.partnerSubBlock}>
                                            <h4>{p.whatGainHeadline ?? "What you gain"}</h4>
                                            <ul>
                                                {p.whatGain.map((item: string, idx: number) => (
                                                    <li key={idx}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.partnerTypeCta}>
                                    <Link href={p.ctaLink ?? "/contact"}>
                                        <Button variant="outline" size="lg">
                                            {p.ctaLabel ?? "Learn more"}
                                        </Button>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className="container">
                    <div className={styles.closing}>
                        <h2>{pageData?.closingHeadline ?? "Let's Build Together."}</h2>
                        <p>
                            {pageData?.closingBody ??
                                "GrowValley Group is not looking for vendors or sponsors. We are looking for collaborators who bring real capability, operate with discipline, and are committed to outcomes over appearances. If that describes how you work, we should talk."}
                        </p>
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
