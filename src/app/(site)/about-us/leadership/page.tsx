import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import styles from "../AboutUs.module.scss";
import { client } from "@/lib/sanity";
import { heroQuery, leadershipQuery, teamQuery } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Leadership | GrowValley Group",
  description: "The leadership team at GrowValley Group.",
};

export default async function LeadershipPage() {
  let heroData = null;
  let leadershipData = null;
  let teamData = null;

  try {
    [heroData, leadershipData, teamData] = await Promise.all([
      client.fetch(heroQuery, { pageSlug: "leadership" }),
      client.fetch(leadershipQuery),
      client.fetch(teamQuery)
    ]);
  } catch (err) {
    console.error("Leadership Data Fetch Error:", err);
  }

  const defaultHero = {
    eyebrow: "OUR LEADERSHIP",
    headline: "The people behind every decision.",
    subheadline:
      "Our leadership team brings decades of experience leading strategy, capital advisory, innovation programs, and family office structuring across the Middle East and international markets.",
    image: "/images/team_hero.png"
  };

  const displayHero = heroData || defaultHero;
  const heroImage = heroData?.image ? urlFor(heroData.image).url() : displayHero.image;
  const placeholderImg = "/images/placeholderPerson.jpg";

  // If leadershipData is empty, we don't have a fallback array in the original file (they were hardcoded there)
  // I'll keep the hardcoded ones as fallback if no CMS data exists
  const fallbackLeadership = [
    { name: "Jazeer Jamal", role: "Founder and CEO", image: "/images/people/jazeer_jamal.jpg" },
    { name: "William J. Daly", role: "Co-Founder and CXO", image: "/images/people/william.jpg" },
    { name: "Suhail Ismail", role: "Group COO", image: "/images/people/suhail.jpg" }
  ];

  const fallbackAdvisory = [
    { name: "Sofia Alvarez", role: "Capital Strategy and Investment Readiness Advisor", image: "/images/people/sofia_alvarez.png" },
    { name: "Aarav Malhotra", role: "Senior Growth and Transformation Advisor", image: "/images/people/aarav_malhotra.bmp" },
    { name: "Nadia El-Sayed", role: "Investment Readiness Advisor", image: "/images/people/nadia.bmp" },
    { name: "Priya Menon", role: "Capital Structuring Advisor", image: "/images/people/priya_menon.bmp" },
    { name: "Lucas Moreau", role: "Transaction Readiness Advisor", image: "/images/people/lucas_moreau.png" },
    { name: "Daniel Fischer", role: "Capital Strategy Advisor", image: "/images/people/daniel_fischer.bmp" }
  ];

  const finalLeadership =
    leadershipData && leadershipData.length > 0
      ? leadershipData.map((m: any) => ({
          name: m.name,
          role: m.title,
          image: m.image ? urlFor(m.image).url() : placeholderImg,
          linkedinUrl: typeof m.linkedinUrl === "string" ? m.linkedinUrl.trim() : "",
        }))
      : fallbackLeadership.map((m) => ({ ...m, linkedinUrl: "" }));

  const finalAdvisory = (teamData && teamData.length > 0)
    ? teamData.filter((m: any) => m.category === "advisory").map((m: any) => ({ name: m.name, role: m.role, image: m.image ? urlFor(m.image).url() : placeholderImg }))
    : fallbackAdvisory;

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
            <h2 className={styles.heading}>Leadership</h2>
          </div>

          <div className={styles.leadershipGrid}>
            {finalLeadership.map((member: {
              name: string;
              role: string;
              image: string;
              linkedinUrl?: string;
            }) => {
              const linkedin = member.linkedinUrl?.trim();
              const cardContent = (
                <>
                  <div className={styles.memberImage}>
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className={styles.memberInfo}>
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                  </div>
                </>
              );

              if (linkedin) {
                return (
                  <a
                    key={member.name}
                    href={linkedin}
                    className={`${styles.teamMemberCard} ${styles.teamMemberCardLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}>
                    {cardContent}
                  </a>
                );
              }

              return (
                <article key={member.name} className={styles.teamMemberCard}>
                  {cardContent}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className={styles.groupPanel}>
            <h2 className={styles.headingWhite}>Join our team</h2>
            <p className={styles.bodyWhite}>
              We are always looking for advisors and operators who bring rigour, ownership,
              and a commercial mindset to the work.
            </p>
            <div className={styles.ctaGroup}>
              <Link href="/join-us/careers">
                <Button variant="secondary" size="lg">
                  VIEW CAREERS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
