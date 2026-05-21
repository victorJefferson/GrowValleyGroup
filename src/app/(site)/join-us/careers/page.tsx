import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import styles from "../JoinUs.module.scss";
import { client, urlFor } from "@/lib/sanity";
import { joinUsPageQuery } from "@/lib/queries";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Mail } from "lucide-react";

function splitParagraphs(text?: string): string[] {
  if (!text?.trim()) return [];
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export const metadata: Metadata = {
  title: { absolute: "Careers | GrowValley Group" },
  description:
    "Solve hard problems. Build real systems. Work that matters. Join the GrowValley Group team at the intersection of strategy, capital, and execution.",
  openGraph: {
    title: "Careers | GrowValley Group",
    description: "Explore career opportunities at GrowValley Group.",
    url: "https://gv.consulting/join-us/careers",
  },
};

export default async function CareersPage() {
  const data = await client
    .fetch(joinUsPageQuery, { pageKey: "careers" })
    .catch(() => null);

  const heroImageUrl = data?.heroImage
    ? urlFor(data.heroImage).url()
    : data?.heroImagePath ?? "/images/join_us.png";

  const traits =
    data?.traits ??
    [
      {
        title: "Execution orientation",
        description: "You want to see the work deliver results, not produce analysis.",
      },
      {
        title: "Intellectual rigour",
        description:
          "You can structure complex problems and communicate the logic to operators, boards, and investors.",
      },
      {
        title: "Ownership mentality",
        description:
          "You take responsibility for your mandates and do not wait to be directed.",
      },
      {
        title: "Commercial awareness",
        description:
          "You understand what matters to founders and operators: capital, margin, execution, and risk.",
      },
    ];

  const openings: Array<{ title?: string; summary?: string; applyLink?: string }> =
    data?.openings ?? [];
  const looksLikeBody = splitParagraphs(data?.pullQuote2);

  return (
    <main>
      <Hero
        eyebrow={data?.heroEyebrow ?? "CAREERS"}
        headline={
          data?.heroHeadline ??
          "Solve Hard Problems. Build Real Systems. Work That Matters."
        }
        subheadline={
          data?.heroSubheadline ??
          "GVC works at the intersection of strategy, capital, and execution. Our team operates at the same level as the founders, CFOs, and boards they serve."
        }
        image={heroImageUrl}
        hasCTA
        ctaText={data?.heroCtaLabel ?? "View Open Roles"}
        ctaHref={data?.heroCtaLink ?? "#openings"}
      />

      {/* What Working at GVC Looks Like */}
      <section className="section-padding">
        <div className="container">
          <div className={styles.narrativeSection}>
            <h2 className={styles.heading}>
              {data?.pullQuote1 ?? "What Working at GVC Looks Like"}
            </h2>
            <div className={styles.narrativeBody}>
              {(looksLikeBody.length > 0
                ? looksLikeBody
                : [
                    "Our work is direct, demanding, and consequential. Clients engage GVC because the stakes are real: capital is in motion, decisions carry weight, and execution has to deliver.",
                    "The work is hands-on. You will be in the room, on the program, and accountable for outcomes from the beginning.",
                  ]
              ).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Look For (4 traits) */}
      <section className={`section-padding ${styles.bgTertiary}`}>
        <div className="container">
          <div className={styles.narrativeSection} style={{ marginBottom: "2.25rem" }}>
            <span className={styles.eyebrow}>
              {data?.whoEyebrow ?? "WHAT WE LOOK FOR"}
            </span>
            <h2 className={styles.heading}>
              {data?.whoHeadline ?? "What We Look For"}
            </h2>
          </div>
          <div className={styles.traitStack}>
            {traits.map((trait: any, idx: number) => (
              <article key={idx} className={styles.traitRow}>
                <h3>{trait.title}</h3>
                <p>{trait.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section id="openings" className="section-padding">
        <div className="container">
          <div
            className={`${styles.roundedPanel} ${openings.length === 0 ? styles.noOpeningsPanel : ""}`}
          >
            <div className={styles.openings}>
              <span className={styles.eyebrow}>
                {data?.ctaEyebrow ?? "CURRENT OPENINGS"}
              </span>
              <h2 className={styles.heading}>
                {data?.ctaHeadline ?? "Current Openings"}
              </h2>

              {openings.length > 0 ? (
                <div className={styles.openingsList} style={{ marginTop: "2rem" }}>
                  {openings.map((role, idx) => (
                    <article key={idx} className={styles.openingItem}>
                      <h3>{role.title}</h3>
                      {role.summary && <p>{role.summary}</p>}
                      {role.applyLink && (
                        <Link href={role.applyLink}>
                          <Button variant="primary" size="sm">
                            Apply
                          </Button>
                        </Link>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                <div className={styles.noOpeningsHero}>
                  <Mail size={22} aria-hidden />
                  <span className={styles.noOpeningsEyebrow}>
                    {data?.ctaEyebrow ?? "OPEN ROLES"}
                  </span>
                  <h3 className={styles.noOpeningsTitle}>
                    {data?.ctaBody?.trim() ??
                      "No open roles right now but we're always listening."}
                  </h3>
                </div>
              )}

              {openings.length === 0 && (
                <div className={styles.openingCard}>
                  <p>
                    {data?.noOpeningsFallback ??
                      "No openings that match your profile? Send your CV and a brief note to careers@gv.consulting. We keep strong profiles on file for upcoming mandates."}
                  </p>
                  <Link
                    href={data?.ctaButtonHref ?? "mailto:careers@gv.consulting"}
                  >
                    <Button variant="primary" size="lg">
                      <Mail size={16} style={{ marginRight: "0.5rem" }} />
                      {data?.ctaButtonLabel ?? "Send Us Your CV"}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
