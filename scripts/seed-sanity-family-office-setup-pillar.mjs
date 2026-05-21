/**
 * Family Office Advisory — pillar landing, hero, impact stats, and four services.
 * Pillar document `_id` remains `pillar-consulting-family-office-setup`; public slug is `family-office-advisory`.
 * Run: node --env-file=.env scripts/seed-sanity-family-office-setup-pillar.mjs
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

const PILLAR_REF = "pillar-consulting-family-office-setup";
/** Public URL segment (`/our-capabilities/...`). Pillar `_id` stays `pillar-consulting-family-office-setup`. */
const PILLAR_SLUG = "family-office-advisory";
const HERO_ID = "hero-consulting-family-office-advisory";
/** Legacy hero `_id` from when the page slug was `family-office-setup`. */
const LEGACY_HERO_IDS = ["hero-consulting-family-office-setup", "hero-consulting-family-office-advisory"];

const challengesIntro =
  "Most family offices are built reactively — after a liquidity event creates urgency or after the absence of structure has already created problems.\n\nWe are typically engaged when families face:";

const challengesBullets = [
  "Business and personal wealth not structurally separated",
  "Investment decisions made without a defined mandate or governance process",
  "Multiple family members with different expectations and no formal resolution mechanism",
  "Operational dependence on a single individual with no succession plan",
  "Reporting that is inconsistent, opaque, or entirely externally managed",
];

const challengesClosing =
  "GVA addresses these challenges before they become crises — or restructures the family office when they already have.";

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

const engagementModels = [
  "Family office strategy, mandate, and governance design",
  "Governance and investment framework design",
  "Family office restructuring and professionalisation",
  "Ongoing family office advisory retainer",
  "Next-generation preparation programs",
];

const engagementOutcomes = [
  "Disciplined portfolio strategy and deployment",
  "Clear governance and risk frameworks",
  "Alignment between family objectives and enterprise growth",
  "A family office that functions as an institution across generations",
];

const serviceDefs = [
  {
    _id: "service-consulting-governance-and-structure",
    title: "Governance & Structure",
    slug: "governance-and-structure",
    description:
      "Defining how the family office is governed, who is accountable, and how decisions are made.",
    pillarLandingTagline:
      "Defining how the family office is governed, who is accountable, and how decisions are made.",
    pillarLandingBullets: [
      "Family office strategy & mandate design",
      "Governance framework & family constitution",
      "Investment policy statement (IPS) development",
      "Family council & board structure design",
      "Succession & continuity planning frameworks",
      "Decision-rights & accountability models",
    ],
    pillarLandingOutcome:
      "A family office governed by a clear mandate, not by habit.",
    heroLead: "Mandate. Accountability. Continuity.",
  },
  {
    _id: "service-consulting-wealth-structuring",
    title: "Wealth Structuring",
    slug: "wealth-structuring",
    description:
      "Designing the holding architecture that protects, separates, and optimises family wealth.",
    pillarLandingTagline:
      "Designing the holding architecture that protects, separates, and optimises family wealth.",
    pillarLandingBullets: [
      "Wealth structuring & holding architecture",
      "Multi-jurisdiction structuring where applicable",
      "Tax-efficient vehicle design",
      "Asset protection & ring-fencing",
      "Business and personal wealth separation",
      "Regulatory and compliance structuring",
    ],
    pillarLandingOutcome:
      "Family wealth structured for protection, growth, and generational transfer.",
    heroLead: "Architecture. Protection. Clarity.",
  },
  {
    _id: "service-consulting-investment-operations",
    title: "Investment Operations",
    slug: "investment-operations",
    description:
      "Building the investment infrastructure that allows capital to be deployed with discipline.",
    pillarLandingTagline:
      "Building the investment infrastructure that allows capital to be deployed with discipline.",
    pillarLandingBullets: [
      "Investment mandate & portfolio strategy",
      "Asset allocation framework",
      "Investment committee structure & process",
      "Manager selection & due diligence framework",
      "Co-investment & direct investment protocols",
      "Performance tracking & attribution",
    ],
    pillarLandingOutcome:
      "Capital deployed with discipline, visibility, and clear accountability.",
    heroLead: "Discipline. Visibility. Accountability.",
  },
  {
    _id: "service-consulting-long-term-management",
    title: "Long-Term Management",
    slug: "long-term-management",
    description:
      "Sustaining performance, governance, and relevance across generations.",
    pillarLandingTagline:
      "Sustaining performance, governance, and relevance across generations.",
    pillarLandingBullets: [
      "Ongoing advisory & governance support",
      "Annual investment review & strategy refresh",
      "Family education & financial literacy programs",
      "Next-generation onboarding & preparation",
      "Family governance evolution as the family grows",
      "Reporting to family stakeholders",
    ],
    pillarLandingOutcome:
      "A family office that serves the family across generations, not just the current one.",
    heroLead: "Continuity. Education. Evolution.",
  },
];

