/**
 * Mirrors Sanity single-document defaults for the homepage (`homePage-consulting`,
 * hero, impact stats, solutions). Imported by `HomeContent` as API fallbacks only.
 * Editors: source of truth is Sanity Studio after documents exist — these values
 * match `initialValue` seeds in schemas.
 */

export const ADVISOR_LABEL = "Talk to our Advisor";

/** Home hero client fallbacks — prefer `hero-consulting` (pageSlug home) in Sanity. */
export const HERO_FALLBACK_HOME = {
  eyebrow: "GrowValley Group",
  /** Used when immersion / stacked hero is off; immersion default uses `STACKED_LINES_FALLBACK_HOME`. */
  headline: "Strategy. Structure. Execution.",
  subheadline:
    "We help businesses to increase revenues, raise capital, and to become industry leaders – with discipline, structure, and an execution focus.",
  ctaText: ADVISOR_LABEL,
  ctaHref: "/contact",
  hasCTA: true,
};

/** Stats show one caption line (`label`) unless both `midLabel` and `descriptor` are set. */
export const DATA_SECTION_FALLBACK_IMPACT_STATS = [
  {
    prefix: "$",
    number: 3,
    suffix: "B+",
    midLabel: "",
    descriptor: "",
    label: "Revenues Generated through Growth Advisory",
  },
  {
    prefix: "$",
    number: 1,
    suffix: "B+",
    midLabel: "",
    descriptor: "",
    label: "Capital Structured through Capital Advisory",
  },
  {
    number: 500,
    suffix: "+",
    midLabel: "",
    descriptor: "",
    label: "Mandates Delivered through Innovation Advisory",
  },
  {
    number: 1,
    suffix: "",
    midLabel: "",
    descriptor: "",
    label: "Integrated Advisory System",
  },
];

export const HOMEPAGE_CONSULTING_INITIAL = {
  problemsEyebrow: "THE PROBLEMS WE SOLVE",
  problemsHeadline: "Most businesses don't lack ambition.",
  problemsLeadParagraph:
    "They struggle because growth, capital, and innovation are pursued in isolation, rather than as an integrated system.",
  problemsMutedLead: "As a result, organisations attempt to:",
  problemCards: [
    "Scale revenue without operational readiness",
    "Pursue capital without investment readiness",
    "Drive innovation without system readiness",
  ],
  problemsClosing:
    "This leads to stalled growth, suboptimal capital decisions, and initiatives that fail to scale.",
  bridgeStatement:
    "GrowValley exists to bridge these gaps – by integrating growth, capital, and innovation into a single, execution-led framework.",
  bridgeCtaText: ADVISOR_LABEL,
  bridgeCtaLink: "/contact",
  integratedEyebrow: "INTEGRATED ADVISORY",
  integratedBody:
    "Each advisory capability works in concert with the others, creating a unified approach to sustainable business growth.",
  missionStatement:
    "We don't sell advice. We build systems by integrating growth, capital, and innovation with discipline and execution.",
  missionCtaText: ADVISOR_LABEL,
  missionCtaLink: "/contact",
  whyGrowthHeadline: "Why GrowValley",
  whyGrowthBody:
    "GrowValley aligns growth advisory, capital advisory, and innovation advisory into one disciplined system so ambition converts into repeatable outcomes—not isolated initiatives.",
  whyGrowthEyebrow: "WHY",
  whyGrowthItalic: "Execution and performance driven, not report driven.",
  coreExcellenceEyebrow: "CORE EXCELLENCE",
  coreExcellenceBullets: [
    "Integrated advisory across growth, capital, and innovation",
    "Execution-led, not report-driven",
    "Big4 institutional standards with entrepreneurial understanding",
    "Structure before scale, discipline before acceleration",
    "Independent and conflict-free advisory",
    "Metrics driven, with measurables not vanity driven",
  ],
  whyGrowthClosingLine: "We don't chase transactions. We build businesses that attract them.",
  whyGrowthCtaText: ADVISOR_LABEL,
  whyGrowthCtaLink: "/contact",
  topExpertiseHeadline: "Top Expertise",
  topExpertiseSubhead: "Why leading businesses engage GrowValley",
  topExpertiseLead:
    "Businesses engage GrowValley at moments that matter—when portfolios are scaling, mandates are sharpening, or capital timelines compress.",
  topExpertiseBullets: [
    "Growth & investment readiness",
    "Business structuring & turnaround",
    "PMO & execution excellence",
    "Market expansion readiness",
    "Innovation & industry leadership",
    "Leadership & governance transformation",
    "Family office & portfolio management",
    "Venture building & venture creation",
  ],

  insightsCarouselTitle: "Latest from GrowValley",
  insightsCarouselDescription:
    "Perspectives on capital, investment and business performance.",

  solutionsAdvisorCtaText: ADVISOR_LABEL,
  solutionsAdvisorCtaHref: "/contact",

  finaleStatement:
    "Each engagement is tailored to the company's current stage and its next phase of growth.",
  finaleCtaText: ADVISOR_LABEL,
  finaleCtaLink: "/contact",
};

export const STACKED_LINES_FALLBACK_HOME = [
  { text: "Growth.", muted: false },
  { text: "Capital.", muted: false },
  { text: "Innovation.", muted: true },
];

export const IMPACT_BAND_EYEBROW_FALLBACK = "OUR IMPACT ON CUSTOMERS";

/** Trust rail + site-settings line (canonical marketing copy seeded in CMS). */
export const TRUST_BAR_FALLBACK =
  "Trusted by leading governments, corporates, and innovators across the region.";

/** Impact band headline / body when data-section singleton is unavailable. */
export const DATA_SECTION_FALLBACK_META = {
  headline: "Outcomes that compound.",
  description:
    "GrowValley Group integrates strategy, capital, and execution into one accountable advisory system — measured by what it builds, not what it presents.",
};

/** `solutions-consulting` intro — seeded in Sanity & used when the document is unavailable. */
export const SOLUTIONS_HUB_FALLBACK = {
  headline: "Five capabilities. One integrated system.",
  description:
    "GrowValley Advisory operates through five deeply integrated advisory capabilities — designed to work as one mandate, not five separate engagements.",
  /** Optional transition line before pillar list; leave empty to omit. */
  capabilitiesLeadIn: "",
};
