/**
 * `hero-consulting` doc for homepage — matches `HERO_FALLBACK_HOME`, stacked lines & trust rail fallbacks.
 * (_id supplied in seed.)
 */
export const heroHomeConsultingDefaultsPayload = {
  pageSlug: "home",
  immersionMode: true,
  eyebrow: "GrowValley Group",
  headline: "Strategy. Structure. Execution.",
  subheadline:
    "We help businesses to increase revenues, raise capital, and to become industry leaders – with discipline, structure, and an execution focus.",
  hasCTA: true,
  ctaText: "Talk to our Advisor",
  ctaHref: "/contact",
  stackedLines: [
    { _key: "sl1", text: "Growth.", muted: false },
    { _key: "sl2", text: "Capital.", muted: false },
    { _key: "sl3", text: "Innovation.", muted: true },
  ],
  trustBarText: "Trusted by leading governments, corporates, and innovators across the region.",
};
