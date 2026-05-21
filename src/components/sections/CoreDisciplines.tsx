import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./CoreDisciplines.module.scss";

interface CoreDisciplinesProps {
  categories?: any[];
}

export const CoreDisciplines = ({ categories = [] }: CoreDisciplinesProps) => {
  return (
    <section className={styles.coreDisciplinesSection}>
      <div className="container">
        <div className={styles.coreDisciplinesHeader}>
          <span className={styles.coreDisciplinesEyebrow}>
            Our Core Disciplines
          </span>
        </div>

        <div className={styles.coreDisciplinesGrid}>
          {(categories.length > 0
            ? categories
            : [
              { title: "Wealth Management", sectionId: "wealth-management" },
              { title: "Family Office Services", sectionId: "family-office-services" },
              { title: "Private Access to Opportunities", sectionId: "private-access-to-opportunities" },
              { title: "Succession Planning Services", sectionId: "succession-planning-services" },
            ]
          ).map((cat, i) => {
            // A robust fallback resolution when CMS 'sectionId' field is blank
            let targetHash = cat.sectionId;
            if (!targetHash) {
              const titleLower = (cat.title || "").toLowerCase();
              if (titleLower.includes("wealth")) targetHash = "wealth-management";
              else if (titleLower.includes("family")) targetHash = "family-office-services";
              else if (titleLower.includes("private")) targetHash = "private-access-to-opportunities";
              else if (titleLower.includes("succession")) targetHash = "succession-planning-services";
              else targetHash = cat.slug || "";
            }

            return (
              <Link
                href={`/our-capabilities/${targetHash}`}
                className={styles.disciplineTile}
                key={i}
              >
                <span className={styles.tileIndex}>0{i + 1}</span>
                <div className={styles.tileBottom}>
                  <h3 className={styles.tileTitle}>{cat.title}</h3>
                  <div className={styles.tileArrow}>
                    <ArrowRight />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
