"use client";

import { useRef, useState } from "react";
import { urlFor } from "@/lib/sanity";
import styles from "./CaseStudies.module.scss";

interface CaseStudy {
  _id: string;
  title: string;
  coverImage?: any;
  pdfUrl?: string;
}

interface CaseStudiesCarouselProps {
  caseStudies: CaseStudy[];
}

export function CaseStudiesCarousel({ caseStudies }: CaseStudiesCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const total = caseStudies.length;

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setActiveIndex(index);
  };

  const prev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const next = () => scrollToIndex(Math.min(total - 1, activeIndex + 1));

  if (!caseStudies || caseStudies.length === 0) return null;

  return (
    <div className={styles.caseStudiesPanel}>
      {/* Left: Intro */}
      <div className={styles.caseStudiesIntro}>
        <span className={styles.csEyebrow}>Case Studies</span>
        <h2 className={styles.csHeading}>
          The power of purposeful wealth
        </h2>
        <p className={styles.csBody}>
          Our clients navigate complexity across borders. These are a selection
          of mandates that illustrate how we work.
        </p>
      </div>

      {/* Right: Carousel */}
      <div className={styles.caseStudiesRight}>
        <div className={styles.carouselTrack} ref={trackRef}>
          {caseStudies.map((cs) => {
            const imgUrl = cs.coverImage ? urlFor(cs.coverImage).width(600).height(400).url() : null;
            const CardContent = (
              <div className={styles.card}>
                {imgUrl && (
                  <div className={styles.cardImagePane}>
                    <img src={imgUrl} alt={cs.title} className={styles.cardImage} />
                  </div>
                )}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{cs.title}</h3>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardPill}>Case Study</span>
                    <span className={styles.cardArrow} aria-hidden="true">→</span>
                  </div>
                </div>
              </div>
            );

            return cs.pdfUrl ? (
              <a
                key={cs._id}
                href={cs.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardWrapper}
                aria-label={`Download case study: ${cs.title}`}
              >
                {CardContent}
              </a>
            ) : (
              <div key={cs._id} className={styles.cardWrapper}>
                {CardContent}
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className={styles.carouselNav}>
          <button
            className={styles.navBtn}
            onClick={prev}
            disabled={activeIndex === 0}
            aria-label="Previous case study"
          >
            ←
          </button>
          <button
            className={styles.navBtn}
            onClick={next}
            disabled={activeIndex === total - 1}
            aria-label="Next case study"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
