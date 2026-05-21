/**
 * Growth Strategy service page (`/our-capabilities/growth-strategy`) — CMS field seed.
 * Maps copy to existing ServicePageContent section order (no layout changes).
 * Run: node --env-file=.env scripts/seed-sanity-service-growth-strategy.mjs
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

const problemBullets = [
  "Growth that has plateaued without a clear explanation",
  "Leadership that cannot align on the next strategic priority",
  "An expansion, acquisition, or significant pivot under evaluation",
  "New competitive threats requiring a positioning response",
  "A board or investor asking for a structured, defensible growth case",
];

const featureBullets = [
  "Business growth strategy",
  "Acquisition growth strategy",
  "Expansion growth strategy",
  "Revenue growth strategy",
  "Competitive & positioning strategy",
  "Long-term value creation roadmap",
  "Client outcome: Strategic clarity translated into executable priorities.",
];

const tx = client.transaction();

tx.patch("service-consulting-growth-strategy", {
  unset: [
    "valuePropHeadline",
    "valuePropAccent",
    "valuePropBody",
    "featureBody",
    "featureEyebrow",
    "featureGridEyebrow",
    "featureGridCards",
    "helpCards",
    "howWeHelpSubtitle",
    "stats",
    "network",
    "networkHeadline",
    "networkSubheadline",
    "whatsIncludedSubtext",
  ],
  set: {
    heroHeadline: "Growth Strategy",
    heroSubheadline:
      "Clarity. Direction. Priorities. We define where to play, how to win, and what to prioritise — with the analytical rigour to defend the logic and the execution structure to make it real.",
    heroCtaLabel: "Talk to Our Advisor",
    heroCtaLink: "/contact",
    problemHeadline: "The Challenges We Solve",
    problemBody:
      "Most businesses have growth ambitions. Few have a structured growth strategy that connects ambition to execution, capital context, and competitive reality.\n\nWe are typically engaged when organisations face:",
    problemBullets,
    problemCtaLabel: "Talk to Our Advisor",
    problemCtaLink: "/contact",
    featureHeadline: "What We Do",
    featureBullets,
    featureCtaLabel: "Discuss Your Growth Priorities Today",
    featureCtaLink: "/contact",
    featureGridHeadline: "How We Work",
    featureGridBody:
      "We work directly with the leadership team to diagnose the current position, define the growth case, and build the strategic framework that drives decisions.\n\nOur output is not a slide deck. It is a structured strategy your leadership can execute against, your board can interrogate, and your capital partners can trust.",
    whatsIncludedHeadline: "Engagement Outcomes",
    whatsIncluded: {
      column1: [
        "Clear growth priorities aligned to vision and capital context",
        "A competitive strategy with defensible logic",
      ],
      column2: [
        "An executable roadmap with defined milestones and owners",
        "Board-ready strategic framing",
      ],
    },
    ctaHeadline: "Let's get started.",
    ctaBody: "Start a growth conversation with GrowValley Group.",
    ctaButtonLabel: "Talk to Our Advisor",
    ctaButtonLink: "/contact",
  },
});

const res = await tx.commit();
console.log("Growth Strategy service seed complete.");
console.log("Transaction:", res.transactionId);
