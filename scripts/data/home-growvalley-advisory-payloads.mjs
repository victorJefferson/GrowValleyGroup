/**
 * Homepage CMS payloads for "GrowValley Advisory" narrative.
 * Used only by scripts/seed-sanity-home-growvalley-advisory-content.mjs
 *
 * LAYOUT NOTE (no code changes): HomeContent renders sections in a fixed order
 * (Hero → Impact stats → Problems → Bridge → Solutions → …). Your brief lists
 * sections in a different narrative order; content is mapped to the nearest field
 * for each band. Solutions on the site is a vertical list of pillars, not tabbed
 * cards — each pillar’s tab “cards” are flattened into one body paragraph per pillar.
 */

export const heroHomeGrowValleyAdvisory = {
  pageSlug: "home",
  immersionMode: false,
  eyebrow: "ABOUT GROWVALLEY ADVISORY",
  headline: "We turn strategy into execution, and execution into a system.",
  subheadline:
    "GrowValley Advisory is the strategy and advisory arm of the GrowValley ecosystem. We work with founders, operators, boards, and families where ambition needs structure, and results need to be owned, not just recommended.",
  hasCTA: true,
  ctaText: "Talk to Our Advisor",
  ctaHref: "/contact",
  trustBarText: "Trusted by leading governments, corporates, and innovators across the region.",
};

export const homePageGrowValleyAdvisory = {
  title: "Home Page Content",
  problemsEyebrow: "NOT A CONSULTING FIRM",
  problemsHeadline:
    "Most advisory firms help businesses think. GrowValley Advisory is built for what comes after.",
  problemsLeadParagraph:
    "We are the strategic execution layer. The firm that designs the growth strategy and stays through the program. That structures the capital and prepares the business before the investors arrive. That builds the PMO and runs it. That sets up the family office and governs it across generations.",
  problemsMutedLead:
    "The large firms advise. They document, present, and exit. What happens next is your problem. GrowValley Advisory is built on a different premise: that the strategy is only as valuable as the execution behind it, and that accountability should not end when the deck is delivered.",
  problemCards: [
    "We are the strategic execution layer — design, stay, structure, build, govern.",
    "Strategy is only as valuable as the execution behind it.",
    "Accountability should not end when the deck is delivered.",
    "We do not produce reports. We produce results.",
  ],
  problemsClosing: "",
  bridgeStatement:
    "GrowValley Advisory is the strategy and execution partner of serious organisations. UAE-headquartered with active advisory capability across the region and beyond.",
  bridgeCtaText: "Talk to Our Advisor",
  bridgeCtaLink: "/contact",
  integratedEyebrow: "THE GVA DIFFERENCE",
  integratedBody: `Integrated, not siloed: Growth, Capital, Innovation, Project Advisory, and Family Office capabilities are designed to work together as one mandate, not five separate engagements from five separate teams.

Execution-led, not report-driven: Our work does not end when the strategy is agreed. We stay through the PMO, the transformation program, the capital process, and the governance build until outcomes are delivered.

Independent and conflict-free: We do not chase transactions. We do not earn fees on capital raised. Our only measure of success is whether our clients achieve what they came for.`,
  missionStatement: `Strategy, capital, and execution. One ecosystem.

GrowValley Advisory sits alongside two integrated arms of the GrowValley Group. Clients who require all three capabilities work across the ecosystem as a single coordinated system.`,
  missionCtaText: "Talk to Our Advisor",
  missionCtaLink: "/contact",
  whyGrowthHeadline: "What makes us different is not what we offer. It is how we operate.",
  whyGrowthBody:
    "Three principles define how we work — integration, execution, and independence — so mandates stay coherent from strategy through delivery.",
  whyGrowthEyebrow: "WHY IT MATTERS",
  whyGrowthItalic:
    "Execution-led, not report-driven: our work does not end when the strategy is agreed.",
  coreExcellenceEyebrow: "HOW WE OPERATE",
  coreExcellenceBullets: [
    "Integrated, not siloed: Growth, Capital, Innovation, Project Advisory, and Family Office capabilities are designed to work together as one mandate, not five separate engagements from five separate teams.",
    "Execution-led, not report-driven: Our work does not end when the strategy is agreed. We stay through the PMO, the transformation program, the capital process, and the governance build until outcomes are delivered.",
    "Independent and conflict-free: We do not chase transactions. We do not earn fees on capital raised. Our only measure of success is whether our clients achieve what they came for.",
  ],
  whyGrowthClosingLine:
    "Strategy without execution is just an opinion. We do both — with one point of accountability across every engagement.",
  whyGrowthCtaText: "Talk to Our Advisor",
  whyGrowthCtaLink: "/contact",
  topExpertiseHeadline: "PART OF THE GROWVALLEY ECOSYSTEM",
  topExpertiseSubhead: "Strategy, capital, and execution. One ecosystem.",
  topExpertiseLead:
    "GrowValley Advisory sits alongside two integrated arms of the GrowValley Group. Clients who require all three capabilities work across the ecosystem as a single coordinated system.",
  topExpertiseBullets: [
    "GVV: GrowValley Ventures — capital and wealth.",
    "GVA: GrowValley Advisory — strategy, advisory, and transformation.",
    "GVW: GrowValley Works — execution and operations.",
  ],
  insightsCarouselTitle: "Latest from GrowValley Advisory",
  insightsCarouselDescription:
    "Perspectives on strategy, execution, capital, and governance — where mandates meet outcomes.",
  solutionsAdvisorCtaText: "Talk to Our Advisor",
  solutionsAdvisorCtaHref: "/contact",
  finaleStatement: `Strategy without execution is just an opinion. We do both.

Tell us where you are and what you are trying to solve. We will give you a straight read on what it takes and whether we are the right firm to get you there.`,
  finaleCtaText: "Talk to Our Advisor",
  finaleCtaLink: "/contact",
};

