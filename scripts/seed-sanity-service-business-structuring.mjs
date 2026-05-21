/**
 * Business Structuring service (`/our-capabilities/business-structuring`) — CMS field seed.
 * Run: node --env-file=.env scripts/seed-sanity-service-business-structuring.mjs
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
  "Preparation for external investment or a capital event",
  "Multiple business units or ventures needing structural separation",
  "Family wealth and business assets not clearly delineated",
  "A new JV or partnership requiring a structural framework",
  "An existing group structure that no longer reflects how the business operates",
];

const featureBullets = [
  "Business structuring strategy",
  "Business structuring & restructuring",
  "HoldCo & OpCo architecture",
  "JV & partnership structuring",
  "Tax-optimised group design",
  "Asset & risk ring-fencing structures",
  "Client outcome: Scalable, investor-ready corporate architecture.",
];

const tx = client.transaction();

tx.patch("service-consulting-business-structuring", {
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
    heroHeadline: "Business Structuring",
    heroSubheadline:
      "Architecture. Control. Readiness. We align corporate architecture with growth strategy, capital objectives, and governance requirements — building the structure that serves the next stage, not the last one.",
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
      "We work with leadership, legal, and financial advisors to design the corporate architecture that serves your growth agenda. Our recommendations are practical and capital-aware, structured to hold up under investor scrutiny and regulatory review.",
    whatsIncludedHeadline: "Engagement Outcomes",
    whatsIncluded: {
      column1: [
        "A corporate structure aligned to the growth strategy and capital objectives",
        "Clear separation between business units, ventures, and family assets",
      ],
      column2: [
        "Investor-ready architecture ahead of capital events",
        "Governance structures embedded into the corporate design",
      ],
    },
    ctaHeadline: "Let's get started.",
    ctaBody: "Start a growth conversation with GrowValley Group.",
    ctaButtonLabel: "Talk to Our Advisor",
    ctaButtonLink: "/contact",
  },
});

const res = await tx.commit();
console.log("Business Structuring service seed complete.");
console.log("Transaction:", res.transactionId);
