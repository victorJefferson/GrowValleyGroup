import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import { CaseStudiesCarousel } from "@/components/ui/CaseStudiesCarousel";
import Link from "next/link";
import { ArrowRight, Crown, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import styles from "./AboutUs.module.scss";
import { client, urlFor } from "@/lib/sanity";
import {
  heroQuery,
  caseStudiesQuery,
  aboutUsPageQuery,
} from "@/lib/queries";
import { features } from "@/config/features";
import {
  getAboutUsNarrativeLayout,
  resolveAboutUsSectionImageUrl,
} from "@/lib/aboutUsNarrative";
import type { AboutUsNarrativeLayout } from "@/lib/aboutUsNarrative";

export const metadata: Metadata = {
  title: { absolute: "About Us | GrowValley Group" },
  description:
    "GrowValley runs the legal, regulatory, and operational infrastructure that keeps serious businesses running — managed end-to-end, owned by one firm.",
  openGraph: {
    title: "About Us | GrowValley Group",
    description:
      "We run what your business can't afford to get wrong — entity, compliance, payroll, and cross-border infrastructure under one accountable firm.",
    url: "https://gv.consulting/about-us",
  },
};

const FALLBACK_NARRATIVE = [
  {
    eyebrow: "WHAT GROWVALLEY IS",
    heading: "Not a setup company.",
    body:
      "Most firms help businesses start. GrowValley is built for what comes after.\n\nThe entity structures that have to hold under scrutiny. The compliance that cannot lapse when you are operating across jurisdictions. The payroll that runs on time, every month, regardless of where your people are. The regulatory filings that require institutional relationships, not a Google search.\n\nThese are not tasks you can afford to fragment across vendors who do not talk to each other. They require a single firm that understands the full picture, owns the outcome, and keeps pace with how your business grows.\n\nThat is what GrowValley does.",
  },
  {
    eyebrow: "WHAT GROWVALLEY IS BUILT FOR",
    heading: "Execution, not advice.",
    body:
      "Most professional services firms tell you what to do. GrowValley does it.\n\nWe are not a consultancy. We do not produce reports or recommendations. We manage the legal, regulatory, and operational infrastructure your business runs on: the structures that have to hold, the filings that cannot be missed, the compliance that has to work across every jurisdiction you operate in.\n\nThat work requires institutional knowledge, active relationships with government authorities, and enough depth across functions to catch what a single-discipline vendor would miss. That is what GrowValley is built around.",
  },
  {
    eyebrow: "PHILOSOPHY",
    heading: "One firm. Full accountability.",
    body:
      "The typical arrangement looks like this: a lawyer for your corporate structure, an accounting firm for your books, a PRO service you found through a referral, and a payroll provider that none of them have ever spoken to. When something goes wrong, it falls through the gap between all of them.\n\nGrowValley consolidates the functions that belong together. Company formation, entity management, regulatory compliance, accounting, payroll, HR administration, and cross-border structuring, all managed by one firm, all coordinated, all owned by us.\n\nYou do not manage us. We manage the work.",
  },
  {
    eyebrow: "WHO WE WORK WITH",
    heading: "Built for operators, not first-timers.",
    body:
      "Our clients are not figuring out where to start. They have already built something. What brings them to GrowValley is usually one of the following:\n\nThey are expanding into the UAE and need the full operational layer set up correctly from the start, not retrofitted later when the structure is already causing problems.\n\nThey are running two or three entities across different jurisdictions and their current providers are not keeping pace. Things are getting missed. Reporting is inconsistent. Nobody has a complete picture.\n\nThey have a compliance or regulatory situation that requires someone with direct government relationships and enough institutional knowledge to navigate it without escalating the problem.\n\nThey have scaled quickly and their operational infrastructure, the structures, the filings, the payroll, the admin, has not kept up with where the business actually is.\n\nIf any of these describe your situation, GrowValley is built for it.",
  },
  {
    eyebrow: "THE LONG-TERM RELATIONSHIP",
    heading: "The firms that stay are the ones that have seen the alternative.",
    body:
      "Operational failures rarely announce themselves in advance. A structure that was never maintained after formation, a compliance window that closed during a period of rapid growth, a payroll discrepancy that compounds quietly across multiple markets. By the time these surface, they are no longer small problems.\n\nThe clients who have been through it once do not look for the cheapest option the second time. They look for a firm that stays close enough to the business to see problems coming, and has the depth to deal with them before they become material.\n\nThat is the relationship GrowValley is built to have.",
  },
];

const FALLBACK_SUB_PAGES_NAV = [
  { label: "Meet the leadership team", href: "/about-us/leadership" },
  { label: "The people behind the work", href: "/about-us/team" },
  { label: "How we have worked with clients", href: "/expertise" },
];

function splitParagraphs(body?: string): string[] {
  if (!body) return [];
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function isBulletLine(line: string): boolean {
  return /^[•\-]\s/.test(line.trim());
}

function stripBullet(line: string): string {
  return line.trim().replace(/^[•\-]\s*/, "");
}

function renderParagraphBlock(p: string, key: number) {
  const lines = p
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const bulletStart = lines.findIndex(isBulletLine);

  if (bulletStart >= 0 && lines.slice(bulletStart).every(isBulletLine)) {
    return (
      <div key={key} className={styles.sectionBlock}>
        {lines.slice(0, bulletStart).map((line, i) => (
          <p key={`intro-${i}`} className={styles.sectionBody}>
            {line}
          </p>
        ))}
        <ul className={styles.sectionList}>
          {lines.slice(bulletStart).map((line, i) => (
            <li key={i}>{stripBullet(line)}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (lines.length > 0 && lines.every(isBulletLine)) {
    return (
      <ul key={key} className={styles.sectionList}>
        {lines.map((line, i) => (
          <li key={i}>{stripBullet(line)}</li>
        ))}
      </ul>
    );
  }

  return (
    <p key={key} className={styles.sectionBody}>
      {p}
    </p>
  );
}

function NarrativeSectionBody({ body }: { body?: string }) {
  const paragraphs = splitParagraphs(body);
  if (paragraphs.length > 0) {
    return <>{paragraphs.map((p, j) => renderParagraphBlock(p, j))}</>;
  }
  if (body) {
    return <p className={styles.sectionBody}>{body}</p>;
  }
  return null;
}

function getSubPageIcon(href: string): LucideIcon {
  if (href.includes("leadership")) return Crown;
  if (href.includes("team")) return Users;
  return ArrowRight;
}

function isAboutUsSelfLink(link: { label?: string; href?: string }): boolean {
  const href = String(link.href || "")
    .replace(/\/$/, "")
    .toLowerCase();
  const label = String(link.label || "").trim().toLowerCase();
  return href === "/about-us" || label === "about us";
}

function sectionImageAlt(s: { eyebrow?: string; heading?: string }): string {
  if (s.heading) return s.heading;
  if (s.eyebrow) return s.eyebrow;
  return "";
}

function AboutNarrativeSection({
  s,
  index,
  layout,
  imageSrc,
}: {
  s: { eyebrow?: string; heading?: string; body?: string };
  index: number;
  layout: AboutUsNarrativeLayout;
  imageSrc: string;
}) {
  const alt = sectionImageAlt(s);

  const eyebrowHeading = (
    <>
      {s.eyebrow && <span className={styles.sectionEyebrow}>{s.eyebrow}</span>}
      {s.heading && <h2 className={styles.sectionHeading}>{s.heading}</h2>}
    </>
  );

  const bodyBlock = <NarrativeSectionBody body={s.body} />;

  const figure = (
    <figure className={styles.sectionFigure}>
      <img
        src={imageSrc}
        alt={alt}
        width={1200}
        height={800}
        className={styles.sectionImg}
        loading={index < 2 ? "eager" : "lazy"}
        decoding="async"
      />
    </figure>
  );

  switch (layout) {
    case "splitImageRight":
      return (
        <div className={styles.layoutSplitImgRight}>
          <div className={styles.layoutSplitImgRightText}>
            {eyebrowHeading}
            {bodyBlock}
          </div>
          {figure}
        </div>
      );
    case "splitImageLeft":
      return (
        <div className={styles.layoutSplitImgLeft}>
          {figure}
          <div className={styles.layoutSplitImgLeftText}>
            {eyebrowHeading}
            {bodyBlock}
          </div>
        </div>
      );
    case "mediaTop":
      return (
        <div className={styles.layoutMediaTop}>
          <header className={styles.layoutMediaTopHeader}>{eyebrowHeading}</header>
          <div className={styles.layoutMediaTopSplit}>
            <div className={styles.layoutMediaTopBody}>{bodyBlock}</div>
            <div className={styles.layoutMediaTopFigureWrap}>{figure}</div>
          </div>
        </div>
      );
    case "panelSplit":
      return (
        <div className={styles.layoutPanel}>
          <div className={styles.layoutPanelFigureWrap}>{figure}</div>
          <div className={styles.layoutPanelText}>
            {eyebrowHeading}
            {bodyBlock}
          </div>
        </div>
      );
    case "stackImageTop":
      return (
        <div className={styles.layoutStackTop}>
          <div className={styles.layoutStackTopFigureWrap}>{figure}</div>
          <div className={styles.layoutStackTopText}>
            {eyebrowHeading}
            {bodyBlock}
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default async function AboutUsPage() {
  let heroData: any = null;
  let caseStudiesData: any[] = [];
  let aboutUsPageSettings: any = null;

  try {
    [heroData, caseStudiesData, aboutUsPageSettings] = await Promise.all([
      client.fetch(heroQuery, { pageSlug: "about" }),
      client.fetch(caseStudiesQuery),
      client.fetch(aboutUsPageQuery),
    ]);
  } catch (err) {
    console.error("About Us Data Fetch Error:", err);
  }

  const defaultHero = {
    eyebrow: "ABOUT GROWVALLEY",
    headline: "We run what your business can't afford to get wrong.",
    subheadline:
      "GrowValley handles the legal, regulatory, and operational infrastructure that keeps serious businesses running. The work that has to be done correctly, every time, without you having to think about it.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1400",
  };

  const displayHero = heroData || defaultHero;
  const heroImage = heroData?.image
    ? urlFor(heroData.image).url()
    : displayHero.image;

  const narrativeSections =
    aboutUsPageSettings?.narrativeSections && aboutUsPageSettings.narrativeSections.length > 0
      ? aboutUsPageSettings.narrativeSections
      : FALLBACK_NARRATIVE;

  const subPagesNav = (
    aboutUsPageSettings?.subPagesNav && aboutUsPageSettings.subPagesNav.length > 0
      ? aboutUsPageSettings.subPagesNav
      : FALLBACK_SUB_PAGES_NAV
  ).filter((link: { label?: string; href?: string }) => !isAboutUsSelfLink(link));

  return (
    <main>
      <Hero
        eyebrow={displayHero.eyebrow}
        headline={displayHero.headline}
        subheadline={displayHero.subheadline}
        ctaText={displayHero.ctaText}
        ctaHref={displayHero.ctaHref}
        hasCTA={displayHero.hasCTA}
        image={heroImage}
      />

      {narrativeSections.length > 0 && (
        <div className={styles.narrativeSeries}>
          {narrativeSections.map((s: any, i: number) => {
            const layout = getAboutUsNarrativeLayout(i);
            const imageSrc = resolveAboutUsSectionImageUrl(s, i, urlFor);
            const sectionShellClass =
              layout === "panelSplit"
                ? `${styles.narrativeSection} ${styles.narrativeSectionPanel}`
                : layout === "mediaTop"
                  ? `${styles.narrativeSection} ${styles.narrativeSectionMediaTop}`
                  : styles.narrativeSection;

            return (
              <section key={i} className={`section-padding ${sectionShellClass}`}>
                <div className="container">
                  <AboutNarrativeSection
                    s={s}
                    index={i}
                    layout={layout}
                    imageSrc={imageSrc}
                  />
                </div>
              </section>
            );
          })}
        </div>
      )}

      {subPagesNav.length > 0 && (
        <section className={`section-padding ${styles.subPagesNavSection}`}>
          <div className="container">
            <div className={styles.subPagesNav}>
              {subPagesNav.map((link: { label?: string; href?: string }, i: number) => {
                const href = link.href || "#";
                const Icon = getSubPageIcon(href);
                return (
                  <Link key={`${href}-${i}`} href={href} className={styles.subPagesNavItem}>
                    <span className={styles.subPagesNavIcon} aria-hidden>
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <span className={styles.subPagesNavContent}>
                      <span className={styles.subPagesNavLabel}>{link.label}</span>
                    </span>
                    <ArrowRight size={20} className={styles.subPagesNavArrow} />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {features.caseStudies && caseStudiesData && caseStudiesData.length > 0 && (
        <section className="section-padding">
          <div className="container">
            <CaseStudiesCarousel caseStudies={caseStudiesData} />
          </div>
        </section>
      )}

      <section className="section-padding">
        <div className="container">
          <div className={styles.groupPanel}>
            <h2 className={styles.headingWhite}>
              {aboutUsPageSettings?.ctaHeadline ||
                "Most operational problems are easier to fix before they compound."}
            </h2>
            {(aboutUsPageSettings?.ctaSubline ||
              "If something in your setup is not working the way it should, tell us what you are dealing with. We will give you a straight answer on what it takes to fix it.") && (
              <p className={styles.bodyWhite}>
                {aboutUsPageSettings?.ctaSubline ||
                  "If something in your setup is not working the way it should, tell us what you are dealing with. We will give you a straight answer on what it takes to fix it."}
              </p>
            )}
            <div className={styles.ctaGroup}>
              <Link href={aboutUsPageSettings?.ctaButtonLink || "/contact"}>
                <Button size="lg" variant="secondary" className="uppercase-button">
                  {aboutUsPageSettings?.ctaButtonLabel || "See where I stand"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
