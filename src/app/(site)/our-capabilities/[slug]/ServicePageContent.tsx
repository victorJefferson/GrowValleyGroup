"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, Award, Scale, Landmark, BarChart3, BookOpen, Briefcase, 
  Building, Building2, Calculator, CheckCircle, Coins, Compass, 
  CreditCard, Database, DollarSign, Edit, ExternalLink, Eye, 
  FileText, Filter, Flag, Folder, Globe, TrendingUp, Handshake, 
  Heart, HelpCircle, Home, Key, Layers, LineChart, Lock, Mail, 
  Map, MapPin, Network, Package, Palette, Phone, PieChart, Plane, 
  Rocket, Search, Settings, ShieldCheck, ShoppingBag, Star, 
  Target, Users, Wallet, Zap, RefreshCw, Route, ChevronRight
} from "lucide-react";
import { urlFor } from "@/lib/sanity";
import { Button } from "@/components/ui/Button";
import styles from "./ServicePage.module.scss";

const iconMap: Record<string, any> = {
  ArrowRight, Award, Scale, Landmark, BarChart3, BookOpen, Briefcase, 
  Building, Building2, Calculator, CheckCircle, Coins, Compass, 
  CreditCard, Database, DollarSign, Edit, ExternalLink, Eye, 
  FileText, Filter, Flag, Folder, Globe, TrendingUp, Handshake, 
  Heart, HelpCircle, Home, Key, Layers, LineChart, Lock, Mail, 
  Map, MapPin, Network, Package, Palette, Phone, PieChart, Plane, 
  Rocket, Search, Settings, ShieldCheck, ShoppingBag, Star, 
  Target, Users, Wallet, Zap, RefreshCw, Route, ChevronRight
};

