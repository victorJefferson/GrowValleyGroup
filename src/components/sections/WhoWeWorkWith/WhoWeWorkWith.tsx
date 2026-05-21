import React from "react";
import * as Icons from "lucide-react";
import styles from "./WhoWeWorkWith.module.scss";

type Category = {
  title?: string;
  description?: string;
  iconName?: string;
};

const SECTION_FALLBACK_DESCRIPTION =
  "We partner with organisations where complexity, ambition, and capital decisions matter. Our work is board-level, founder-level, and long-term.";

const CARD_FALLBACKS: { title: string; iconName: string }[] = [
  { title: "Established Businesses", iconName: "Briefcase" },
  { title: "Corporates & Enterprises", iconName: "Building2" },
  { title: "Universities & Institutions", iconName: "GraduationCap" },
  { title: "Family Offices", iconName: "Users" },
  { title: "Governments & Authorities", iconName: "Landmark" },
  { title: "Scale-Stage Startups", iconName: "TrendingUp" },
];

const GRID_SIZE = 6;

export const WhoWeWorkWith = ({
  cmsData,
  layout = "default",
}: {
  cmsData?: { headline?: string; description?: string; categories?: Category[] };
  /** Homepage: center flex rows so an incomplete last row stays centered. */
  layout?: "default" | "centered";
}) => {
  const displayHeadline = cmsData?.headline || "Who We Work With";
  const displayIntro = cmsData?.description?.trim() || SECTION_FALLBACK_DESCRIPTION;
  const displayCategories = cmsData?.categories || [];

  const getCardData = (index: number) => {
    const cat = displayCategories[index];
    const fb = CARD_FALLBACKS[index];
    if (!fb) return { title: "", iconName: "CircleDot", description: "" };
    if (!cat?.title) return { ...fb, description: "" };
    const desc = cat.description?.trim();
    return {
      title: cat.title,
      iconName: cat.iconName || fb.iconName,
      description:
        desc && desc !== cat.title ? desc : "",
    };
  };

  return (
    <section className={styles.whoDark}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.headerBlock}>
          <h2 className={styles.heading}>{displayHeadline}</h2>
          <p className={styles.intro}>{displayIntro}</p>
          <span className={styles.headerRule} aria-hidden />
        </div>
        <div
          className={`${styles.grid} ${layout === "centered" ? styles.gridCentered : ""}`}>
          {Array.from({ length: GRID_SIZE }).map((_, index) => {
            const { title, iconName, description } = getCardData(index);
            const IconComponent =
              iconName &&
              (Icons as unknown as Record<string, React.ElementType>)[iconName];

            return (
              <article
                key={`${title}-${index}`}
                className={`${styles.tile} ${layout === "centered" ? styles.tileFlex : ""}`}>
                {description ? <span className="sr-only">{description}</span> : null}
                <div className={styles.iconRing} aria-hidden>
                  {IconComponent ? <IconComponent className={styles.icon} size={22} strokeWidth={1.35} /> : null}
                </div>
                <h3 className={styles.tileTitle}>{title}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
