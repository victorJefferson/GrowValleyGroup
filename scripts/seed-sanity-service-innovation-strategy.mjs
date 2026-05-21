/**
 * Innovation Strategy service (`/our-capabilities/innovation-strategy`) — CMS field seed.
 * Run: node --env-file=.env scripts/seed-sanity-service-innovation-strategy.mjs
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

tx.patch("service-consulting-innovation-strategy", {
  unset: unsetStandard,
  set: {
    heroHeadline: "Innovation Strategy",
    heroSubheadline:
      "Direction. Speed. Discipline. We define innovation priorities that serve the organisation's long-term competitive position — then build the execution framework to deliver them.",
    heroCtaLabel: "Talk to Our Advisor",
    heroCtaLink: "/contact",
    problemHeadline: "The Challenges We Solve",
    problemBody: "We are typically engaged when organisations face:",
    problemBullets: [
      "Innovation spend increasing without measurable strategic impact",
      "A need to define the innovation agenda at board level",
      "A move into AI or digital ventures requiring governance and structure",
      "A competitive shift requiring an accelerated and structured innovation response",
    ],
    problemCtaLabel: "Talk to Our Advisor",
    problemCtaLink: "/contact",
    featureHeadline: "What We Do",
    featureBullets: [
      "Industry-edge innovation strategy",
      "Venture Building Strategy",
      "AI & digital innovation programs",
      "AI Venture Studio",
      "Industry Innovation sprints",
      "Service Innovation sprints",
      "Product Innovation sprints",
      "Client outcome: Clear innovation priorities translated into validated products and ventures.",
    ],
    featureCtaLabel: "Discuss Your Innovation Priorities Today",
    featureCtaLink: "/contact",
    whatsIncludedHeadline: "Engagement Outcomes",
    whatsIncluded: {
      column1: [
        "Clear innovation priorities with defined ownership and execution mandates",
        "An AI and digital innovation agenda governed and resourced for delivery",
      ],
      column2: [
        "Innovation sprints that produce validated concepts, not reports",
        "A venture building strategy aligned to the capital and growth strategy",
      ],
    },
    ctaHeadline: "Let's get started.",
    ctaBody: "Start an innovation conversation with GrowValley Group.",
    ctaButtonLabel: "Talk to Our Advisor",
    ctaButtonLink: "/contact",
  },
});

const res = await tx.commit();
console.log("Innovation Strategy service seed complete.");
console.log("Transaction:", res.transactionId);
