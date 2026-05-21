/**
 * PMO pillar landing + four services (pillar card fields).
 * Run: node --env-file=.env scripts/seed-sanity-pmo-pillar.mjs
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

const blocksFromParagraphs = (paragraphs) =>
  paragraphs.map((text, i) => ({
    _type: "block",
    _key: `approach-p${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `approach-s${i}`, text, marks: [] }],
  }));

const serviceLanding = [
  {
    _id: "service-consulting-strategy-and-design",
    pillarLandingTagline:
      "Defining the mandate, operating model, and infrastructure before a single program runs.",
    pillarLandingBullets: [
      "PMO mandate & scope definition",
      "PMO operating model design",
      "Governance structure & reporting hierarchy",
      "Program portfolio mapping & prioritisation",
      "PMO technology & tooling selection",
      "PMO team design & capability requirements",
    ],
    pillarLandingOutcome:
      "A PMO designed for the organisation's specific complexity, not a generic template.",
  },
  {
    _id: "service-consulting-portfolio-tracking",
    pillarLandingTagline:
      "Full visibility across the program portfolio at every tier of the organisation.",
    pillarLandingBullets: [
      "Portfolio-level dashboard design",
      "Project-level tracking frameworks",
      "Milestone & dependency management",
      "Resource allocation & capacity visibility",
      "Budget tracking & capital deployment reporting",
      "Interdependency management across programs",
    ],
    pillarLandingOutcome:
      "Leadership sees the full portfolio in real time — not just what program managers choose to report.",
  },
  {
    _id: "service-consulting-risk-and-issue-management",
    pillarLandingTagline:
      "Risk surfaced early, owned clearly, managed before it becomes a delivery failure.",
    pillarLandingBullets: [
      "Risk identification & assessment frameworks",
      "Issue logging & resolution tracking",
      "Risk escalation protocols",
      "Mitigation planning & ownership",
      "Early warning indicators & trigger systems",
      "Post-program risk review & lessons captured",
    ],
    pillarLandingOutcome: "Risk managed proactively, not reactively.",
  },
  {
    _id: "service-consulting-capability-building-and-handover",
    pillarLandingTagline:
      "Building the internal PMO capability that sustains performance after GVC exits.",
    pillarLandingBullets: [
      "Internal PMO team selection & onboarding",
      "Capability assessment & skills gap design",
      "Coaching & knowledge transfer programs",
      "Process documentation & playbook development",
      "Handover planning & transition management",
      "Post-handover advisory support",
    ],
    pillarLandingOutcome:
      "A PMO the organisation owns and can operate independently.",
  },
];

const stats = [
  { _key: "st1", number: "$3B+", label: "Revenues" },
  { _key: "st2", number: "$1B+", label: "Capital" },
  {
    _key: "st3",
    number: "500+",
    label: "Mandates Generated through Growth Advisory",
  },
  { _key: "st4", number: "", label: "Structured through Capital Advisory" },
  { _key: "st5", number: "", label: "Delivered through Innovation Advisory" },
];

const tx = client.transaction();

for (const s of serviceLanding) {
  tx.patch(s._id, {
    set: {
      pillarLandingTagline: s.pillarLandingTagline,
      pillarLandingBullets: s.pillarLandingBullets,
      pillarLandingOutcome: s.pillarLandingOutcome,
    },
  });
}

tx.patch("pillar-consulting-pmo", {
  unset: [
    "featuredInsights",
    "insightsHeadline",
    "engagementModelsIntro",
    "challengesHeadline",
    "challengesIntro",
    "challengesBullets",
    "challengesClosing",
  ],
  set: {
    heroHeadline: "Project Management Office",
    heroSubheadline:
      "Visibility. Accountability. Delivery.\n\nWe design and operate enterprise-grade PMOs that give leadership teams full visibility into delivery performance, resource accountability, and program risk across every strategic initiative in the portfolio.",
    approachHeadline: "Why a GVC PMO Is Different",
    approachBody: blocksFromParagraphs([
      "Most PMOs are built as reporting functions. They track what has already happened and surface problems after they become expensive.",
      "A GVC PMO is built as an execution system. It structures how programs run, where accountability sits, how risk surfaces early, and how leadership makes informed decisions in real time.",
      "The critical difference: GVC PMOs are built by the same advisors who designed the strategy. The PMO is not a separate function handed to a project manager after the strategy session ends. It is the execution arm of the strategy, designed by the same team that set the priorities.",
      "When strategy and execution are integrated from the start, programs deliver. When they are separated, programs drift.",
    ]),
    servicesEyebrow: "OUR PMO CAPABILITIES",
    servicesHeadline: "Our PMO Capabilities",
    servicesSubheadline: "",
    cardGridEyebrow: "WHO WE WORK WITH",
    cardGridHeadline: "Who We Work With",
    cardGridBody:
      "We partner with organisations where complexity, ambition, and capital decisions matter. Our work is board-level, founder-level, and long-term.",
    whoWeWorkWith: [
      "Established Businesses",
      "Corporates & Enterprises",
      "Universities & Institutions",
      "Family Offices",
      "Governments & Authorities",
      "Scale-Stage Startups",
    ],
    positioningText:
      "We don't sell advice. We build systems by integrating growth, capital, and innovation with discipline and execution.",
    whoWeWorkWithCtaLabel: "Talk to Our Advisor",
    whoWeWorkWithCtaHref: "/contact",
    engagementModelsHeadline: "Engagement Models",
    engagementModels: [
      "PMO design and setup",
      "PMO deployment and managed operations",
      "Interim PMO leadership",
      "PMO capability assessment and transformation",
      "Integration with existing transformation or advisory mandates",
    ],
    engagementOutcomesHeadline: "Engagement Outcomes",
    engagementOutcomes: [
      "Reliable delivery across complex, interdependent programs",
      "Transparent project-level reporting and leadership visibility",
      "Execution discipline embedded into day-to-day operations",
      "Risk surfaced and managed before it becomes a delivery failure",
      "A PMO the organisation owns and operates independently",
    ],
    nextSectionTitle: "Let's get started.",
    nextSectionBody:
      "Your transformation programs need more than a project manager. They need a system.\n\nStart a PMO conversation with GrowValley Group.",
    nextSectionCtaLabel: "Talk to Our Advisor",
    nextSectionCtaHref: "/contact",
    stats,
    ctaHeadline: "",
    ctaBody: "",
    ctaButtonLabel: "Talk to Our Advisor",
  },
});

tx.createOrReplace({
  _id: "hero-consulting-pmo",
  _type: "hero-consulting",
  pageSlug: "pmo",
  eyebrow: "PROJECT MANAGEMENT OFFICE",
  headline: "Project Management Office",
  subheadline:
    "Visibility. Accountability. Delivery.\n\nWe design and operate enterprise-grade PMOs that give leadership teams full visibility into delivery performance, resource accountability, and program risk across every strategic initiative in the portfolio.",
  hasCTA: true,
  ctaText: "Talk to Our Advisor",
  ctaHref: "/contact",
});

const res = await tx.commit();
console.log("PMO pillar seed complete.");
console.log("Transaction:", res.transactionId);
