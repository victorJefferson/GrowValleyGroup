/**
 * Project Advisory pillar + hero + six services (pillar landing card fields).
 * Two services are created if missing: project-feasibility, project-investment-readiness.
 *
 * Run: node --env-file=.env scripts/seed-sanity-project-advisory-pillar.mjs
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

const PILLAR_ID = "pillar-consulting-project-advisory";
const OLD_PILLAR_ID = "pillar-consulting-pmo";

const blocksFromParagraphs = (paragraphs) =>
  paragraphs.map((text, i) => ({
    _type: "block",
    _key: `approach-p${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `approach-s${i}`, text, marks: [] }],
  }));

/** Pillar capability cards + matching service-consulting pillar landing fields. */
const serviceDefs = [
  {
    _id: "service-consulting-strategy-and-design",
    slug: "strategy-and-design",
    title: "PMO Strategy and Design",
    description:
      "Defining the mandate, operating model, and infrastructure before a single program runs.",
    pillarLandingTagline:
      "Defining the mandate, operating model, and infrastructure before a single program runs.",
    pillarLandingBullets: [
      "PMO mandate and scope definition",
      "PMO operating model design",
      "Governance structure and reporting hierarchy",
      "Program portfolio mapping and prioritisation",
      "PMO technology and tooling selection",
      "PMO team design and capability requirements",
    ],
    pillarLandingOutcome:
      "A PMO designed for the organisation's specific complexity, not a generic template.",
  },
  {
    _id: "service-consulting-portfolio-tracking",
    slug: "portfolio-tracking",
    title: "PROJECT TRACKING INFRASTRUCTURE",
    description:
      "Building the tracking infrastructure that gives leadership full visibility across every program in the portfolio.",
    pillarLandingTagline:
      "Building the tracking infrastructure that gives leadership full visibility across every program in the portfolio.",
    pillarLandingBullets: [
      "Portfolio-level dashboard design",
      "Project-level tracking frameworks",
      "Milestone and dependency management",
      "Resource allocation and capacity visibility",
      "Budget tracking and capital deployment reporting",
      "Interdependency management across programs",
    ],
    pillarLandingOutcome:
      "Leadership sees the full portfolio in real time, not just what program managers choose to report.",
  },
  {
    _id: "service-consulting-risk-and-issue-management",
    slug: "risk-and-issue-management",
    title: "Project Risk and Issue Management",
    description:
      "Building the frameworks that surface problems before they become delivery failures, with clear ownership from the start.",
    pillarLandingTagline:
      "Building the frameworks that surface problems before they become delivery failures, with clear ownership from the start.",
    pillarLandingBullets: [
      "Risk identification and assessment frameworks",
      "Issue logging and resolution tracking",
      "Risk escalation protocols",
      "Mitigation planning and ownership assignment",
      "Early warning indicators and trigger systems",
      "Post-program risk review and lessons captured",
    ],
    pillarLandingOutcome: "Risk managed proactively, not reactively.",
  },
  {
    _id: "service-consulting-project-feasibility",
    slug: "project-feasibility",
    title: "Project Feasibility",
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
  },
  {
    _id: "service-consulting-project-investment-readiness",
    slug: "project-investment-readiness",
    title: "Project Investment Readiness",
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
  },
  {
    _id: "service-consulting-capability-building-and-handover",
    slug: "capability-building-and-handover",
    title: "PMO Capability Building and Handover",
    description:
      "Building the internal PMO capability that sustains performance after GVA exits.",
    pillarLandingTagline:
      "Building the internal PMO capability that sustains performance after GVA exits.",
    pillarLandingBullets: [
      "Internal PMO team selection and onboarding",
      "Capability assessment and skills gap design",
      "Coaching and knowledge transfer programs",
      "Process documentation and playbook development",
      "Handover planning and transition management",
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
  { _key: "st5", number: "", label: "Delivered through Project Advisory" },
];

const heroSub =
  "Visibility. Accountability. Delivery.\n\nWe design and operate enterprise-grade project management systems that give leadership teams full visibility into delivery performance, resource accountability, and program risk across every strategic initiative in the portfolio.";

const tx = client.transaction();

tx.createOrReplace({
  _id: PILLAR_ID,
  _type: "pillar-consulting",
  title: "Project Advisory",
  slug: { _type: "slug", current: "project-advisory" },
  heroHeadline: "Project Advisory",
  heroSubheadline: heroSub,
  approachHeadline: "WHY GVA'S PROJECT ADVISORY IS DIFFERENT",
  approachBody: blocksFromParagraphs([
    "Most PMOs are built as reporting functions. They track what has already happened and surface problems after they become expensive.",
    "A GVA PMO is built as an execution system. It structures how programs run, where accountability sits, how risk surfaces early, and how leadership makes informed decisions in real time.",
    "The critical difference: GVA PMOs are built by the same advisors who designed the strategy. The PMO is not a separate function handed to a project manager after the strategy session ends. It is the execution arm of the strategy, designed by the same team that set the priorities.",
    "When strategy and execution are integrated from the start, programs deliver. When they are separated, programs drift.",
  ]),
  challengesHeadline: "THE PROJECT ADVISORY CHALLENGES WE SOLVE",
  challengesIntro: "We are typically engaged when organisations face:",
  challengesBullets: [
    "Delivery failures that surface late, when correction is already expensive",
    "Transformation programs running without structured oversight or clear accountability",
    "Leadership with no real-time visibility into program performance, risk, or resource allocation",
    "A PMO that reports on what has already happened rather than managing what is happening now",
    "Strategy and execution separated, with programs designed by one team and delivered by another with no continuity",
    "Projects approved and resourced before any structured feasibility or investment readiness assessment has been conducted",
  ],
  servicesEyebrow: "",
  servicesHeadline: "Our Project Advisory Capabilities",
  servicesSubheadline: "",
  cardGridEyebrow: "WHO WE WORK WITH",
  cardGridHeadline: "Who We Work With",
  cardGridBody:
    "We partner with organisations where complexity, ambition, and capital decisions matter. Our work is board-level, founder-level, and long-term.",
  whoWeWorkWith: [
    "Established Businesses",
    "Corporates and Enterprises",
    "Universities and Institutions",
    "Family Offices",
    "Governments and Authorities",
    "Scale-Stage Startups",
  ],
  positioningText:
    "We don't sell advice. We build systems by integrating growth, capital, and innovation with discipline and execution.",
  whoWeWorkWithCtaLabel: "Talk to Our Advisor",
  whoWeWorkWithCtaHref: "/contact",
  engagementModelsHeadline: "ENGAGEMENT MODELS",
  engagementModelsIntro:
    "Project Advisory engagements are typically structured as:",
  engagementModels: [
    "PMO strategy, design, and setup mandates",
    "Transformation program management and oversight",
    "Portfolio tracking and governance infrastructure build",
    "Project feasibility and investment readiness assessments",
    "PMO managed services and retainer-based advisory",
    "Capability building and handover programs",
  ],
  engagementOutcomesHeadline: "Engagement Outcomes",
  engagementOutcomes: [
    "Reliable delivery across complex, interdependent programs",
    "Full portfolio visibility for leadership, updated in real time",
    "Accountability embedded at every level of execution",
    "Risk surfaced and resolved before it becomes a delivery failure",
    "Capital committed to projects that are feasible and investment-ready",
    "A PMO the organisation owns, operates, and scales independently",
  ],
  nextSectionTitle: "LET'S GET STARTED.",
  nextSectionBody:
    "Build the execution discipline your strategy deserves. Start a Project Advisory conversation with GVA.",
  nextSectionCtaLabel: "Talk to Our Advisor",
  nextSectionCtaHref: "/contact",
  stats,
  ctaHeadline: "",
  ctaBody: "",
  ctaButtonLabel: "Talk to Our Advisor",
});

for (const s of serviceDefs) {
  /** Slug-based: avoids any accidental substring match on `_id`. */
  const isNew =
    s.slug === "project-feasibility" || s.slug === "project-investment-readiness";
  if (isNew) {
    tx.createOrReplace({
      _id: s._id,
      _type: "service-consulting",
      title: s.title,
      slug: { _type: "slug", current: s.slug },
      pillar: { _type: "reference", _ref: PILLAR_ID },
      description: s.description,
      pillarLandingTagline: s.pillarLandingTagline,
      pillarLandingBullets: s.pillarLandingBullets,
      pillarLandingOutcome: s.pillarLandingOutcome,
      iconName: s.iconName,
      heroHeadline: s.title,
      heroSubheadline: s.pillarLandingTagline,
      heroCtaLabel: "Talk to Our Advisor",
      heroCtaLink: "/contact",
      problemHeadline: "The Challenges We Solve",
      whatsIncludedHeadline: "Engagement Outcomes",
      ctaHeadline: "LET'S GET STARTED.",
      ctaBody:
        "Build the execution discipline your strategy deserves. Start a Project Advisory conversation with GVA.",
      ctaButtonLabel: "Talk to Our Advisor",
      ctaButtonLink: "/contact",
    });
  } else {
    tx.patch(s._id, {
      set: {
        title: s.title,
        description: s.description,
        pillar: { _type: "reference", _ref: PILLAR_ID },
        slug: { _type: "slug", current: s.slug },
        pillarLandingTagline: s.pillarLandingTagline,
        pillarLandingBullets: s.pillarLandingBullets,
        pillarLandingOutcome: s.pillarLandingOutcome,
      },
    });
  }
}

tx.createOrReplace({
  _id: "hero-consulting-project-advisory",
  _type: "hero-consulting",
  pageSlug: "project-advisory",
  eyebrow: "PROJECT ADVISORY",
  headline: "Project Advisory",
  subheadline: heroSub,
  hasCTA: true,
  ctaText: "Talk to Our Advisor",
  ctaHref: "/contact",
});

const res = await tx.commit();
console.log("Project Advisory pillar + services seed complete.");
console.log("Transaction:", res.transactionId);

const linked = await client.fetch(
  `*[_type == "service-consulting" && references($pid)] | order(title asc) { _id, title, "slug": slug.current, "pillarRef": pillar._ref }`,
  { pid: PILLAR_ID }
);
console.log(
  `Services referencing ${PILLAR_ID}: ${linked.length}`,
  linked.map((d) => `${d.slug} (${d._id})`).join(", ")
);

const oldPillarExists = await client.fetch(`count(*[_id == $id])`, { id: OLD_PILLAR_ID });
const oldHeroExists = await client.fetch(`count(*[_id == $id])`, { id: "hero-consulting-pmo" });

if (oldPillarExists > 0) {
  await client.delete(OLD_PILLAR_ID);
  console.log("Removed legacy document:", OLD_PILLAR_ID);
}
if (oldHeroExists > 0) {
  await client.delete("hero-consulting-pmo");
  console.log("Removed legacy document: hero-consulting-pmo");
}