export const dataSectionGrowValleyAdvisory = {
  eyebrow: "",
  headline: "Advisory under mandate.",
  description:
    "GrowValley Advisory is the strategy and execution partner of serious organisations. UAE-headquartered with active advisory capability across the region and beyond.",
  stats: [
    {
      _key: "gv-s1",
      prefix: "$",
      number: 3,
      suffix: "B+",
      label: "Revenues Generated through Growth Advisory",
    },
    {
      _key: "gv-s2",
      prefix: "$",
      number: 1,
      suffix: "B+",
      label: "Capital Structured through Capital Advisory",
    },
    {
      _key: "gv-s3",
      number: 500,
      suffix: "+",
      label: "Mandates Delivered across all capabilities",
    },
    {
      _key: "gv-s4",
      number: 1,
      suffix: "",
      label: "Point of Accountability across every engagement",
    },
  ],
};

function joinCards(cards) {
  return cards.map((c) => `${c.title}: ${c.desc}`).join("\n\n");
}

/** Flattened pillar copy for homepage Solutions (vertical list, not tabs). */
export const solutionsGrowValleyAdvisory = {
  headline: "Five capabilities. One integrated system.",
  description:
    "GrowValley Advisory operates through five deeply integrated advisory capabilities — designed to work as one mandate, not five separate engagements.",
  capabilitiesLeadIn: "",
  items: [
    {
      _key: "growth-advisory",
      id: "growth-advisory",
      title: "Growth Advisory",
      tagline: "Strengthening strategy, performance, governance, and execution.",
      subtitle:
        "Strengthening strategy, performance, governance, and execution. We help leadership teams move from ad-hoc growth to revenue-driven strategy, strong governance, and execution excellence.",
      body: joinCards([
        {
          title: "Growth Strategy",
          desc: "Defining where to play, how to win, and what to prioritise. Clarity translated into executable priorities.",
        },
        {
          title: "Business Transformation",
          desc: "Restoring performance and rebuilding operational momentum when margins, structure, or execution are under pressure.",
        },
        {
          title: "Leadership Transformation",
          desc: "Redesigning governance and leadership models for organisations that have grown faster than their decision-making structure.",
        },
        {
          title: "Operations Transformation",
          desc: "Building the operational systems that turn strategic intent into repeatable, measurable, accountable performance.",
        },
        {
          title: "Business Structuring",
          desc: "Aligning corporate architecture with growth strategy, capital objectives, and governance requirements.",
        },
      ]),
      howNeedsMet:
        "Growth, governance, and execution — engineered as one accountable system from strategy through delivery.",
      ctaPrompt: "Discuss Your Growth Priorities Today.",
      href: "/our-capabilities/growth-advisory",
    },
    {
      _key: "capital-advisory",
      id: "capital-advisory",
      title: "Capital Advisory",
      tagline: "Preparing businesses to attract, structure, and deploy capital intelligently.",
      subtitle:
        "Preparing businesses to attract, structure, and deploy capital intelligently — before investors arrive and while boards stay confident.",
      body: joinCards([
        {
          title: "Capital Strategy",
          desc: "Defining the right capital path, timing, and structure before pursuing it.",
        },
        {
          title: "Investment Readiness",
          desc: "Making the business credible, defensible, and investable before entering investor conversations.",
        },
        {
          title: "Investment Materials",
          desc: "Building institutional-grade data rooms, presentations, and information memorandums that hold under scrutiny.",
        },
        {
          title: "Capital Structuring",
          desc: "Designing equity structures that balance growth, control, and long-term flexibility.",
        },
        {
          title: "Transaction Readiness",
          desc: "Preparing businesses for M&A, PE, or exit processes before they are inside them.",
        },
      ]),
      howNeedsMet:
        "Capital, structure, and transaction discipline — engineered for boards, funders, and execution teams.",
      ctaPrompt: "Discuss Your Capital Priorities Today.",
      href: "/our-capabilities/capital-advisory",
    },
    {
      _key: "innovation-advisory",
      id: "innovation-advisory",
      title: "Innovation Advisory",
      tagline: "Building new growth engines through structured venture-building models.",
      subtitle:
        "Building new growth engines through structured venture-building models — from board-level innovation priorities to investable ventures.",
      body: joinCards([
        {
          title: "Innovation Strategy",
          desc: "Defining innovation priorities at board level and building the execution framework to deliver them.",
        },
        {
          title: "Venture Studio",
          desc: "Building new businesses from concept to investable, scalable venture, with governance and capital readiness from day one.",
        },
        {
          title: "Corporate Venture Studios",
          desc: "New businesses built off corporate balance sheets with enterprise discipline and structured governance.",
        },
        {
          title: "Family Office Venture Studios",
          desc: "Deploying family capital into ventures with structure, oversight, and a defined path to return.",
        },
        {
          title: "University Venture Studios",
          desc: "Creating structured pathways from research, IP, and academic talent into validated, scalable ventures.",
        },
      ]),
      howNeedsMet:
        "Venture-building, governance, and capital readiness — engineered for new engines of growth.",
      ctaPrompt: "Discuss Your Innovation Priorities Today.",
      href: "/our-capabilities/innovation-advisory",
    },
    {
      _key: "project-advisory",
      id: "project-advisory",
      title: "Project Advisory",
      tagline: "Driving execution discipline across complex transformation programs.",
      subtitle:
        "Driving execution discipline across complex transformation programs — with visibility, accountability, and delivery systems that boards can trust.",
      body: joinCards([
        {
          title: "PMO Strategy and Design",
          desc: "Defining the mandate, operating model, and governance infrastructure before a single program runs.",
        },
        {
          title: "Project Management Office",
          desc: "An execution system built by the same advisors who designed the strategy, so programs deliver rather than drift.",
        },
        {
          title: "Portfolio and Project Tracking",
          desc: "Full real-time visibility across every program in the portfolio, not just what program managers choose to surface.",
        },
        {
          title: "Project Risk Management",
          desc: "Risk surfaced early, owned clearly, and managed before it becomes a delivery failure.",
        },
        {
          title: "Project Investment Readiness",
          desc: "Preparing projects to be investment-ready before capital is committed, so boards and funders stay confident throughout delivery.",
        },
      ]),
      howNeedsMet:
        "PMO, portfolio visibility, risk, and investment readiness — engineered for programs that must deliver.",
      ctaPrompt: "Discuss Your Project Advisory Priorities Today.",
      href: "/our-capabilities/project-advisory",
    },
    {
      _key: "family-office-advisory",
      id: "family-office-advisory",
      title: "Family Office Advisory",
      tagline: "Structuring, governing, and managing family wealth for the long term.",
      subtitle:
        "Structuring, governing, and managing family wealth for the long term — before shared wealth creates the problems governance is designed to prevent.",
      body: joinCards([
        {
          title: "Governance and Structure",
          desc: "Defining how the family office is governed, who is accountable, and how decisions are made, before shared wealth creates the problems governance is designed to prevent.",
        },
        {
          title: "Wealth Structuring",
          desc: "Designing the holding architecture that protects, separates, and optimises family wealth across generations.",
        },
        {
          title: "Investment Operations",
          desc: "Building the investment infrastructure that allows family capital to be deployed with discipline and tracked with clarity.",
        },
        {
          title: "Long-Term Management",
          desc: "The ongoing advisory support that keeps governance current, performance accountable, and the next generation prepared.",
        },
      ]),
      howNeedsMet:
        "Governance, structure, and investment operations — engineered for multi-generational wealth.",
      ctaPrompt: "Discuss Family Office Advisory Today.",
      href: "/our-capabilities/family-office-advisory",
    },
  ],
};

