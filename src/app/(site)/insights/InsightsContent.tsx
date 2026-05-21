"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';
import { urlFor } from '@/lib/sanity';
import styles from './page.module.scss';

const PAGE_SIZE = 8;

interface Insight {
  _id: string;
  title: string;
  slug: string;
  tag: string;
  excerpt: string;
  mainImage: any;
  publishedAt: string;
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
}

function InsightCard({ insight }: { insight: Insight }) {
  const imgSrc = insight.mainImage ? (urlFor(insight.mainImage) as any).width(600).url() : '';
  return (
    <Link href={`/insights/${insight.slug}`} className={styles.card}>
      <div className={styles.cardImage}>
        <img src={imgSrc} alt={insight.title} className={styles.cardImg} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{insight.title}</h3>
        <p className={styles.cardDate}>{formatDate(insight.publishedAt)}</p>
      </div>
      <div className={styles.cardFooter}>
        <span className={styles.cardTag}>{insight.tag}</span>
        <ArrowRight size={16} className={styles.cardArrow} />
      </div>
    </Link>
  );
}

interface InsightsContentProps {
    featured: Insight | null;
    editorsPicks: Insight[];
    latest: Insight[];
    allInsights: Insight[];
}

export default function InsightsContent({ featured, editorsPicks, latest, allInsights }: InsightsContentProps) {
  const [activeTab, setActiveTab] = useState('All');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Derive unique tabs from existing tags
  const tabs = useMemo(() => {
    const tags = [...new Set(allInsights.map(i => i.tag).filter(Boolean))];
    return ['All', ...tags.sort()];
  }, [allInsights]);

  // Filter articles for the grid
  const filteredInsights = useMemo(() => {
    if (activeTab === 'All') return allInsights;
    return allInsights.filter(i => i.tag === activeTab);
  }, [allInsights, activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setVisibleCount(PAGE_SIZE); // Reset pagination on tab change
  };

  const featuredImgSrc = featured?.mainImage
    ? (urlFor(featured.mainImage) as any).width(900).url()
    : '';

  return (
    <main className={styles.page}>

      {/* ── Page Header ── */}
      <section className={styles.pageHeader}>
        <div className="container">
          <div className={styles.headerGrid}>
            <h1 className={styles.pageTitle}>Latest from GrowValley</h1>
            <p className={styles.pageDesc}>
              Perspectives on capital readiness, investment strategy, and advisory practice.
            </p>
          </div>
        </div>
      </section>

      {/* ── Hero Strip: Latest / Featured / Editor's Picks ── */}
      <section className={styles.heroStrip}>
        <div className="container">
          <div className={styles.heroGrid}>

            {/* Left: Latest */}
            <div className={styles.heroCol}>
              <p className={styles.colLabel}>LATEST</p>
              <ul className={styles.latestList}>
                {latest.map((item: any) => (
                  <li key={item._id} className={styles.latestItem}>
                    <Link href={`/insights/${item.slug}`} className={styles.latestLink}>
                      <span className={styles.latestTitle}>{item.title}</span>
                      <span className={styles.readCta}>Read Insight &rarr;</span>
                    </Link>
                  </li>
                ))}
                {latest.length === 0 && (
                  <li className={styles.emptyState}>No articles yet.</li>
                )}
              </ul>
            </div>

            {/* Centre: Featured */}
            <div className={styles.featuredCol}>
              <p className={styles.colLabel}>FEATURED</p>
              {featured ? (
                <Link href={`/insights/${featured.slug}`} className={styles.featuredCard}>
                  <div className={styles.featuredImage}>
                    <img src={featuredImgSrc} alt={featured.title} className={styles.featuredImg} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className={styles.featuredMeta}>
                    <span className={styles.featuredTag}>{featured.tag}</span>
                    <h2 className={styles.featuredTitle}>{featured.title}</h2>
                    <span className={styles.readCta}>Read Article &rarr;</span>
                  </div>
                </Link>
              ) : (
                <div className={styles.emptyFeatured}>
                  <p>No featured article set. Toggle "Featured" on an article in the Studio.</p>
                </div>
              )}
            </div>

            {/* Right: Editor's Picks */}
            <div className={styles.heroCol}>
              <p className={styles.colLabel}>EDITOR&apos;S PICKS</p>
              <ul className={styles.picksList}>
                {editorsPicks.map((item: any) => (
                  <li key={item._id} className={styles.pickItem}>
                    <Link href={`/insights/${item.slug}`} className={styles.pickLink}>
                      {item.mainImage && (
                        <div className={styles.pickThumb}>
                          <img
                            src={(urlFor(item.mainImage) as any).width(120).url()}
                            alt={item.title}
                            className={styles.pickThumbImg}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      )}
                      <div className={styles.pickText}>
                        <span className={styles.pickTitle}>{item.title}</span>
                        <span className={styles.readCta}>Read &rarr;</span>
                      </div>
                    </Link>
                  </li>
                ))}
                {editorsPicks.length === 0 && (
                  <li className={styles.emptyState}>No editor&apos;s picks yet.</li>
                )}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── Tab Navigation + Grid ── */}
      <section className={styles.gridSection}>
        <div className="container">

          {/* Tabs */}
          <nav className={styles.tabNav}>
            {tabs.map(tab => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Section heading + View All */}
          <div className={styles.gridHeader}>
            <h2 className={styles.gridTitle}>{activeTab}</h2>
            {activeTab !== 'All' && (
              <button onClick={() => handleTabChange('All')} className={styles.viewAll}>
                View all &rarr;
              </button>
            )}
          </div>

          {/* Card Grid */}
          <div className={styles.cardGrid}>
            {filteredInsights.slice(0, visibleCount).map(insight => (
              <InsightCard key={insight._id} insight={insight} />
            ))}
            {filteredInsights.length === 0 && (
              <p className={styles.emptyState}>No articles in this category yet.</p>
            )}
          </div>

          {/* Load More */}
          {visibleCount < filteredInsights.length && (
            <div className={styles.loadMoreWrapper}>
              <button
                className={styles.loadMore}
                onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
              >
                Load More
              </button>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}
