/**
 * Investment Materials service (`/our-capabilities/investment-materials`) — CMS field seed.
 * Run: node --env-file=.env scripts/seed-sanity-service-investment-materials.mjs
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

tx.patch("service-consulting-investment-materials", {
  unset: unsetStandard,
  set: {
    heroHeadline: "Investment Materials",
    heroSubheadline:
      "Institutional. Defensible. Diligence-Ready. We build investment materials that reflect the quality of the business and hold up under institutional review.",
    heroCtaLabel: "Talk to Our Advisor",
    heroCtaLink: "/contact",
    problemHeadline: "The Challenges We Solve",
    problemBody: "We are typically engaged when organisations face:",
    problemBullets: [
      "Formal investor conversations requiring professional-grade materials",
      "Existing materials that have not performed under scrutiny",
      "A data room needing structure for PE, M&A, or strategic investor processes",
      "A due diligence process requiring front-loaded preparation",
    ],
    problemCtaLabel: "Talk to Our Advisor",
    problemCtaLink: "/contact",
    featureHeadline: "What We Do",
    featureBullets: [
      "Investment materials strategy",
      "Data room strategy & setup",
      "Institutional-grade investor presentations",
      "Information Memorandums (IM)",
      "Executive investment summaries",
      "Due diligence preparation (pre-DD)",
      "Client outcome: Materials that withstand investor scrutiny and diligence.",
    ],
    featureCtaLabel: "Discuss Your Capital Priorities Today",
    featureCtaLink: "/contact",
    whatsIncludedHeadline: "Engagement Outcomes",
    whatsIncluded: {
      column1: [
        "Materials that communicate value compellingly and hold under institutional scrutiny",
        "A data room structured for investor navigation and due diligence",
      ],
      column2: [
        "Pre-DD preparation that reduces friction and accelerates the process",
        "Consistent narrative across all investment documents",
      ],
    },
    ctaHeadline: "Let's get started.",
    ctaBody: "Start a capital conversation with GrowValley Group.",
    ctaButtonLabel: "Talk to Our Advisor",
    ctaButtonLink: "/contact",
  },
});

const res = await tx.commit();
console.log("Investment Materials service seed complete.");
console.log("Transaction:", res.transactionId);
