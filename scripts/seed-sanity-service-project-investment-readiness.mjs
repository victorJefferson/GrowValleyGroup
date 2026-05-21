/**
 * Project Investment Readiness service (`/our-capabilities/project-investment-readiness`) — full service page fields.
 * Run: node --env-file=.env scripts/seed-sanity-service-project-investment-readiness.mjs
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
  "Projects approved at board level that lack a credible governance or accountability structure",
  "Business cases that secured initial funding but cannot justify continued capital deployment",
  "Leadership with no clear visibility into whether projects are delivering on their investment rationale",
  "Programs where delivery drift has eroded funder and board confidence",
];

const featureBullets = [
  "Investment business case development and validation",
  "Project governance framework design",
  "Investment readiness diagnostic and gap analysis",
  "Funder and board reporting infrastructure design",
  "Milestone-based capital deployment frameworks",
  "Benefits realisation planning and investment tracking",
  "Client outcome: A project structure that earns capital commitment and sustains confidence throughout delivery.",
];

const tx = client.transaction();

tx.patch("service-consulting-project-investment-readiness", {
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
    title: "Project Investment Readiness",
    slug: { _type: "slug", current: "project-investment-readiness" },
    pillar: { _type: "reference", _ref: "pillar-consulting-project-advisory" },
    description:
      "Preparing projects and programs to be investment-ready before capital is committed.",
    pillarLandingTagline:
      "Preparing projects and programs to be investment-ready before capital is committed.",
    pillarLandingBullets: [
      "Investment business case development and validation",
      "Project governance framework design",
      "Investment readiness diagnostic and gap analysis",
      "Funder and board reporting infrastructure design",
      "Milestone-based capital deployment frameworks",
      "Benefits realisation planning and investment tracking",
    ],
    pillarLandingOutcome:
      "A project structure that earns capital commitment and sustains confidence throughout delivery.",
    iconName: "Landmark",
    heroHeadline: "Project Investment Readiness",
    heroSubheadline:
      "Structure. Governance. Capital Confidence.\n\nWe prepare projects and programs to be investment-ready before capital is committed, so boards and funders have the structure, governance, and reporting they need to stay confident throughout delivery.",
    heroCtaLabel: "Talk to Our Advisor",
    heroCtaLink: "/contact",
    problemHeadline: "The Challenges We Solve",
    problemBody: "We are typically engaged when organisations face:",
    problemBullets,
    problemCtaLabel: "Talk to Our Advisor",
    problemCtaLink: "/contact",
    featureHeadline: "What We Do",
    featureBullets,
    featureCtaLabel: "Discuss Your Project Investment Readiness Today",
    featureCtaLink: "/contact",
    whatsIncludedHeadline: "Engagement Outcomes",
    whatsIncluded: {
      column1: [
        "A business case that holds up under board and investor scrutiny",
        "Governance and accountability structures in place before capital moves",
      ],
      column2: [
        "Reporting infrastructure that sustains funder confidence throughout delivery",
        "Clear visibility into whether the project is delivering what the investment was meant to achieve",
      ],
    },
    ctaHeadline: "Let's get started.",
    ctaBody: "Start a Project Investment Readiness conversation with GrowValley Advisory.",
    ctaButtonLabel: "Talk to Our Advisor",
    ctaButtonLink: "/contact",
  },
});

const res = await tx.commit();
console.log("Project Investment Readiness service seed complete.");
console.log("Transaction:", res.transactionId);
