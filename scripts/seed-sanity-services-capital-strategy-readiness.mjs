/**
 * Capital Advisory — Capital Strategy + Investment Readiness service pages (CMS field seed).
 * Run: node --env-file=.env scripts/seed-sanity-services-capital-strategy-readiness.mjs
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

const unsetStandard = [
  "valuePropHeadline",
  "valuePropAccent",
  "valuePropBody",
  "featureBody",
  "featureEyebrow",
  "featureGridEyebrow",
  "featureGridHeadline",
  "featureGridBody",
  "featureGridCards",
  "helpCards",
  "howWeHelpSubtitle",
  "stats",
  "network",
  "networkHeadline",
  "networkSubheadline",
  "whatsIncludedSubtext",
];

const tx = client.transaction();

tx.patch("service-consulting-capital-strategy", {
  unset: unsetStandard,
  set: {
    heroHeadline: "Capital Strategy",
    heroSubheadline:
      "Path. Timing. Structure. We define the capital path that serves your business model, growth agenda, and ownership objectives — before you enter the market.",
    heroCtaLabel: "Talk to Our Advisor",
    heroCtaLink: "/contact",
    problemHeadline: "The Challenges We Solve",
    problemBody: "We are typically engaged when organisations face:",
    problemBullets: [
      "Capital considerations without a defined strategy for type, timing, or terms",
      "Multiple capital options on the table with no structured evaluation framework",
      "Inbound investor interest with no capital strategy to respond from",
      "Strategic partnership opportunities with capital implications that need structuring",
    ],
    problemCtaLabel: "Talk to Our Advisor",
    problemCtaLink: "/contact",
    featureHeadline: "What We Do",
    featureBullets: [
      "Business capital strategy",
      "Investor type mapping",
      "Capital timing & sequencing",
      "Strategic partnership vs capital analysis",
      "Co-investment & JV capital structures",
      "Capital deployment strategy",
      "Client outcome: A clear, deliberate capital strategy aligned to enterprise goals.",
    ],
    featureCtaLabel: "Discuss Your Capital Priorities Today",
    featureCtaLink: "/contact",
    whatsIncludedHeadline: "Engagement Outcomes",
    whatsIncluded: {
      column1: [
        "A capital strategy aligned to growth trajectory, governance objectives, and ownership priorities",
        "Clarity on investor type, timing, and structure before entering the market",
      ],
      column2: [
        "A framework for evaluating and responding to capital opportunities",
      ],
    },
    ctaHeadline: "Let's get started.",
    ctaBody: "Start a capital conversation with GrowValley Group.",
    ctaButtonLabel: "Talk to Our Advisor",
    ctaButtonLink: "/contact",
  },
});

tx.patch("service-consulting-investment-readiness", {
  unset: unsetStandard,
  set: {
    heroHeadline: "Investment Readiness",
    heroSubheadline:
      "Credible. Defensible. Investable. We prepare businesses to enter investor conversations from a position of strength — not urgency.",
    heroCtaLabel: "Talk to Our Advisor",
    heroCtaLink: "/contact",
    problemHeadline: "The Challenges We Solve",
    problemBody: "We are typically engaged when organisations face:",
    problemBullets: [
      "Growth ambition without formal investor preparation",
      "Investor conversations that do not convert despite strong performance",
      "Unclear valuation drivers relative to the target investor type",
      "A capital event on the 12 to 24 month horizon requiring early preparation",
    ],
    problemCtaLabel: "Talk to Our Advisor",
    problemCtaLink: "/contact",
    featureHeadline: "What We Do",
    featureBullets: [
      "Investment readiness strategy",
      "Financial modelling",
      "Business valuation & value-driver analysis",
      "Investment business case preparation",
      "Investment roadmap design",
      "Investment leadership readiness",
      "Client outcome: Investor-ready businesses with strong valuation logic.",
    ],
    featureCtaLabel: "Discuss Your Capital Priorities Today",
    featureCtaLink: "/contact",
    whatsIncludedHeadline: "Engagement Outcomes",
    whatsIncluded: {
      column1: [
        "Structured financial logic and a clear, defensible valuation case",
        "A leadership team prepared to navigate the investor process",
      ],
      column2: [
        "An investment business case that withstands institutional scrutiny",
        "A roadmap that guides the capital process from preparation to close",
      ],
    },
    ctaHeadline: "Let's get started.",
    ctaBody: "Start a capital conversation with GrowValley Group.",
    ctaButtonLabel: "Talk to Our Advisor",
    ctaButtonLink: "/contact",
  },
});

const res = await tx.commit();
console.log("Capital Strategy + Investment Readiness service seeds complete.");
console.log("Transaction:", res.transactionId);
