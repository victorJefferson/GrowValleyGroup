/**
 * Leadership Transformation service (`/our-capabilities/leadership-transformation`) — CMS field seed.
 * Run: node --env-file=.env scripts/seed-sanity-service-leadership-transformation.mjs
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
  "A founder who is a bottleneck with no structure to distribute authority safely",
  "Leadership misaligned on priorities, direction, or accountability",
  "Preparation for institutional capital requiring board-level governance",
  "Family business dynamics affecting operational decision-making",
  "An organisation that has grown faster than its leadership model",
];

const featureBullets = [
  "Leadership Transformation Strategy",
  "Board & governance frameworks",
  "Founder-management role clarity",
  "Decision-rights & accountability models",
  "Family business governance",
  "Leadership alignment & execution cadence",
  "Client outcome: Strong governance without losing entrepreneurial momentum.",
];

const tx = client.transaction();

tx.patch("service-consulting-leadership-transformation", {
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
    heroHeadline: "Leadership Transformation",
    heroSubheadline:
      "Governance. Accountability. Alignment. We redesign leadership structures and governance models for businesses where the way decisions are made is no longer matching the scale of the organisation.",
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
      "We assess the existing governance model against the demands of the current and next growth stage. We design the structures required: decision rights, accountability frameworks, and leadership rhythms that align the organisation and protect execution speed.\n\nWe do not produce governance reports. We produce governance systems the organisation can operate.",
    whatsIncludedHeadline: "Engagement Outcomes",
    whatsIncluded: {
      column1: [
        "Clear decision rights and accountability at every tier",
        "Governance structures that enable speed, not bureaucracy",
      ],
      column2: [
        "Leadership alignment behind a shared direction",
        "Readiness for institutional capital and board scrutiny",
      ],
    },
    ctaHeadline: "Let's get started.",
    ctaBody: "Start a growth conversation with GrowValley Group.",
    ctaButtonLabel: "Talk to Our Advisor",
    ctaButtonLink: "/contact",
  },
});

const res = await tx.commit();
console.log("Leadership Transformation service seed complete.");
console.log("Transaction:", res.transactionId);