export const whoWeWorkWithGrowValleyAdvisory = {
  headline: "We work with organisations where the stakes are real.",
  description:
    "Our clients are not figuring out where to start. They have built something, they are operating at a level where complexity compounds, and they need a partner who can hold that complexity with them and remain accountable to outcomes.",
  categories: [
    {
      _key: "w1",
      title: "Established Businesses",
      description:
        "Preparing for the next phase of growth, where scale requires stronger strategy, governance, and execution than what got them here.",
      iconName: "Briefcase",
    },
    {
      _key: "w2",
      title: "Corporates and Enterprises",
      description:
        "Navigating transformation, capital structuring, and new venture creation at institutional scale.",
      iconName: "Building2",
    },
    {
      _key: "w3",
      title: "Family Offices",
      description:
        "Deploying capital responsibly while preserving control, governance, and long-term multi-generational value.",
      iconName: "Users",
    },
    {
      _key: "w4",
      title: "Governments and Authorities",
      description:
        "Driving innovation, economic development, and structured institutional growth programs.",
      iconName: "Landmark",
    },
    {
      _key: "w5",
      title: "Universities and Institutions",
      description:
        "Converting research, talent, and ideas into real commercial and venture value.",
      iconName: "GraduationCap",
    },
    {
      _key: "w6",
      title: "Scale-Stage Startups",
      description:
        "Where capital readiness, governance, and operational structure now matter as much as product-market fit.",
      iconName: "TrendingUp",
    },
  ],
};