export default function ServicePageContent({ cmsData }: { cmsData: any }) {
  if (!cmsData) return null;

  const content = cmsData;
  const slug = cmsData.slug?.current || cmsData.slug;
  const defaultImg = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop";

  const heroImg = content.heroImage ? urlFor(content.heroImage).url() : defaultImg;
  const problemImg = content.problemImage ? urlFor(content.problemImage).url() : heroImg;
  const featureImg = content.featureImage ? urlFor(content.featureImage).url() : heroImg;
  const includedImg = content.whatsIncludedImage ? urlFor(content.whatsIncludedImage).url() : heroImg;

  return (
    <main>
      {/* ── 1. Hero Section ── */}
      <section className={styles.heroSection}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight className={styles.separator} size={14} />
            <Link href="/our-capabilities">Our Services</Link>
            <ChevronRight className={styles.separator} size={14} />
            {content.pillarTitle && (
              <>
                <Link href={`/our-capabilities/${content.pillarSlug}`}>
                  {content.pillarTitle}
                </Link>
                <ChevronRight className={styles.separator} size={14} />
              </>
            )}
            <span className={styles.current}>{content.title}</span>
          </nav>

          <div className={styles.heroSplit}>
            <div className={styles.heroLeft}>
              <h1 className={content.heroHeadline && content.heroHeadline.length > 50 ? styles.longHeadline : ""}>
                {content.heroHeadline || content.title}
              </h1>
              <p>{content.heroSubheadline}</p>
              <Link href={content.heroCtaLink || "/contact"}>
                <Button size="lg">{content.heroCtaLabel || "SPEAK TO AN EXPERT"}</Button>
              </Link>
            </div>
            <div className={styles.heroRight}>
              <img src={heroImg} alt={content.title} />
              <div className={styles.heroRightOverlay} />
              <div className={styles.heroCaption}>
                <div className={styles.overlayBreadcrumb}>
                  {content.pillarTitle && (
                    <>
                      <span className={styles.categoryPart}>{content.pillarTitle}</span>
                      <span className={styles.separatorPart}> / </span>
                    </>
                  )}
                  <span className={styles.titlePart}>{content.title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Value Prop ── */}
      {(content.valuePropHeadline || content.valuePropBody) && (
        <section className={styles.valueProp}>
          <div className="container">
            <div className={styles.vpGrid}>
              <div className={styles.vpLeft}>
                <h2>
                  {content.valuePropHeadline}{" "}
                  {content.valuePropAccent && <em>{content.valuePropAccent}</em>}
                </h2>
              </div>
              <div className={styles.vpRight}>
                <p>{content.valuePropBody}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 3. Workflow Section (Optional) ── */}
      {content.workflow && content.workflow.length > 0 && (
        <section className={styles.howWeHelp}>
          <div className="container">
            <div className={styles.hwHead}>
              <h2>What we do</h2>
              {content.howWeHelpSubtitle && <p>{content.howWeHelpSubtitle}</p>}
            </div>
            <div className={styles.processGrid}>
              {content.workflow.map((step: any, i: number) => (
                <div key={i} className={styles.processStep}>
                  <div className={styles.stepNumber}>{i + 1}</div>
                  <div className={styles.stepContent}>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. Problem Section ── */}
      {(content.problemHeadline || content.problemBody) && (
        <section className={styles.problemSection}>
          <div className="container">
            <div className={styles.problemCard}>
              <div className={styles.problemImageCol}>
                <img src={problemImg} alt={content.title} />
                <div className={styles.problemHighlight}>
                  <strong>{content.problemImageText || content.problemHighlight || "The Problem"}</strong>
                  <span className={styles.underlineAccent} />
                </div>
              </div>
              <div className={styles.problemContent}>
                <h3>{content.problemHeadline}</h3>
                <p>{content.problemBody}</p>
                {content.problemBullets && (
                  <ul>
                    {content.problemBullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
                  </ul>
                )}
                <Link href={content.problemCtaLink || "/contact"}>
                  <Button variant="outline">{content.problemCtaLabel || "LET'S TALK"}</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 5. How We Help ── */}
      {content.helpCards && content.helpCards.length > 0 && (
        <section className={styles.howWeHelp}>
          <div className="container">
            <div className={styles.hwHead}>
              <h2>How we help</h2>
              {content.howWeHelpSubtitle && <p>{content.howWeHelpSubtitle}</p>}
            </div>
            <div className={styles.hwGrid}>
              {content.helpCards.map((card: any, i: number) => {
                const Icon = iconMap[card.iconName] || Briefcase;
                return (
                  <div key={i} className={styles.hwCard}>
                    <div className={styles.hwIcon}>
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <h4>{card.title}</h4>
                    <p>{card.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. Feature Showcase ── */}
      {content.featureHeadline && (
        <section className={styles.featureShowcase}>
          <div className="container">
            <div className={styles.fsGrid}>
              <div className={styles.fsVisual}>
                <img src={featureImg} alt={content.title} />
                <div className={styles.fsVisualPattern} />
              </div>
              <div className={styles.fsContent}>
                {content.featureEyebrow && <span className={styles.fsEyebrow}>{content.featureEyebrow}</span>}
                <h2>{content.featureHeadline}</h2>
                <p>{content.featureBody}</p>
                {content.featureBullets && (
                  <ul>
                    {content.featureBullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
                  </ul>
                )}
                <Link href={content.featureCtaLink || "/contact"}>
                  <Button variant="outline">{content.featureCtaLabel || "Enquire about this service"}</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 7. Stats ── */}
      {content.stats && content.stats.length > 0 && (
        <section className={styles.statsSection}>
          <div className="container">
            <div className={styles.statsHead}>
              <h2>You&apos;re in good hands</h2>
            </div>
            <div className={styles.statsGrid}>
              {content.stats.map((s: any, i: number) => (
                <div key={i} className={styles.statCard}>
                  <span className={styles.statNum}>{s.num}</span>
                  <p className={styles.statDesc}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 8. Network and Reach ── */}
      {content.network && content.network.length > 0 && (
        <section className={styles.howWeHelp} style={{ backgroundColor: 'var(--color-surface-1)' }}>
          <div className="container">
            <div className={styles.hwHead}>
              <h2>{content.networkHeadline || "Our Network and Reach"}</h2>
              {content.networkSubheadline && <p>{content.networkSubheadline}</p>}
            </div>
            <div className={styles.hwGrid}>
              {content.network.map((card: any, i: number) => {
                const Icon = iconMap[card.iconName] || Globe;
                return (
                  <div key={i} className={styles.hwCard} style={{ backgroundColor: 'var(--color-white)' }}>
                    <div className={styles.hwIcon}>
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <h4>{card.title}</h4>
                    <p>{card.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 8.5 Feature Grid (Optional) ── */}
      {(content.featureGridHeadline || content.featureGridCards?.length > 0) && (
        <section className={styles.featureGridSection}>
          <div className="container">
            <div className={styles.fgHeader}>
              {content.featureGridEyebrow && <span className={styles.fgEyebrow}>{content.featureGridEyebrow}</span>}
              {content.featureGridHeadline && <h2>{content.featureGridHeadline}</h2>}
              {content.featureGridBody && <p className={styles.fgIntroBody}>{content.featureGridBody}</p>}
            </div>
            
            {content.featureGridCards && content.featureGridCards.length > 0 && (
              <div className={styles.fgGrid}>
                {content.featureGridCards.map((item: any, i: number) => {
                  const Icon = iconMap[item.iconName] || Briefcase;
                  return (
                    <div key={i} className={styles.fgCard}>
                      <div className={styles.fgIcon}>
                        <Icon size={28} strokeWidth={1.5} />
                      </div>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 9. What's Included / Engagement Outcomes ── */}
      {content.whatsIncluded && (
        <section className={styles.whatsIncluded}>
          <div className="container">
            <div className={styles.wiCard}>
              <div className={styles.wiContent}>
                <h3>{content.whatsIncludedHeadline || `What's included with GrowValley's ${content.title}`}</h3>
                {content.whatsIncludedSubtext && (
                  <p className={styles.wiSubtext}>{content.whatsIncludedSubtext}</p>
                )}
                <div className={styles.wiGrid}>
                  <ul>
                    {content.whatsIncluded.column1?.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <ul>
                    {content.whatsIncluded.column2?.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={styles.wiImage}>
                <img src={includedImg} alt={content.title} />
                <div className={styles.wiImageOverlay} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 10. CTA Banner ── */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <div className={styles.ctaInner}>
            <h2>{content.ctaHeadline || "Ready to start a conversation?"}</h2>
            <p>
              {content.ctaBody || "Our advisors are ready to discuss your specific requirements with discretion and depth."}
            </p>
            <Link href={content.ctaButtonLink || "/contact"}>
              <Button size="lg" variant="secondary">{content.ctaButtonLabel || "CONTACT US"}</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
