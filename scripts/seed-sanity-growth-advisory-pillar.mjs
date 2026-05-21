/**
 * Growth Advisory pillar landing + five services (pillar card fields) + featured insights.
 * Run: node --env-file=.env scripts/seed-sanity-growth-advisory-pillar.mjs
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
    _id: "insight-consulting-growth-readiness",
    title: "Growth Readiness for Established Businesses",
    slug: "growth-readiness-for-established-businesses",
    excerpt: "How mature operators prepare before they scale.",
  },
  {
    _id: "insight-consulting-governance-growth",
    title: "Governance as a Growth Enabler",
    slug: "governance-as-a-growth-enabler",
    excerpt: "Boards and founders aligning for durable growth.",
  },
  {
    _id: "insight-consulting-scaling-control",
    title: "Scaling Without Losing Control",
    slug: "scaling-without-losing-control",
    excerpt: "Execution systems that keep pace with ambition.",
  },
  {
    _id: "insight-consulting-turnaround-founder",
    title: "Turnaround Playbook for Founder-Led Enterprises",
    slug: "turnaround-playbook-for-founder-led-enterprises",
    excerpt: "When performance slips and leadership needs a reset.",
  },
];

const serviceLanding = [
  {
    _id: "service-consulting-growth-strategy",
    pillarLandingTagline: "Defining where to play, how to win, and what to prioritise.",
    pillarLandingBullets: [
      "Business growth strategy",
      "Acquisition growth strategy",
      "Expansion growth strategy",
      "Revenue growth strategy",
      "Competitive & positioning strategy",
      "Long-term value creation roadmap",
    ],
    pillarLandingOutcome:
      "Strategic clarity translated into executable priorities.",
  },
  {
    _id: "service-consulting-business-transformation",
    pillarLandingTagline: "Restoring performance and building operational momentum.",
    pillarLandingBullets: [
      "Business Transformation Strategy",
      "Performance diagnostics & gap analysis",
      "Business turnaround & restructuring",
      "Business modelling & remodelling",
      "Cost optimisation & margin improvement",
      "Revenue model redesign",
    ],
    pillarLandingOutcome:
      "Improved performance, profitability, and operational control.",
  },
  {
    _id: "service-consulting-leadership-transformation",
    pillarLandingTagline: "Evolving governance and leadership as businesses scale.",
    pillarLandingBullets: [
      "Leadership Transformation Strategy",
      "Board & governance frameworks",
      "Founder-management role clarity",
      "Decision-rights & accountability models",
      "Family business governance",
      "Leadership alignment & execution cadence",
    ],
    pillarLandingOutcome:
      "Strong governance without losing entrepreneurial momentum.",
  },
  {
    _id: "service-consulting-operations-transformation",
    pillarLandingTagline: "Turning strategy into repeatable, disciplined execution.",
    pillarLandingBullets: [
      "Operations Transformation Strategy",
      "Org structure & accountability design",
      "KPI frameworks & management dashboards",
      "OKRs / scorecards / execution rhythm",
      "Process optimisation & scalability readiness",
      "Internal capability building",
    ],
    pillarLandingOutcome: "A business that executes consistently at scale.",
  },
  {
    _id: "service-consulting-business-structuring",
    pillarLandingTagline: "Aligning structure with growth, control, and future capital events.",
    pillarLandingBullets: [
      "Business structuring strategy",
      "Business structuring & restructuring",
      "HoldCo & OpCo architecture",
      "JV & partnership structuring",
      "Tax-optimised group design",
      "Asset & risk ring-fencing structures",
    ],
    pillarLandingOutcome: "Scalable, investor-ready corporate architecture.",
  },
];

const challengesBullets = [
  "Fragmented strategy and unclear growth priorities",
  "Weak execution rhythm and accountability across leadership",
  "Margin pressure, cost inefficiencies, or cash stress",
  "Founder or leadership bottlenecks",
  "Governance models that no longer scale",
  "Multiple programs running with no coordinated execution oversight",
];

const stats = [
  { _key: "st1", number: "$3B+", label: "Revenues" },
  { _key: "st2", number: "$1B+", label: "Capital" },
  { _key: "st3", number: "500+", label: "Mandates generated through Growth Advisory" },
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
    tag: "Growth Advisory",
    excerpt: ins.excerpt,
    publishedAt: new Date().toISOString(),
    content: block("Seeded for Growth Advisory pillar landing."),
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

tx.patch("pillar-consulting-growth-advisory", {
  unset: ["featuredInsights", "insightsHeadline"],
  set: {
    heroHeadline: "Strategy. Performance. Governance.",
    heroSubheadline:
      "We work with leadership teams to move beyond ad-hoc growth to revenue-driven strategy, strong governance, and execution excellence.",
    challengesHeadline: "The Growth Challenges We Solve",
    challengesIntro:
      "Most established businesses do not struggle because of a lack of opportunity.\n\nThey stall when growth outpaces structure and execution.\n\nWe are typically engaged when organisations face:",
    challengesBullets,
    servicesEyebrow: "OUR GROWTH ADVISORY CAPABILITIES",
    servicesHeadline: "Our Growth Advisory Capabilities",
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
    engagementModelsIntro:
      "We work alongside leadership teams, coordinating with internal and external stakeholders to ensure execution — not just recommendations.",
    engagementModels: [
      "Board-level or leadership advisory mandates",
      "Business transformation or turnaround programs",
      "Retainer-based growth partnerships",
      "Pre-capital or pre-expansion preparation",
    ],
    engagementOutcomesHeadline: "Engagement Outcomes",
    engagementOutcomes: [
      "Clear growth priorities aligned to your vision",
      "Strong governance and leadership accountability",
      "Improved margins, cash flow, and operational control",
      "Scalable operating models that execute consistently",
      "Readiness for capital, expansion, and innovation",
    ],
    nextSectionTitle: "Let's get started.",
    nextSectionBody:
      "Strengthen the core of your business before you scale it.\n\nStart a growth conversation with GrowValley Group.",
    nextSectionCtaLabel: "Talk to Our Advisor",
    nextSectionCtaHref: "/contact",
    stats,
    ctaHeadline: "",
    ctaBody: "",
    ctaButtonLabel: "Talk to Our Advisor",
  },
});

tx.createOrReplace({
  _id: "hero-consulting-growth-advisory",
  _type: "hero-consulting",
  pageSlug: "growth-advisory",
  eyebrow: "GROWTH ADVISORY",
  headline: "Strategy. Performance. Governance.",
  subheadline:
    "We work with leadership teams to move beyond ad-hoc growth to revenue-driven strategy, strong governance, and execution excellence.",
  hasCTA: true,
  ctaText: "Talk to Our Advisor",
  ctaHref: "/contact",
});

const res = await tx.commit();
console.log("Growth Advisory pillar seed complete.");
console.log("Transaction:", res.transactionId);
