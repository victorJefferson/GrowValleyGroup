/**
 * Business Transformation service (`/our-capabilities/business-transformation`) — CMS field seed.
 * Run: node --env-file=.env scripts/seed-sanity-service-business-transformation.mjs
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
  "Margins under sustained pressure with no clear resolution path",
  "Revenue growth without corresponding profitability improvement",
  "A previous transformation program that did not deliver",
  "Revenue model assumptions that no longer hold",
  "A turnaround moment requiring external structure and accountability",
];

const featureBullets = [
  "Business Transformation Strategy",
  "Performance diagnostics & gap analysis",
  "Business turnaround & restructuring",
  "Business modelling & remodelling",
  "Cost optimisation & margin improvement",
  "Revenue model redesign",
  "Client outcome: Improved performance, profitability, and operational control.",
];

const tx = client.transaction();

tx.patch("service-consulting-business-transformation", {
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
    heroHeadline: "Business Transformation",
    heroSubheadline:
      "Diagnose. Redesign. Perform. We restore performance and rebuild operational momentum for businesses that need to reposition, restructure, or recover.",
    heroCtaLabel: "Talk to Our Advisor",
    heroCtaLink: "/contact",
    problemHeadline: "The Challenges We Solve",
    problemBody: "We are typically engaged when organisations face:",
    problemBullets,
    problemCtaLabel: "Talk to Our Advisor",
    problemCtaLink: "/contact",
    featureHeadline: "What We Do",
    featureBullets,
    featureCtaLabel: "Discuss Your Growth Priorities Today",
    featureCtaLink: "/contact",
    featureGridHeadline: "How We Work",
    featureGridBody:
      "We begin with a structured performance diagnostic: where value is leaking, where the model is misaligned, what structural changes are required. We then design and execute the transformation program alongside the leadership team, with measurable milestones and accountability built in from day one.",
    whatsIncludedHeadline: "Engagement Outcomes",
    whatsIncluded: {
      column1: [
        "Restored performance and profitability",
        "Operational control the business owns and sustains",
      ],
      column2: [
        "A redesigned business model aligned to current market conditions",
        "Clear turnaround milestones with accountable owners",
      ],
    },
    ctaHeadline: "Let's get started.",
    ctaBody: "Start a growth conversation with GrowValley Group.",
    ctaButtonLabel: "Talk to Our Advisor",
    ctaButtonLink: "/contact",
  },
});

const res = await tx.commit();
console.log("Business Transformation service seed complete.");
console.log("Transaction:", res.transactionId);
