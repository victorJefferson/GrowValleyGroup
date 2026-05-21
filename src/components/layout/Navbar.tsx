"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import styles from "./Navbar.module.scss";
import { Button } from "../ui/Button";
import { Menu as MenuIcon, X, Mail, ArrowRight } from "lucide-react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";

import { features } from "@/config/features";

export function Navbar({ settings }: { settings?: any }) {
  const fallbackNavLinks = [
    { name: "Home", href: "/" },
    {
      name: "About",
      href: "/about-us",
      children: [
        { name: "About GrowValley Group", href: "/about-us", description: "A multi-company ecosystem operating across advisory, investments, venture building, and operational infrastructure." },
        { name: "Leadership", href: "/about-us/leadership", description: "Operators, investors, strategists, and venture builders with experience across advisory, investments, and enterprise development." },
        { name: "Team", href: "/about-us/team", description: "The people behind the GrowValley Group ecosystem." },
      ]
    },
    {
      name: "Companies",
      href: "/companies",
      children: [
        { name: "GrowValley Advisory", href: "/companies/advisory", description: "Strategic advisory, growth execution, restructuring, and transformation support." },
        { name: "GrowValley Capital", href: "/companies/capital", description: "Private equity, venture investments, private markets, and strategic acquisitions." },
        { name: "GrowValley Studios", href: "/companies/studios", description: "Startup validation, MVP development, founder support, and venture acceleration." },
        { name: "GrowValley Ventures", href: "/companies/ventures", description: "Venture building, startup ecosystems, and company creation." },
        { name: "GrowValley Works", href: "/companies/works", description: "Business setup, compliance, finance, payroll, and international expansion support." },
      ]
    },
    ...(features.insights ? [{ name: "Insights", href: "/insights" }] : []),
    {
      name: "Join",
      href: "/partner-with-us",
      children: [
        { name: "Experts", href: "/partner-with-us/experts", description: "Experienced operators, advisors, and execution partners across strategy, finance, and venture building." },
        { name: "Partners", href: "/partner-with-us/partners", description: "Strategic relationships built for long-term alignment across markets, clients, and opportunities." },
        { name: "Investors", href: "/partner-with-us/investors", description: "Capital with long-term alignment across venture opportunities, private markets, and acquisitions." },
      ]
    },
    { name: "Contact", href: "/contact" },
  ];

  const cmsNav = settings?.mainNavigation;
  const rawLinks =
    Array.isArray(cmsNav) && cmsNav.length > 0 ? cmsNav : fallbackNavLinks;
  const navLinks = features.insights
    ? rawLinks
    : rawLinks.filter((link: any) => link.href !== "/insights");
  const pathname = usePathname();

  return (
    <Disclosure as="header" className={styles.header}>
      {({ open, close }) => (
        <>
          <div className={`container ${styles.navContainer}`}>
            <div className={styles.logo}>
              <Link href="/">
                <img
                  src="/gv-logo-white.png"
                  alt="GrowValley Group Logo"
                  width="160"
                  height="60"
                  className={styles.logoImage}
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className={styles.links}>
              {navLinks.map((link: any) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                const forceSinglePage = link.href === "/contact";
                if (link.children && !forceSinglePage) {
                  return (
                    <Popover key={link.name} className={styles.popover}>
                      {({ open, close }) => (
                        <>
                          <PopoverButton
                            className={`${styles.popoverTrigger} ${isActive ? styles.active : ""} ${open ? styles.open : ""}`}
                          >
                            {link.name}
                            <ChevronDown size={14} className={styles.chevron} />
                          </PopoverButton>

                          <PopoverPanel transition className={styles.megaMenu}>
                            <div className={`container ${styles.megaMenuContent}`}>
                              {link.description ? (
                                <>
                                  {/* LEFT SIDE: Parent Title, Intro, and Overview Link */}
                                  <div className={styles.megaMenuLeft}>
                                    <div className={styles.megaMenuHeader}>
                                      <h3>{link.name}</h3>
                                      <p>{link.description}</p>
                                      <Link href={link.href} className={styles.overviewLink} onClick={() => close()} prefetch={false}>
                                        View Overview <ArrowRight size={16} />
                                      </Link>
                                    </div>
                                  </div>

                                  <div className={styles.megaMenuDivider}></div>

                                  {/* RIGHT SIDE: Sub-links Grid */}
                                  <div className={styles.megaMenuGrid}>
                                    {link.children.map((child: any) => (
                                      <Link
                                        key={child.name}
                                        href={child.href}
                                        className={styles.megaMenuItem}
                                        onClick={() => close()}
                                        prefetch={false}
                                      >
                                        <div className={`${styles.megaMenuItemLabel} ${child.isFeatured ? styles.isFeatured : ""}`}>
                                          {child.name}
                                        </div>
                                        <div className={styles.megaMenuItemDesc}>{child.description}</div>
                                      </Link>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                /* Standard Grid Layout (No Intro) */
                                <div className={`${styles.megaMenuGrid} ${styles.fullWidth}`}>
                                  {link.children.map((child: any) => (
                                    <Link
                                      key={child.name}
                                      href={child.href}
                                      className={styles.megaMenuItem}
                                      onClick={() => close()}
                                      prefetch={false}
                                    >
                                      <div className={`${styles.megaMenuItemLabel} ${child.isFeatured ? styles.isFeatured : ""}`}>
                                        {child.name}
                                      </div>
                                      <div className={styles.megaMenuItemDesc}>{child.description}</div>
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          </PopoverPanel>
                        </>
                      )}
                    </Popover>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={isActive ? styles.active : ""}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className={styles.desktopCta}>
              <Link href="/contact">
                <Button size="sm">Talk to Us</Button>
              </Link>
            </div>

            <div className={styles.mobileActions}>
              <Link href="/contact" className={styles.mobileContactBtn}>
                <Mail size={20} strokeWidth={1.5} />
              </Link>

              {/* Mobile Menu Toggle */}
              <DisclosureButton className={styles.hamburger}>
                <span className="sr-only">
                  {open ? "Close menu" : "Open menu"}
                </span>
                {open ? (
                  <X size={28} color="var(--color-primary-navy)" />
                ) : (
                  <div className={styles.vistraHamburger}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                )}
              </DisclosureButton>
            </div>
          </div>

          {/* Mobile Dropdown Nav */}
          <DisclosurePanel className={styles.mobileNav}>
            <nav className={styles.mobileLinks}>
              {navLinks.map((link: any) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                const forceSinglePage = link.href === "/contact";
                if (link.children && !forceSinglePage) {
                  return (
                    <Disclosure key={link.name} as="div" className={styles.mobileSubmenu}>
                      {({ open }) => (
                        <>
                          <DisclosureButton className={`${styles.mobileSubmenuTrigger} ${isActive ? styles.active : ""}`}>
                            {link.name}
                            <ChevronDown size={20} className={`${styles.chevron} ${open ? styles.rotate : ""}`} />
                          </DisclosureButton>
                          <DisclosurePanel className={styles.mobileSubmenuPanel}>
                            {link.children.map((child: any) => (
                              <Link key={child.name} href={child.href} onClick={() => close()}>
                                <DisclosureButton as="span" className={styles.mobileSubLink}>
                                  <div className={styles.subLinkLabel}>{child.name}</div>
                                  <div className={styles.subLinkDesc}>{child.description}</div>
                                </DisclosureButton>
                              </Link>
                            ))}
                            <Link href={link.href} onClick={() => close()}>
                              <DisclosureButton as="span" className={styles.mobileOverviewLink}>
                                {link.name} Overview <ArrowRight size={16} />
                              </DisclosureButton>
                            </Link>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  );
                }

                return (
                  <Link key={link.name} href={link.href} onClick={() => close()}>
                    <DisclosureButton
                      as="span"
                      className={isActive ? styles.active : ""}
                    >
                      {link.name}
                    </DisclosureButton>
                  </Link>
                );
              })}
            </nav>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
