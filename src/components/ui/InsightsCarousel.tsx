"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import styles from './InsightsCarousel.module.scss';

export interface InsightItem {
  id: string;
  title: string;
  date: string;
  tag: string;
  image: string;
  author?: string;
  slug?: string;
}

interface InsightsCarouselProps {
  title?: string;
  description?: string;
  exploreLink?: {
    text: string;
    href: string;
  };
  insights: InsightItem[];
}

export const InsightsCarousel: React.FC<InsightsCarouselProps> = ({
  title = "Latest from GrowValley",
  description = "Perspectives on capital, investment, and portfolio construction.",
  exploreLink = { text: "Learn more", href: "/insights" },
  insights
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollPrev(scrollLeft > 5); // 5px tolerance
      setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll(); // Initial check
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, [insights]);

  const scroll = (direction: 'next' | 'prev') => {
    if (carouselRef.current) {
      const { clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.8;

      carouselRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={styles.insightsOverhaul}>
      <div className="container">
        <div className={styles.insightsContainerCard}>
          <div className={styles.insightsWrapper}>
            <div className={styles.insightsHeaderSide}>
              <div className={styles.headerTextGroup}>
                <h2 className={styles.insightsHeading}>{title}</h2>
                <p className={styles.insightsIntro}>{description}</p>
                <Link href={exploreLink.href} className={styles.exploreLink}>
                  {exploreLink.text} <ArrowRight size={18} />
                </Link>
              </div>

              <div className={styles.carouselNav}>
                <button
                  className={styles.navBtn}
                  aria-label="Previous"
                  onClick={() => scroll('prev')}
                  disabled={!canScrollPrev}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className={styles.navBtn}
                  aria-label="Next"
                  onClick={() => scroll('next')}
                  disabled={!canScrollNext}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            <div className={styles.insightsCarouselSide}>
              <div className={styles.carouselTrack} ref={carouselRef}>
                {insights.map((insight) => (
                  <Link
                    key={insight.id}
                    href={`/insights/${insight.slug || '#'}`}
                    className={styles.insightCardPremium}
                  >
                    <div className={styles.cardCover}>
                      {insight.image ? (
                        <img
                          src={insight.image}
                          alt={insight.title}
                          className={styles.coverImg}
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div className={styles.coverPlaceholder} />
                      )}
                    </div>
                    <div className={styles.cardBody}>
                      <h4 className={styles.cardTitle}>{insight.title}</h4>
                      <div className={styles.cardMeta}>
                        {insight.author && <span className={styles.author}>{insight.author}</span>}
                        <span className={styles.date}>{insight.date}</span>
                      </div>
                    </div>
                    <div className={styles.cardFooter}>
                      <span className={styles.pillTag}>{insight.tag}</span>
                      <ArrowRight size={18} className={styles.arrowIcon} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
