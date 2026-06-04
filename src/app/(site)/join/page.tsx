import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import { client, urlFor } from "@/lib/sanity";
import { joinPageQuery, heroQuery, siteSettingsQuery } from "@/lib/queries";
import {
    JOIN_PAGE_IMAGES,
    getJoinAudienceImage,
    getJoinSplitLayout,
} from "@/lib/joinPageImages";
import styles from "./Join.module.scss";

export const metadata: Metadata = {
    title: { absolute: "Join | GrowValley Group" },
    description:
        "GrowValley Group works with operators, experts, investors, founders, and strategic partners building businesses, ventures, and long-term opportunities.",
    openGraph: {
        title: "Join | GrowValley Group",
        description:
            "An ecosystem of companies, operators, and partnerships designed around execution.",
        url: "https://gv.consulting/join",
    },
};

const FALLBACK_AUDIENCE = [
    {
        key: "experts",
        title: "Experts",
        tagline: "Operators with real experience.",
        body:
            "We work with experienced operators, advisors, consultants, specialists, and execution partners across strategy, finance, operations, investment, technology, venture building, and business growth.\n\nWhether supporting clients, ventures, or internal initiatives, we look for people who understand execution, not just theory.",
        ctaLabel: "Join as an Expert",
        ctaLink: "/contact",
    },
    {
        key: "partners",
        title: "Partners",
        tagline: "Strategic relationships built for growth.",
        body:
            "GrowValley partners with firms, institutions, service providers, venture platforms, and ecosystem operators looking to collaborate across markets, clients, and opportunities.\n\nThe objective is long-term alignment, not transactional introductions.",
        ctaLabel: "Become a Partner",
        ctaLink: "/contact",
    },
    {
        key: "investors",
        title: "Investors",
        tagline: "Capital with long-term alignment.",
        body:
            "We engage with investors, family offices, and strategic capital partners interested in venture opportunities, private markets, acquisitions, and long-term ecosystem growth.\n\nWe value disciplined capital, strategic thinking, and aligned relationships.",
        ctaLabel: "Connect as an Investor",
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

export default async function JoinPage() {
    let pageData: any = null;
    let heroData: any = null;
    let settings: any = null;

    try {
        [pageData, heroData, settings] = await Promise.all([
            client.fetch(joinPageQuery).catch(() => null),
            client.fetch(heroQuery, { pageSlug: "join" }).catch(() => null),
            client.fetch(siteSettingsQuery).catch(() => null),
        ]);
    } catch (err) {
        console.error("Join page data fetch error:", err);
    }

    const heroImage = pageData?.heroImage
        ? urlFor(pageData.heroImage).url()
        : heroData?.image
            ? urlFor(heroData.image).url()
            : "/images/home_hero.png";

    const trustedByLine =
        settings?.trustedByLine ??
        "Trusted by leading governments, corporates, and innovators across the region.";

    const heroParagraph1 =
        pageData?.heroParagraph1 ??
        heroData?.headline ??
        "GrowValley Group works with operators, experts, investors, founders, and strategic partners building businesses, ventures, and long-term opportunities across multiple sectors and markets.";
    const heroParagraph2 =
        pageData?.heroParagraph2 ??
        heroData?.subheadline ??
        "We are an ecosystem of companies, operators, and partnerships designed around execution.";

    const audienceSections =
        pageData?.audienceSections?.length > 0
            ? pageData.audienceSections
            : FALLBACK_AUDIENCE;

    const whyBullets =
        pageData?.whyBullets?.length > 0
            ? pageData.whyBullets
            : [
                  "Investments",
                  "Venture creation",
                  "Strategic advisory",
                  "Market expansion",
                  "Operational execution",
                  "Private market opportunities",
                  "Ecosystem partnerships",
              ];

    return (
        <main>
            <Hero
                headline={heroParagraph1}
                subheadline={heroParagraph2}
                image={heroImage}
                hasCTA
                ctaText={pageData?.heroCtaLabel ?? heroData?.ctaText ?? "Start the Conversation"}
                ctaHref={pageData?.heroCtaLink ?? heroData?.ctaHref ?? "/contact"}
                trustBarText={trustedByLine}
            />

            <section className={styles.section}>
                <div className="container">
                    <div className={styles.whoSplit}>
                        <figure className={styles.sectionFigure}>
                            <img
                                src={JOIN_PAGE_IMAGES.who}
                                alt=""
                                loading="lazy"
                                decoding="async"
                            />
                        </figure>
                        <div className={styles.whoCopy}>
                            <h2>{pageData?.whoHeadline ?? "Who We Work With"}</h2>
                            <p>
                                {pageData?.whoIntro ??
                                    "GrowValley collaborates with individuals and organisations that bring capability, perspective, capital, or strategic value into the ecosystem."}
                            </p>
                            <div className={styles.focusPanel}>
                                <p>
                                    {pageData?.whoFocusLabel ?? "The focus is simple:"}
                                    <strong>
                                        {pageData?.whoFocusLine ??
                                            "Work with serious people building serious things."}
                                    </strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`${styles.section} ${styles.bgLight}`}>
                <div className="container">
                    <div className={styles.audienceIntro}>
                        <span className={styles.eyebrow}>Collaborate</span>
                        <h2>Three ways to engage</h2>
                    </div>
                    <div className={styles.audienceStack}>
                        {audienceSections.map((section: any, i: number) => {
                            const layout = getJoinSplitLayout(i);
                            const imageSrc = getJoinAudienceImage(section.key, i);
                            const cardClass =
                                layout === "imageRight"
                                    ? `${styles.audienceCard} ${styles.audienceCardImageRight}`
                                    : styles.audienceCard;

                            return (
                                <article key={section.key ?? i} className={cardClass}>
                                    <div className={styles.audienceMedia}>
                                        <img
                                            src={imageSrc}
                                            alt=""
                                            loading={i === 0 ? "eager" : "lazy"}
                                            decoding="async"
                                        />
                                    </div>
                                    <div className={styles.audienceBody}>
                                        <span className={styles.audienceIndex}>
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <h3>{section.title}</h3>
                                        {section.tagline && (
                                            <p className={styles.tagline}>{section.tagline}</p>
                                        )}
                                        <div className={styles.body}>
                                            {splitParagraphs(section.body).map((p, idx) => (
                                                <p key={idx}>{p}</p>
                                            ))}
                                        </div>
                                        <div className={styles.cardCta}>
                                            <Link href={section.ctaLink ?? "/contact"}>
                                                <Button variant="outline" size="lg">
                                                    {section.ctaLabel}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className="container">
                    <div className={styles.whySplit}>
                        <figure className={styles.sectionFigure}>
                            <img
                                src={JOIN_PAGE_IMAGES.why}
                                alt=""
                                loading="lazy"
                                decoding="async"
                            />
                        </figure>
                        <div className={styles.whyPanel}>
                            <h2>{pageData?.whyHeadline ?? "Why GrowValley"}</h2>
                            {splitParagraphs(
                                pageData?.whyIntro ??
                                    "GrowValley operates through specialized companies across advisory, capital, venture building, and operational infrastructure.\n\nThat creates opportunities to collaborate across:",
                            ).map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                            <ul className={styles.whyGrid}>
                                {whyBullets.map((item: string, i: number) => (
                                    <li key={i} className={styles.whyGridItem}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className={styles.whyClosing}>
                                {pageData?.whyClosing ??
                                    "The model is designed for people who want to build, not just observe."}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className="container">
                    <div className={styles.closingBanner}>
                        <img
                            src={JOIN_PAGE_IMAGES.closing}
                            alt=""
                            className={styles.closingBg}
                            loading="lazy"
                            decoding="async"
                        />
                        <div className={styles.closingOverlay} aria-hidden />
                        <div className={styles.closingContent}>
                            <h2>
                                {pageData?.closingHeadline ??
                                    "Let's build something meaningful."}
                            </h2>
                            {splitParagraphs(
                                pageData?.closingBody ??
                                    "Whether you are an operator, investor, expert, or strategic partner, GrowValley is built around long-term relationships with people who execute at a high level.\n\nIf that sounds like you, start the conversation.",
                            ).map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                            <Link href={pageData?.closingCtaLink ?? "/contact"}>
                                <Button variant="secondary" size="lg">
                                    {pageData?.closingCtaLabel ?? "Contact GrowValley"}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
