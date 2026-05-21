import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import styles from "./Team.module.scss";
import { client } from "@/lib/sanity";
import { heroQuery } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";

export const metadata: Metadata = {
  title: {
    absolute: "Our Team | GrowValley Group",
  },
  description:
    "Meet the GrowValley Group team — senior advisors with deep operating experience across strategy, capital, and execution.",
  openGraph: {
    title: "Our Team | GrowValley Group",
    description: "GrowValley Group advisory team.",
    url: "https://gv.consulting/team",
  },
};

export default async function TeamPage() {
  let heroData = null;
  try {
    heroData = await client.fetch(heroQuery, { pageSlug: "team" });
  } catch (err) {
    console.error("Team Hero Fetch Error:", err);
  }

  const defaultHero = {
    eyebrow: "GrowValley Group",
    headline: "Our Team",
    subheadline:
      "Senior advisors with deep operating experience across strategy, capital, and execution.",
    image: "/images/team_hero.png",
  };

  const displayHero = heroData || defaultHero;
  const heroImage = heroData?.image ? urlFor(heroData.image).url() : displayHero.image;

  const team = [
    {
      name: "Strategy Advisory",
      title: "Principal, Growth Advisory",
      bio: "Helping established businesses translate strategy into measurable revenue and performance outcomes.",
    },
    {
      name: "Capital Advisory",
      title: "Director, Capital Structuring",
      bio: "Preparing businesses to attract, structure, and deploy capital with discipline and defensibility.",
    },
    {
      name: "Innovation Advisory",
      title: "Director, Venture Building",
      bio: "Designing and operating venture studios and innovation engines for next-generation products.",
    },
    {
      name: "PMO Practice",
      title: "Director, Program Delivery",
      bio: "Running enterprise-grade Project Management Offices that deliver visibility, accountability, and risk control.",
    },
    {
      name: "Family Office Practice",
      title: "Director, Family Office Setup",
      bio: "Structuring governance, investment operating models, and generational frameworks for family wealth.",
    },
    {
      name: "Operations & Governance",
      title: "Head of Compliance",
      bio: "Ensuring engagements meet governance, documentation, and execution standards across mandates.",
    },
  ];

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

      <section className="section-padding">
        <div className="container">
          <div className={styles.teamGrid}>
            {team.map((member, idx) => (
              <Card key={idx} className={styles.teamCard}>
                <div className={styles.cardHeader}>
                  <h3>{member.name}</h3>
                  <span className={styles.title}>{member.title}</span>
                </div>
                <p>{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={`section-padding ${styles.bgSecondary}`}>
        <div className="container text-center">
          <h2 className={styles.heading}>Join our team</h2>
          <p className={styles.body}>
            We are always looking for advisors and operators who bring rigour, ownership,
            and a commercial mindset to the work.
          </p>
          <Link href="/join-us/careers">
            <Button variant="secondary" size="lg">
              View Careers
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
