/**
 * Transaction Readiness service (`/our-capabilities/transaction-readiness`) — CMS field seed.
 * Run: node --env-file=.env scripts/seed-sanity-service-transaction-readiness.mjs
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

tx.patch("service-consulting-transaction-readiness", {
  unset: unsetStandard,
  set: {
    heroHeadline: "Transaction Readiness",
    heroSubheadline:
      "Prepared. Protected. Positioned. We prepare businesses for high-stakes capital events before they are inside them — reducing transaction risk and strengthening the negotiating position.",
    heroCtaLabel: "Talk to Our Advisor",
    heroCtaLink: "/contact",
    problemHeadline: "The Challenges We Solve",
    problemBody: "We are typically engaged when organisations face:",
    problemBullets: [
      "A formal M&A, PE, or exit process anticipated within 6 to 18 months",
      "Previous transaction attempts that exposed readiness gaps",
      "A sell-side process requiring tight, controlled execution",
      "A carve-out or subsidiary sale requiring structural preparation",
    ],
    problemCtaLabel: "Talk to Our Advisor",
    problemCtaLink: "/contact",
    featureHeadline: "What We Do",
    featureBullets: [
      "Transaction Readiness Strategy",
      "Pre-M&A readiness",
      "Pre-PE / strategic investment readiness",
      "Pre-exit / carve-out readiness",
      "Sell-side preparation support",
      "Coordination with legal, audit & banks",
      "Client outcome: Reduced transaction risk and a stronger negotiating position.",
    ],
    featureCtaLabel: "Discuss Your Capital Priorities Today",
    featureCtaLink: "/contact",
    whatsIncludedHeadline: "Engagement Outcomes",
    whatsIncluded: {
      column1: [
        "Full readiness before the transaction process begins",
        "A sell-side process the business controls rather than reacts to",
      ],
      column2: [
        "Diligence gaps identified and resolved before investor exposure",
        "Coordinated advisors (legal, audit, banking) working from a single strategic brief",
      ],
    },
    ctaHeadline: "Let's get started.",
    ctaBody: "Start a capital conversation with GrowValley Group.",
    ctaButtonLabel: "Talk to Our Advisor",
    ctaButtonLink: "/contact",
  },
});

const res = await tx.commit();
console.log("Transaction Readiness service seed complete.");
console.log("Transaction:", res.transactionId);
