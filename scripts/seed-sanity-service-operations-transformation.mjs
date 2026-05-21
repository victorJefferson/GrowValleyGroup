/**
 * Operations Transformation service (`/our-capabilities/operations-transformation`) — CMS field seed.
 * Run: node --env-file=.env scripts/seed-sanity-service-operations-transformation.mjs
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
  "Inconsistent execution across teams, programs, or geographies",
  "Leadership lacking operational visibility to manage performance proactively",
  "Processes that worked at a smaller scale now creating friction and cost",
  "Growth that has outpaced operational infrastructure",
];

const featureBullets = [
  "Operations Transformation Strategy",
  "Org structure & accountability design",
  "KPI frameworks & management dashboards",
  "OKRs / scorecards / execution rhythm",
  "Process optimisation & scalability readiness",
  "Internal capability building",
  "Client outcome: A business that executes consistently and at scale.",
];

const tx = client.transaction();

tx.patch("service-consulting-operations-transformation", {
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
    heroHeadline: "Operations Transformation",
    heroSubheadline:
      "Structure. Execution. Discipline. We build the operational systems that turn strategic intent into repeatable, measurable, and accountable performance.",
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
      "We design the operational infrastructure from the first principles of your business context — not from a template library. Every framework, dashboard, and accountability model is built for the organisation it serves.",
    whatsIncludedHeadline: "Engagement Outcomes",
    whatsIncluded: {
      column1: [
        "Leadership visibility into operational performance",
        "Consistent execution rhythm across teams and geographies",
      ],
      column2: [
        "Processes scaled to match business complexity",
        "An operating model that the organisation owns and sustains",
      ],
    },
    ctaHeadline: "Let's get started.",
    ctaBody: "Start a growth conversation with GrowValley Group.",
    ctaButtonLabel: "Talk to Our Advisor",
    ctaButtonLink: "/contact",
  },
});

const res = await tx.commit();
console.log("Operations Transformation service seed complete.");
console.log("Transaction:", res.transactionId);
