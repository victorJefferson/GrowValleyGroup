/**
 * Project Feasibility service (`/our-capabilities/project-feasibility`) — full service page fields.
 * Run: node --env-file=.env scripts/seed-sanity-service-project-feasibility.mjs
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
  "Projects approved and resourced before any structured feasibility assessment has been conducted.",
  "Leadership pressure to move fast on initiatives that have not been validated against operational or financial reality.",
  "Capital committed to projects that later stall due to unresolved dependencies, scope gaps, or execution risk.",
  "No clear framework for evaluating whether a project is viable, viable with conditions, or not viable at all.",
];

const featureBullets = [
  "Project scope & objective validation",
  "Financial and commercial feasibility analysis",
  "Operational and resource feasibility assessment",
  "Risk identification and mitigation mapping",
  "Stakeholder and dependency mapping",
  "Feasibility findings report with go, conditional go, or no-go recommendation",
  "Client outcome: A clear, evidence-based feasibility position that protects capital and focuses leadership decisions on projects worth executing.",
];

const tx = client.transaction();

tx.patch("service-consulting-project-feasibility", {
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
    "featureGridHeadline",
    "featureGridBody",
  ],
  set: {
    title: "Project Feasibility",
    slug: { _type: "slug", current: "project-feasibility" },
    pillar: { _type: "reference", _ref: "pillar-consulting-project-advisory" },
    description:
      "Stress-testing the fundamentals before capital, resources, or leadership bandwidth are committed.",
    pillarLandingTagline:
      "Stress-testing the fundamentals before capital, resources, or leadership bandwidth are committed.",
    pillarLandingBullets: [
      "Project scope and objective validation",
      "Financial and commercial feasibility analysis",
      "Operational and resource feasibility assessment",
      "Risk identification and mitigation mapping",
      "Stakeholder and dependency mapping",
      "Feasibility findings report with go, conditional go, or no-go recommendation",
    ],
    pillarLandingOutcome:
      "A clear, evidence-based feasibility position that protects capital and focuses leadership decisions on projects worth executing.",
    iconName: "Search",
    heroHeadline: "Project Feasibility",
    heroSubheadline:
      "Assess. Validate. Decide.\n\nBefore committing capital, resources, or leadership bandwidth to a project, GVA stress-tests the fundamentals, so organisations move forward with confidence, not assumption.",
    heroCtaLabel: "Talk to Our Advisor",
    heroCtaLink: "/contact",
    problemHeadline: "The Challenges We Solve",
    problemBody: "We are typically engaged when organisations face:",
    problemBullets,
    problemCtaLabel: "Talk to Our Advisor",
    problemCtaLink: "/contact",
    featureHeadline: "What We Do",
    featureBullets,
    featureCtaLabel: "Discuss Your PMO Priorities Today",
    featureCtaLink: "/contact",
    whatsIncludedHeadline: "Engagement Outcomes",
    whatsIncluded: {
      column1: [
        "A structured feasibility assessment covering financial, operational, and risk dimensions.",
        "A clear go, conditional go, or no-go recommendation with supporting rationale.",
      ],
      column2: [
        "Identified risks and dependencies resolved before capital is committed.",
        "Leadership aligned on project viability before execution resources are deployed.",
      ],
    },
    ctaHeadline: "Let's get started.",
    ctaBody: "Start a PMO conversation with GrowValley Advisory.",
    ctaButtonLabel: "Talk to Our Advisor",
    ctaButtonLink: "/contact",
  },
});

const res = await tx.commit();
console.log("Project Feasibility service seed complete.");
console.log("Transaction:", res.transactionId);
