import Link from "next/link";

import { ArrowRight } from "lucide-react";
import styles from "./Footer.module.scss";

type FooterLink = { name: string; href: string };
type FooterColumn = { columnTitle: string; links?: FooterLink[] };

function SocialLinks() {
  return (
    <div className={styles.socialLinks}>
      <Link href="#" className={styles.socialIcon} aria-label="X">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.732-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </Link>
      <Link href="#" className={styles.socialIcon} aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </Link>
      <Link href="#" className={styles.socialIcon} aria-label="YouTube">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </Link>
    </div>
  );
}

function FooterLinkList({
  links,
  className,
}: {
  links: FooterLink[];
  className?: string;
}) {
  if (links.length === 0) return null;

  return (
    <ul className={className}>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            {...(link.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}>
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

const LEGAL_LINKS: FooterLink[] = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Use", href: "/terms-of-use" },
];

function splitBalancedColumns(links: FooterLink[]): [FooterLink[], FooterLink[]] {
  const midpoint = Math.ceil(links.length / 2);
  return [links.slice(0, midpoint), links.slice(midpoint)];
}

const REACH_US_HREFS = new Set(["/join-us/careers", "/partner-with-us", "/contact"]);

const DEFAULT_COMPANY_COLUMN: FooterColumn = {
  columnTitle: "Company",
  links: [
    { name: "About", href: "/about-us" },
    { name: "Leadership", href: "/about-us/leadership" },
    { name: "Team", href: "/about-us/team" },
  ],
};

const DEFAULT_REACH_US_COLUMN: FooterColumn = {
  columnTitle: "Reach us",
  links: [
    { name: "Careers", href: "/join-us/careers" },
    { name: "Partner with us", href: "/partner-with-us" },
    { name: "Contact", href: "/contact" },
  ],
};

function isReachUsLink(link: FooterLink): boolean {
  const name = link.name.toLowerCase();
  return (
    REACH_US_HREFS.has(link.href) ||
    ["careers", "contact", "partner with us"].includes(name) ||
    name.includes("partner")
  );
}

function mergeOrderedLinks(defaults: FooterLink[], current: FooterLink[]): FooterLink[] {
  const byHref = new Map(current.map((link) => [link.href, link]));
  const merged = defaults.map((link) => byHref.get(link.href) ?? link);
  const extra = current.filter((link) => !defaults.some((d) => d.href === link.href));
  return [...merged, ...extra];
}

function partitionCompanyLinks(links: FooterLink[]): {
  companyLinks: FooterLink[];
  reachUsLinks: FooterLink[];
} {
  const reachUsLinks = links.filter(isReachUsLink);
  const companyLinks = links.filter((link) => !isReachUsLink(link));

  return {
    companyLinks,
    reachUsLinks: reachUsLinks.length > 0 ? reachUsLinks : DEFAULT_REACH_US_COLUMN.links!,
  };
}

type FooterPillar = { title?: string; slug?: string };

function buildFooterNav(
  pillars: FooterPillar[],
  cmsColumns: FooterColumn[] | undefined,
): FooterColumn[] {
  const capabilityLinks: FooterLink[] = pillars
    .filter((p) => p.title && p.slug)
    .map((p) => ({
      name: p.title as string,
      href: `/companies/${p.slug}`,
    }));

  const capabilitiesColumn: FooterColumn | null =
    capabilityLinks.length > 0
      ? { columnTitle: "Companies", links: capabilityLinks }
      : null;

  const cmsCompany = cmsColumns?.find((c) => c.columnTitle?.toLowerCase() === "company");
  const companySource = cmsCompany?.links?.length ? cmsCompany.links : DEFAULT_COMPANY_COLUMN.links!;
  const { companyLinks, reachUsLinks } = partitionCompanyLinks(companySource);

  const companyColumn: FooterColumn = {
    columnTitle: "Company",
    links: mergeOrderedLinks(DEFAULT_COMPANY_COLUMN.links!, companyLinks),
  };

  const reachUsColumn: FooterColumn = {
    columnTitle: "Reach us",
    links: mergeOrderedLinks(DEFAULT_REACH_US_COLUMN.links!, reachUsLinks),
  };

  return [companyColumn, reachUsColumn, capabilitiesColumn].filter(Boolean) as FooterColumn[];
}

function desktopNavGroupClass(columnTitle: string): string {
  const title = columnTitle.toLowerCase();
  if (title === "companies" || title === "our capabilities") return styles.desktopNavGroupCapabilities;
  if (title === "reach us") return styles.desktopNavGroupReach;
  return styles.desktopNavGroupCompany;
}

export function Footer({
  settings,
  pillars = [],
}: {
  settings?: {
    footerNavigation?: FooterColumn[];
    footerCopyright?: string;
    footerTagline?: string;
  };
  pillars?: FooterPillar[];
}) {
  const footerNav = buildFooterNav(pillars, settings?.footerNavigation);
  const footerCopyright = settings?.footerCopyright ?? "";
  const footerTagline = settings?.footerTagline ?? "";

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <Link href="/" className={styles.desktopLogo} aria-label="GrowValley Group home">
          <img
            src="/gv-logo-white.png"
            alt=""
            width="160"
            height="60"
            className={styles.logoImage}
          />
        </Link>

        <aside className={styles.brandColumn}>
          <section className={styles.brandBlock}>
            <Link href="/" className={styles.logoLink}>
              <img
                src="/gv-logo-white.png"
                alt="GrowValley Group"
                width="160"
                height="60"
                className={styles.logoImage}
              />
            </Link>

            <div className={styles.contactCallout}>
              <p className={styles.contactHeading}>Got a question?</p>
              <Link href="/contact" className={styles.enquiryLink}>
                Make an enquiry <ArrowRight size={18} className={styles.arrow} aria-hidden />
              </Link>
            </div>
          </section>

          <section className={styles.socialBlock} aria-label="Social media">
            <p className={styles.socialLabel}>Follow us on</p>
            <SocialLinks />
          </section>
        </aside>

        {footerNav.length > 0 && (
          <nav className={styles.navGrid} aria-label="Footer navigation">
            {footerNav.map((column, idx) => (
              <div
                key={`${column.columnTitle}-${idx}`}
                className={`${styles.linksCol} ${idx === 0 ? styles.linksColCapabilities : styles.linksColCompany}`}>
                <h4>{column.columnTitle}</h4>
                <FooterLinkList links={column.links ?? []} className={styles.navLinkList} />
              </div>
            ))}
          </nav>
        )}

        {footerNav.length > 0 && (
          <nav className={styles.desktopNav} aria-label="Footer navigation">
            {footerNav.map((column, idx) => {
              const links = column.links ?? [];
              const isCapabilities = column.columnTitle?.toLowerCase() === "companies" || column.columnTitle?.toLowerCase() === "our capabilities";
              const [colA, colB] = isCapabilities ? splitBalancedColumns(links) : [links, []];

              return (
                <div
                  key={`desktop-${column.columnTitle}-${idx}`}
                  className={`${styles.desktopNavGroup} ${desktopNavGroupClass(column.columnTitle)}`}>
                  <h3 className={styles.desktopNavHeading}>{column.columnTitle}</h3>
                  {isCapabilities ? (
                    <div className={styles.desktopNavColumns}>
                      <FooterLinkList links={colA} className={styles.desktopNavCol} />
                      <FooterLinkList links={colB} className={styles.desktopNavCol} />
                    </div>
                  ) : (
                    <FooterLinkList links={links} className={styles.desktopNavCol} />
                  )}
                </div>
              );
            })}
          </nav>
        )}

        <section className={styles.desktopCallout} aria-labelledby="footer-contact-heading">
          <div className={styles.desktopCalloutInner}>
            <h2 id="footer-contact-heading" className={styles.desktopCalloutHeading}>
              Got a question?
            </h2>
            {footerTagline ? <p className={styles.desktopCalloutTagline}>{footerTagline}</p> : null}
            <Link href="/contact" className={styles.desktopEnquiryLink}>
              Make an enquiry
              <ArrowRight size={16} className={styles.desktopEnquiryArrow} aria-hidden />
            </Link>
          </div>
        </section>

        <hr className={styles.sectionDivider} aria-hidden />
        <hr className={styles.desktopDivider} aria-hidden />
      </div>

      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomInner}`}>
          <p className={styles.copyright}>{footerCopyright}</p>
          <ul className={styles.legalLinks}>
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
