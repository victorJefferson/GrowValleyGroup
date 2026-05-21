import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import styles from "../AboutUs.module.scss";
import { client } from "@/lib/sanity";
import { heroQuery, teamQuery } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Our Team | GrowValley",
  description:
    "The people who do the work — specialists across formation, operations, finance, and international expansion.",
};

export default async function TeamPage() {
  let heroData = null;
  let teamData = null;

  try {
    [heroData, teamData] = await Promise.all([
      client.fetch(heroQuery, { pageSlug: "team" }),
      client.fetch(teamQuery)
    ]);
  } catch (err) {
    console.error("Team Data Fetch Error:", err);
  }

  const defaultHero = {
    eyebrow: "OUR TEAM",
    headline: "The people who do the work.",
    subheadline:
      "GrowValley is staffed by specialists. Each person owns a defined domain across formation, operations, finance, and international expansion. They work in coordination across functions, so nothing falls through the gaps between them.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1400",
  };

  const displayHero = heroData || defaultHero;
  const heroImage = heroData?.image ? urlFor(heroData.image).url() : displayHero.image;
  const placeholderImg = "/images/placeholderPerson.jpg";

  /** Team Page V1 — matches CMS seed (`category: operations`, stable _id order). */
  const fallbackSpecialists = [
    { name: "Nadia Al Rashid", role: "Strategy & Scale Readiness", image: placeholderImg },
    { name: "Tariq Mansour", role: "Performance Transformation", image: placeholderImg },
    { name: "Leila Okonkwo", role: "PMO & Execution Governance", image: placeholderImg },
    { name: "James Whitfield", role: "Leadership & Organizational Design", image: placeholderImg },
    { name: "Kai Nakamura", role: "Venture Studio Operations", image: placeholderImg },
    { name: "Sven Hartmann", role: "Corporate Venture Building", image: placeholderImg },
    { name: "Amara Diallo", role: "Family Office Advisory", image: placeholderImg },
    { name: "Rohan Mehta", role: "Business Structuring & Governance", image: placeholderImg },
    { name: "Sofia Andrade", role: "Transformation & Change Management", image: placeholderImg },
  ];

  const operationsFromCms =
    teamData?.filter((m: any) => m.category === "operations") ?? [];

  const finalSpecialists =
    operationsFromCms.length > 0
      ? operationsFromCms.map((m: any) => ({
          name: m.name,
          role: m.role,
          image: m.image ? urlFor(m.image).url() : placeholderImg,
        }))
      : fallbackSpecialists;

  return (
    <main>
      <Hero
        eyebrow={displayHero.eyebrow}
        headline={displayHero.headline}
        subheadline={displayHero.subheadline}
        hasCTA={displayHero.hasCTA}
        image={heroImage}
      />

      <section className="section-padding">
        <div className="container">
          <div className={`${styles.sectionHeader} text-center`}>
            <h2 className={styles.heading}>Our Advisory Team</h2>
          </div>

          <div className={styles.teamGrid}>
            {finalSpecialists.map((member: any, idx: number) => (
              <div key={idx} className={styles.teamMemberCard}>
                <div className={styles.memberImage}>
                  <img src={member.image} alt={member.name} />
                </div>
                <div className={styles.memberInfo}>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className={styles.groupPanel}>
            <h2 className={styles.headingWhite}>Join the team.</h2>
            <p className={styles.bodyWhite}>
              GrowValley is looking for professionals who bring precision, discretion, and a bias toward getting things done. If that describes you, we want to hear from you.
            </p>
            <div className={styles.ctaGroup}>
              <Link href="/join-us/careers">
                <Button variant="secondary" size="lg">
                  View Open Roles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
