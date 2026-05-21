/**
 * Capital Structuring service (`/our-capabilities/capital-structuring`) — CMS field seed.
 * Run: node --env-file=.env scripts/seed-sanity-service-capital-structuring.mjs
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

tx.patch("service-consulting-capital-structuring", {
  unset: unsetStandard,
  set: {
    heroHeadline: "Capital Structuring",
    heroSubheadline:
      "Equity. Control. Flexibility. We design the capital architecture that serves both current growth needs and long-term ownership objectives.",
    heroCtaLabel: "Talk to Our Advisor",
    heroCtaLink: "/contact",
    problemHeadline: "The Challenges We Solve",
    problemBody: "We are typically engaged when organisations face:",
    problemBullets: [
      "An investment offer requiring structured evaluation and negotiation",
      "Founders seeking capital without losing operational control",
      "A shareholder structure that is not investor-ready",
      "Long-term exit or liquidity planning that needs to begin now",
    ],
    problemCtaLabel: "Talk to Our Advisor",
    problemCtaLink: "/contact",
    featureHeadline: "What We Do",
    featureBullets: [
      "Capital structuring strategy",
      "Equity & hybrid structuring",
      "Investment vehicles",
      "Shareholder & dilution modelling",
      "Capital control vs growth trade-offs",
      "Exit & liquidity planning",
      "Client outcome: Capital structures that balance growth, control, and flexibility.",
    ],
    featureCtaLabel: "Discuss Your Capital Priorities Today",
    featureCtaLink: "/contact",
    whatsIncludedHeadline: "Engagement Outcomes",
    whatsIncluded: {
      column1: [
        "A capital structure aligned to growth ambition, ownership control, and strategic flexibility",
        "Shareholder models designed to endure across rounds and milestones",
      ],
      column2: [
        "Exit and liquidity pathways built into the structure from the start",
        "Terms that have been evaluated, not just accepted",
      ],
    },
    ctaHeadline: "Let's get started.",
    ctaBody: "Start a capital conversation with GrowValley Group.",
    ctaButtonLabel: "Talk to Our Advisor",
    ctaButtonLink: "/contact",
  },
});

const res = await tx.commit();
console.log("Capital Structuring service seed complete.");
console.log("Transaction:", res.transactionId);
