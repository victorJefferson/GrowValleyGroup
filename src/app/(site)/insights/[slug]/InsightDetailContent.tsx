"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { urlFor } from "@/lib/sanity";
import { PortableText } from "next-sanity";
import { InsightsCarousel, InsightItem } from "@/components/ui/InsightsCarousel";

import Link from "next/link";
import styles from "./page.module.scss";

interface TOCItem {
  id: string;
  text: string;
}

interface InsightDetailContentProps {
    insight: any;
    relatedInsights: InsightItem[];
}

export default function InsightDetailContent({ insight, relatedInsights }: InsightDetailContentProps) {
  const [activeId, setActiveId] = useState("");

  // Extract H2s for TOC using unique _key, filtering out empty blocks
  const toc: TOCItem[] = useMemo(() => {
    if (!insight?.content) return [];
    return insight.content
      .filter((block: any) => {
        const text = block.children?.map((c: any) => c.text).join("") || "";
        return block._type === 'block' && block.style === 'h2' && text.trim().length > 0;
      })
      .map((block: any) => ({
        id: block._key,
        text: block.children?.map((c: any) => c.text).join("") || ""
      }));
  }, [insight]);

  // Reliable scroll-based TOC tracking
  useEffect(() => {
    if (toc.length === 0) return;

    const OFFSET = 160; // pixels from top, accounts for sticky nav

    const getActiveId = () => {
      const headingsWithPos = toc
        .map(item => {
          const el = document.getElementById(item.id);
          if (!el) return null;
          return { id: item.id, top: el.getBoundingClientRect().top };
        })
        .filter(Boolean) as { id: string; top: number }[];

      if (headingsWithPos.length === 0) return;

      const passed = headingsWithPos.filter(h => h.top <= OFFSET);

      if (passed.length > 0) {
        const active = passed[passed.length - 1];
        setActiveId(active.id);
      } else {
        setActiveId("");
      }
    };

    getActiveId();

    window.addEventListener('scroll', getActiveId, { passive: true });
    return () => window.removeEventListener('scroll', getActiveId);
  }, [toc]);

  const portableTextComponents = {
    block: {
      h2: ({ children, value }: any) => {
        return <h2 id={value._key} className={styles.subheading}>{children}</h2>;
      },
      normal: ({ children }: any) => <p className={styles.paragraph}>{children}</p>,
    },
  };

  return (
    <main className={styles.insightPage}>
      {/* Article Header */}
      <div className={styles.articleHeader}>
        <div className="container">
          <div className={styles.headerContent}>
            <span className={styles.tag}>{insight.tag}</span>
            <h1 className={styles.mainTitle}>{insight.title}</h1>
            <div className={styles.breadcrumb}>
              <Link href="/">Home</Link> / <Link href="/insights">Insights</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Image Hero */}
      {insight.mainImage && (
        <div className="container">
          <div className={styles.mainImageWrapper}>
            <img 
              src={urlFor(insight.mainImage).url()} 
              alt={insight.title}
              width="1200"
              height="600"
              className={styles.heroImage}
            />
          </div>
        </div>
      )}

      {/* Main Content Split */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.splitGrid}>
            
            {/* Left: Article Body */}
            <article className={styles.articleBody}>
              <PortableText 
                value={insight.content} 
                components={portableTextComponents} 
              />
              
              <div className={styles.articleFooter}>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={styles.backToTop}
                >
                  Back to top &uarr;
                </button>
              </div>
            </article>

            {/* Right: Sticky TOC */}
            <aside className={styles.sidebar}>
              <div className={styles.tocCard}>
                <h3 className={styles.tocTitle}>Table of Contents</h3>
                <nav className={styles.tocNav}>
                  {toc.length > 0 ? (
                    toc.map((item) => (
                      <a 
                        key={item.id}
                        href={`#${item.id}`}
                        className={`${styles.tocLink} ${activeId === item.id ? styles.active : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveId(item.id);
                          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <span className={styles.indicator}></span>
                        {item.text}
                      </a>
                    ))
                  ) : (
                    <p className={styles.noTOC}>No subheadings found.</p>
                  )}
                </nav>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* Related Insights Carousel */}
      <div className={styles.relatedSection}>
        <InsightsCarousel 
          title="Related Insights"
          description="Explore further publications on growth strategy and capital readiness."
          insights={relatedInsights}
        />
      </div>
    </main>
  );
}
