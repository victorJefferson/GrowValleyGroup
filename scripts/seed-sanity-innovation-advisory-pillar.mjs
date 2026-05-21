/**
 * Innovation Advisory pillar landing + six services (pillar card fields) + insights.
 * Run: node --env-file=.env scripts/seed-sanity-innovation-advisory-pillar.mjs
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

const block = (text, key = "b1") => [
  {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-s`, text, marks: [] }],
  },
];

const blocksFromParagraphs = (paragraphs) =>
  paragraphs.map((text, i) => ({
    _type: "block",
    _key: `approach-p${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `approach-s${i}`, text, marks: [] }],
  }));

const insightDefs = [
  {
    _id: "insight-consulting-innovation-cvb-scale",
    title: "Corporate Venture Building: From Idea to Scale",
    slug: "corporate-venture-building-from-idea-to-scale",
    excerpt:
      "How enterprises move from concept to governed, scalable ventures.",
  },
  {
    _id: "insight-consulting-innovation-enterprise-value",
    title: "Innovation That Delivers Enterprise Value",
    slug: "innovation-that-delivers-enterprise-value",
    excerpt: "Linking innovation programs to measurable strategic outcomes.",
  },
  {
    _id: "insight-consulting-innovation-fo-platforms",
    title: "Family Office Venture Platforms Explained",
    slug: "family-office-venture-platforms-explained",
    excerpt:
      "Structures for deploying family capital into ventures with control.",
  },
];

const serviceLanding = [
  {
    _id: "service-consulting-innovation-strategy",
    pillarLandingTagline:
      "Defining where to innovate — and executing with speed and discipline.",
    pillarLandingBullets: [
      "Industry-edge innovation strategy",
      "Venture Building Strategy",
      "AI & digital innovation programs",
      "AI Venture Studio",
      "Industry Innovation sprints",
      "Service Innovation sprints",
      "Product Innovation sprints",
    ],
    pillarLandingOutcome:
      "Clear innovation priorities translated into validated products and ventures.",
  },
  {
    _id: "service-consulting-venture-studio",
    pillarLandingTagline:
      "Building new businesses from concept to investable, scalable venture.\n\nGVC's Venture Studio takes new business concepts through validation, structuring, build, and scale — with the governance and execution discipline that serious capital demands. We build alongside you and stay accountable to the outcome.",
    pillarLandingBullets: [
      "Venture validation & business model design",
      "Legal structuring & governance frameworks",
      "Product development & go-to-market",
      "Capital raise preparation & investor engagement",
      "Turn-Key & Managed Venture Studio models",
    ],
    pillarLandingOutcome:
      "Ventures built with clear ownership, governance, and capital readiness from day one.",
  },
  {
    _id: "service-consulting-corporate-venture-studios",
    pillarLandingTagline:
      "Building new ventures backed by corporate balance sheets.",
    pillarLandingBullets: [
      "Corporate Venture Builder Strategy",
      "CVS Governance & risk frameworks",
      "Corporate Venture Building programs",
      "Corporate Venture Studios — Turn Key",
      "Corporate Venture Studios — Managed Services",
      "Corporate Venture Capital Strategy",
    ],
    pillarLandingOutcome:
      "Corporate-backed ventures built, governed, and scaled with enterprise discipline.",
  },
  {
    _id: "service-consulting-family-office-venture-studios",
    pillarLandingTagline:
      "Deploying family capital into ventures with structure and control.",
    pillarLandingBullets: [
      "Family Office Venture Builder Strategy",
      "FOVB Governance & risk frameworks",
      "Family Office Venture building programs",
      "Family Office Venture Studios — Turn Key",
      "Family Office Venture Studios — Managed Services",
      "Family Office Venture Capital Strategy",
    ],
    pillarLandingOutcome:
      "Structured venture portfolios aligned with family objectives and long-term wealth creation.",
  },
  {
    _id: "service-consulting-university-venture-studios",
    pillarLandingTagline:
      "Commercialising research and innovation emerging from academia.",
    pillarLandingBullets: [
      "University Venture Builder Strategy",
      "UVS Governance & risk frameworks",
      "University venture building programs",
      "UVS Research & IP commercialisation",
      "University Venture Studios — Turn Key",
      "University Venture Studios — Managed Services",
      "University Venture Capital Strategy",
    ],
    pillarLandingOutcome:
      "Structured pathways from academic innovation to validated, scalable ventures.",
  },
  {
    _id: "service-consulting-community-venture-studios",
    pillarLandingTagline:
      "Building ventures through ecosystems, communities, and platforms.",
    pillarLandingBullets: [
      "Community Venture Builder Strategy",
      "COMVB Governance & risk frameworks",
      "Community Venture building programs",
      "COMVB Research & IP commercialisation",
      "Community Venture Studios — Turn Key",
      "Community Venture Studios — Managed Services",
      "Community Venture Capital Strategy",
    ],
    pillarLandingOutcome:
      "Scalable venture creation through structured community-led execution.",
  },
];

const challengesBullets = [
  "Fragmented innovation efforts with no clear outcomes",
  "Internal initiatives that fail to scale",
  "High innovation risk and unclear ownership",
  "Lack of governance for new ventures",
  "Innovation disconnected from capital and strategy",
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
    tag: "Innovation Advisory",
    excerpt: ins.excerpt,
    publishedAt: new Date().toISOString(),
    content: block("Seeded for Innovation Advisory pillar landing."),
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

tx.patch("pillar-consulting-innovation-advisory", {
  unset: ["featuredInsights", "insightsHeadline", "engagementModelsIntro"],
  set: {
    heroHeadline: "Innovation Advisory",
    heroSubheadline:
      "Future. Ventures. Excellence.\n\nWe work with leadership teams to help their businesses become future-ready and industry leaders through game-changing products, ventures, and innovation programs.",
    approachHeadline: "What Makes GVC's Venture Studio Approach Different",
    approachBody: blocksFromParagraphs([
      "An accelerator selects external startups and runs a program. An incubator provides space and mentorship.",
      "A venture studio builds the business.",
      "GVC builds the venture alongside you — validating the concept, designing the structure, establishing governance, preparing for capital, and staying accountable through to scale. Every venture built through GVC is designed to last.",
    ]),
    challengesHeadline: "The Innovation Challenges We Solve",
    challengesIntro:
      "Most organisations don't struggle to generate ideas.\n\nThey struggle to convert ideas into scalable, investable businesses.\n\nWe are typically engaged when organisations face:",
    challengesBullets,
    challengesClosing:
      "Innovation Advisory addresses these challenges by replacing ad-hoc initiatives with structured venture execution models.",
    servicesEyebrow: "OUR INNOVATION ADVISORY CAPABILITIES",
    servicesHeadline: "Our Innovation Advisory Capabilities",
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
      "Innovation diagnosis",
      "Future innovation readiness",
      "Venture Studios Strategy",
      "Venture Studios — Turn Key",
      "Venture Studios — Managed Services",
      "AI Innovation Programs",
      "AI Venture Studios",
      "Innovation Sprints",
    ],
    engagementOutcomesHeadline: "Engagement Outcomes",
    engagementOutcomes: [
      "New revenue streams beyond the core business",
      "Reduced risk in new product and venture creation",
      "Faster time-to-market through structured execution",
      "Clear governance and ownership for new ventures",
      "Innovation that compounds enterprise value",
    ],
    nextSectionTitle: "Let's get started.",
    nextSectionBody:
      "Build innovation that delivers real enterprise value.\n\nStart a strategic conversation with GrowValley Group.",
    nextSectionCtaLabel: "Talk to Our Advisor",
    nextSectionCtaHref: "/contact",
    stats,
    ctaHeadline: "",
    ctaBody: "",
    ctaButtonLabel: "Talk to Our Advisor",
  },
});

tx.createOrReplace({
  _id: "hero-consulting-innovation-advisory",
  _type: "hero-consulting",
  pageSlug: "innovation-advisory",
  eyebrow: "INNOVATION ADVISORY",
  headline: "Innovation Advisory",
  subheadline:
    "Future. Ventures. Excellence.\n\nWe work with leadership teams to help their businesses become future-ready and industry leaders through game-changing products, ventures, and innovation programs.",
  hasCTA: true,
  ctaText: "Talk to Our Advisor",
  ctaHref: "/contact",
});

const res = await tx.commit();
console.log("Innovation Advisory pillar seed complete.");
console.log("Transaction:", res.transactionId);
