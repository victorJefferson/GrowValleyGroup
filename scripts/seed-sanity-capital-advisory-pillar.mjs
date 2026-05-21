/**
 * Capital Advisory pillar landing + five services (pillar card fields) + insights.
 * Run: node --env-file=.env scripts/seed-sanity-capital-advisory-pillar.mjs
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN.");
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: "2024-03-01",
});

const block = (text) => [
  {
    _type: "block",
    _key: "b1",
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: "s1", text, marks: [] }],
  },
];

const insightDefs = [
  {
    _id: "insight-consulting-capital-readiness",
    title: "Capital Readiness: What Investors Expect Before They Invest",
    slug: "capital-readiness-what-investors-expect-before-they-invest",
    excerpt:
      "How credible positioning and preparation shape investor conversations.",
  },
  {
    _id: "insight-consulting-valuation-consequence",
    title: "Valuation Is a Consequence, Not a Number",
    slug: "valuation-is-a-consequence-not-a-number",
    excerpt: "Building defensible value narratives from drivers, not spreadsheets.",
  },
  {
    _id: "insight-consulting-structuring-capital-control",
    title: "Structuring Capital for Growth Without Losing Control",
    slug: "structuring-capital-for-growth-without-losing-control",
    excerpt: "Balancing growth capital with governance and flexibility.",
  },
];

const serviceLanding = [
  {
    _id: "service-consulting-capital-strategy",
    pillarLandingTagline: "Defining the right capital path before pursuing it.",
    pillarLandingBullets: [
      "Business capital strategy",
      "Investor type mapping",
      "Capital timing & sequencing",
      "Strategic partnership vs capital analysis",
      "Co-investment & JV capital structures",
      "Capital deployment strategy",
    ],
    pillarLandingOutcome:
      "A clear, deliberate capital strategy aligned to enterprise goals.",
  },
  {
    _id: "service-consulting-investment-readiness",
    pillarLandingTagline:
      "Making the business credible, defensible, and investable.",
    pillarLandingBullets: [
      "Investment readiness strategy",
      "Financial modelling",
      "Business valuation & value-driver analysis",
      "Investment business case preparation",
      "Investment roadmap design",
      "Investment leadership readiness",
    ],
    pillarLandingOutcome:
      "Investor-ready businesses with strong valuation logic.",
  },
  {
    _id: "service-consulting-investment-materials",
    pillarLandingTagline:
      "Building institutional-grade investment infrastructure.",
    pillarLandingBullets: [
      "Investment materials strategy",
      "Data room strategy & setup",
      "Institutional-grade presentations",
      "Information Memorandums (IM)",
      "Executive investment summaries",
      "Due diligence preparation (pre-DD)",
    ],
    pillarLandingOutcome:
      "Materials that withstand investor scrutiny and diligence.",
  },
  {
    _id: "service-consulting-capital-structuring",
    pillarLandingTagline: "Designing the right structure for the right capital.",
    pillarLandingBullets: [
      "Capital structuring strategy",
      "Equity & hybrid structuring",
      "Investment vehicles",
      "Shareholder & dilution modelling",
      "Capital control vs growth trade-offs",
      "Exit & liquidity planning",
    ],
    pillarLandingOutcome:
      "Capital structures that balance growth, control, and flexibility.",
  },
  {
    _id: "service-consulting-transaction-readiness",
    pillarLandingTagline:
      "Preparing businesses for high-stakes capital events.",
    pillarLandingBullets: [
      "Transaction Readiness Strategy",
      "Pre-M&A readiness",
      "Pre-PE / strategic investment readiness",
      "Pre-exit / carve-out readiness",
      "Sell-side preparation support",
      "Coordination with legal, audit & banks",
    ],
    pillarLandingOutcome:
      "Reduced transaction risk and a stronger negotiating position.",
  },
];

const challengesBullets = [
  "Unclear capital strategy or timing",
  "Investor interest without conversion",
  "Weak valuation justification",
  "Poorly structured equity or shareholder models",
  "High transaction risk due to lack of readiness",
];

const stats = [
  { _key: "st1", number: "$3B+", label: "Revenues" },
  { _key: "st2", number: "$1B+", label: "Capital" },
  {
    _key: "st3",
    number: "500+",
    label: "Mandates Generated through Growth Advisory",
  },
  { _key: "st4", number: "", label: "Structured through Capital Advisory" },
  { _key: "st5", number: "", label: "Delivered through Innovation Advisory" },
];

const tx = client.transaction();

for (const ins of insightDefs) {
  tx.createOrReplace({
    _id: ins._id,
    _type: "insight-consulting",
    title: ins.title,
    slug: { _type: "slug", current: ins.slug },
    tag: "Capital Advisory",
    excerpt: ins.excerpt,
    publishedAt: new Date().toISOString(),
    content: block("Seeded for Capital Advisory pillar landing."),
  });
}

for (const s of serviceLanding) {
  tx.patch(s._id, {
    set: {
      pillarLandingTagline: s.pillarLandingTagline,
      pillarLandingBullets: s.pillarLandingBullets,
      pillarLandingOutcome: s.pillarLandingOutcome,
    },
  });
}

tx.patch("pillar-consulting-capital-advisory", {
  unset: ["featuredInsights", "insightsHeadline", "engagementModelsIntro"],
  set: {
    heroHeadline: "Capital Advisory",
    heroSubheadline:
      "Structure. Dataroom. Transaction.\n\nWe work with leadership teams to ensure their businesses are investment-ready, structurally sound, and transaction-prepared before capital is introduced.",
    challengesHeadline: "The Capital Challenges We Solve",
    challengesIntro:
      "Businesses rarely struggle to find capital.\n\nThey struggle to attract the right capital on the right terms.\n\nWe are typically engaged when organisations face:",
    challengesBullets,
    challengesClosing:
      "Capital Advisory addresses these challenges before capital is raised or transactions are executed.",
    servicesEyebrow: "OUR CAPITAL ADVISORY CAPABILITIES",
    servicesHeadline: "Our Capital Advisory Capabilities",
    servicesSubheadline: "",
    cardGridEyebrow: "WHO WE WORK WITH",
    cardGridHeadline: "Who We Work With",
    cardGridBody:
      "We partner with organisations where complexity, ambition, and capital decisions matter. Our work is board-level, founder-level, and long-term.",
    whoWeWorkWith: [
      "Established Businesses",
      "Corporates & Enterprises",
      "Universities & Institutions",
      "Family Offices",
      "Governments & Authorities",
      "Scale-Stage Startups",
    ],
    positioningText:
      "We don't sell advice. We build systems by integrating growth, capital, and innovation with discipline and execution.",
    whoWeWorkWithCtaLabel: "Talk to Our Advisor",
    whoWeWorkWithCtaHref: "/contact",
    engagementModelsHeadline: "Engagement Models",
    engagementModels: [
      "Capital strategy & readiness programs",
      "Capital raise advisory retainers",
      "Transaction readiness mandates",
      "Pre-investment or pre-exit preparation",
    ],
    engagementOutcomesHeadline: "Engagement Outcomes",
    engagementOutcomes: [
      "A clear capital strategy aligned with business growth plans",
      "Strong valuation defensibility and investor confidence",
      "Institutional-grade investment materials and data rooms",
      "Capital structures that balance growth, control, and flexibility",
      "Readiness for investments, partnerships, and transactions",
    ],
    nextSectionTitle: "Let's get started.",
    nextSectionBody:
      "Raise capital with clarity — not compromise.\n\nStart a capital conversation with GrowValley Group.",
    nextSectionCtaLabel: "Talk to Our Advisor",
    nextSectionCtaHref: "/contact",
    stats,
    ctaHeadline: "",
    ctaBody: "",
    ctaButtonLabel: "Talk to Our Advisor",
  },
});

tx.createOrReplace({
  _id: "hero-consulting-capital-advisory",
  _type: "hero-consulting",
  pageSlug: "capital-advisory",
  eyebrow: "CAPITAL ADVISORY",
  headline: "Capital Advisory",
  subheadline:
    "Structure. Dataroom. Transaction.\n\nWe work with leadership teams to ensure their businesses are investment-ready, structurally sound, and transaction-prepared before capital is introduced.",
  hasCTA: true,
  ctaText: "Talk to Our Advisor",
  ctaHref: "/contact",
});

const res = await tx.commit();
console.log("Capital Advisory pillar seed complete.");
console.log("Transaction:", res.transactionId);