function serviceDocument(def) {
  const heroSub = `${def.heroLead}\n\n${def.pillarLandingTagline}`;
  const featureGridBody = `Typical engagement models include: ${engagementModels.join("; ")}.`;

  return {
    _id: def._id,
    _type: "service-consulting",
    title: def.title,
    slug: { _type: "slug", current: def.slug },
    pillar: { _type: "reference", _ref: PILLAR_REF },
    description: def.description,
    pillarLandingTagline: def.pillarLandingTagline,
    pillarLandingBullets: def.pillarLandingBullets,
    pillarLandingOutcome: def.pillarLandingOutcome,
    heroHeadline: def.title,
    heroSubheadline: heroSub,
    heroCtaLabel: "Talk to Our Advisor",
    heroCtaLink: "/contact",
    problemHeadline: "The Challenges We Solve",
    problemBody: `${challengesIntro}`,
    problemBullets: challengesBullets,
    problemCtaLabel: "Talk to Our Advisor",
    problemCtaLink: "/contact",
    featureHeadline: def.title,
    featureBody: `Client outcome: ${def.pillarLandingOutcome}`,
    featureBullets: def.pillarLandingBullets,
    featureCtaLabel: "Talk to Our Advisor",
    featureCtaLink: "/contact",
    featureGridHeadline: "How We Work",
    featureGridBody,
    whatsIncludedHeadline: "Engagement Outcomes",
    whatsIncluded: {
      column1: engagementOutcomes.slice(0, 2),
      column2: engagementOutcomes.slice(2, 4),
    },
    ctaHeadline: "Let's get started.",
    ctaBody:
      "Build a family office that endures.\n\nStart a family office conversation with GrowValley Advisory.",
    ctaButtonLabel: "Talk to Our Advisor",
    ctaButtonLink: "/contact",
  };
}

const existingHeroIds = await client.fetch(`*[_type == "hero-consulting" && _id in $ids]._id`, {
  ids: LEGACY_HERO_IDS,
});

const tx = client.transaction();

for (const hid of existingHeroIds) {
  tx.delete(hid);
}

for (const def of serviceDefs) {
  tx.createOrReplace(serviceDocument(def));
}

tx.patch(PILLAR_REF, {
  unset: [
    "featuredInsights",
    "insightsHeadline",
    "engagementModelsIntro",
    "approachHeadline",
    "approachBody",
  ],
  set: {
    title: "Family Office Advisory",
    slug: { _type: "slug", current: PILLAR_SLUG },
    heroHeadline: "Family Office Advisory",
    heroSubheadline:
      "Structure. Governance. Generational Discipline.\n\nWe help families build the governance frameworks, investment operating models, and structural foundations that allow wealth to be managed, preserved, and grown across generations.",
    challengesHeadline: "The Challenges We Solve",
    challengesIntro,
    challengesBullets,
    challengesClosing,
    servicesEyebrow: "OUR FAMILY OFFICE ADVISORY CAPABILITIES",
    servicesHeadline: "Our Family Office Advisory Capabilities",
    servicesSubheadline: "",
    aboutUsSubtitle:
      "Structure, governance, and generational discipline — frameworks and operating models for family wealth across generations.",
    cardGridEyebrow: "WHO WE WORK WITH",
    cardGridHeadline: "Who We Work With",
    cardGridBody: "",
    whoWeWorkWith: [
      "Families approaching a liquidity event",
      "Existing family offices needing professionalisation",
      "Multi-generational families",
      "Families with operating businesses",
    ],
    positioningText:
      "We don't sell advice. We build systems by integrating growth, capital, and innovation with discipline and execution.",
    whoWeWorkWithCtaLabel: "Talk to Our Advisor",
    whoWeWorkWithCtaHref: "/contact",
    engagementModelsHeadline: "Engagement Models",
    engagementModels,
    engagementOutcomesHeadline: "Engagement Outcomes",
    engagementOutcomes,
    nextSectionTitle: "Let's get started.",
    nextSectionBody:
      "Build a family office that endures.\n\nStart a family office conversation with GrowValley Advisory.",
    nextSectionCtaLabel: "Talk to Our Advisor",
    nextSectionCtaHref: "/contact",
    stats,
    ctaHeadline: "",
    ctaBody: "",
    ctaButtonLabel: "Talk to Our Advisor",
  },
});

tx.createOrReplace({
  _id: HERO_ID,
  _type: "hero-consulting",
  pageSlug: PILLAR_SLUG,
  eyebrow: "FAMILY OFFICE ADVISORY",
  headline: "Family Office Advisory",
  subheadline:
    "Structure. Governance. Generational Discipline.\n\nWe help families build the governance frameworks, investment operating models, and structural foundations that allow wealth to be managed, preserved, and grown across generations.",
  hasCTA: true,
  ctaText: "Talk to Our Advisor",
  ctaHref: "/contact",
  trustBarText:
    "Trusted by leading governments, corporates, and innovators across the region.",
});

const res = await tx.commit();
console.log("Family Office Advisory pillar seed complete.");
console.log("Services upserted:", serviceDefs.length);
console.log("Transaction:", res.transactionId);
