import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { expertisePagePayload } from "./data/expertise-page-payload.mjs";
import { whoWeWorkWithPayload } from "./data/who-we-work-with-payload.mjs";
import { homepageConsultingPayload } from "./data/homepage-consulting-payload.mjs";
import { heroHomeConsultingDefaultsPayload } from "./data/home-hero-consulting-defaults-payload.mjs";
import { dataSectionConsultingDefaultsPayload } from "./data/data-section-consulting-defaults-payload.mjs";
import { solutionsConsultingDefaultsPayload } from "./data/solutions-consulting-defaults-payload.mjs";

const root = process.cwd();
const contentPath = path.join(root, "gv_consulting_content.md");
const reportPath = path.join(root, "gv_consulting_cms_placement_report.md");

if (!fs.existsSync(contentPath) || !fs.existsSync(reportPath)) {
  throw new Error("Required files missing: gv_consulting_content.md or gv_consulting_cms_placement_report.md");
}

const contentMd = fs.readFileSync(contentPath, "utf8");
const reportMd = fs.readFileSync(reportPath, "utf8");

if (!contentMd.trim() || !reportMd.trim()) {
  throw new Error("Input markdown files are empty.");
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN in environment.");
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: "2024-03-01",
});

const slugify = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

function extractSections(md) {
  const sections = [];
  const re = /##\s+\*\*PAGE\s+\d+\s*:\s*([^\n*]+)\*\*[\s\S]*?\*\*URL:\*\*\s*([^\n]+)[\s\S]*?(?=\n##\s+\*\*PAGE|\n#\s+\d|\n#\s+About Us|\n#\s+Team|\n#\s+Partner With Us|\n#\s+Careers|\n#\s+Contact|$)/g;
  let m;
  while ((m = re.exec(md))) {
    sections.push({
      title: m[1].trim(),
      url: m[2].trim(),
      body: m[0],
    });
  }
  return sections;
}

function cleanUrl(u) {
  return u
    .replace(/^https?:\/\//, "")
    .replace(/^growvalleycapital\.com/, "gv.consulting")
    .replace(/^gv\.consulting/, "")
    .replace(/^\/+/, "/");
}

const pillars = [
  { title: "Growth Advisory", slug: "growth-advisory" },
  { title: "Capital Advisory", slug: "capital-advisory" },
  { title: "Innovation Advisory", slug: "innovation-advisory" },
  { title: "PMO", slug: "pmo" },
  { title: "Family Office Advisory", slug: "family-office-advisory" },
];

const sections = extractSections(contentMd);
const servicePages = sections
  .map((s) => ({ ...s, path: cleanUrl(s.url) }))
  .filter((s) => /^\/(growth-advisory|capital-advisory|innovation-advisory|pmo|family-office-advisory)\/[^/]+$/.test(s.path));

const tx = client.transaction();

// Site settings singleton
tx.createOrReplace({
  _id: "siteSettings-consulting-main",
  _type: "siteSettings-consulting",
  title: "GrowValley Group Settings",
  trustedByLine: "Trusted by leading governments, corporates, and innovators across the region.",
  newsletterHeading: "Subscribe to our newsletter",
  newsletterPlaceholder: "Enter Email",
  newsletterSubmitLabel: "Subscribe",
  footerTagline: "Enabling businesses to reach their highest potential.",
  footerCopyright: "© 2026 GrowValley Group | A subsidiary of GrowValley Group.",
});

// Shared data section
tx.createOrReplace({
  _id: "data-section-consulting-main",
  _type: "data-section-consulting",
  ...dataSectionConsultingDefaultsPayload,
});

// Core singleton docs
tx.createOrReplace({
  _id: "homePage-consulting-main",
  _type: "homePage-consulting",
  ...homepageConsultingPayload,
});

tx.createOrReplace({
  _id: "capabilitiesPage-consulting-main",
  _type: "capabilitiesPage-consulting",
  title: "Capabilities Page Content",
  introHeading: "We operate through five deeply integrated advisory capabilities.",
  introParagraph:
    "GrowValley Group integrates growth, capital, and innovation decisions with disciplined execution and governance.",
  bottomCtaHeadline: "Talk to the team that runs the work.",
  bottomCtaButtonText: "Talk to Our Advisor",
  bottomCtaButtonLink: "/contact",
});

tx.createOrReplace({
  _id: "aboutUsPage-consulting-main",
  _type: "aboutUsPage-consulting",
  title: "About Us Page Content",
  narrativeSections: [
    {
      _key: "a1",
      eyebrow: "ABOUT GrowValley Group",
      heading: "We integrate strategy, capital, and execution into one accountable advisory system.",
      body: "GrowValley Group is the strategy and advisory arm of the GrowValley ecosystem.",
    },
    {
      _key: "a2",
      eyebrow: "BUILT FOR REAL DECISIONS",
      heading: "Built for organisations that operate at scale, complexity, and ambition.",
      body: "Every mandate is anchored in operational reality and measurable outcomes.",
    },
    {
      _key: "a3",
      eyebrow: "OUR PHILOSOPHY",
      heading: "Strategy is only useful when it can be executed.",
      body: "Capital, innovation, and governance create value only when integrated in execution.",
    },
    {
      _key: "a4",
      eyebrow: "WHO WE WORK WITH",
      heading: "We partner with organisations where the stakes are real.",
      body: "Board-level, founder-level, and long-term engagements across sectors.",
    },
    {
      _key: "a5",
      eyebrow: "THE LONG-TERM RELATIONSHIP",
      heading: "We do not work as detached consultants.",
      body: "Our engagements are structured around long-term partnership models.",
    },
  ],
  subPagesNav: [
    { _key: "n1", label: "Leadership", href: "/about-us/leadership" },
  ],
  ctaHeadline: "Most operational problems are easier to fix before they compound.",
  ctaSubline:
    "If something in your setup is not working the way it should, tell us what you are dealing with.",
  ctaButtonLabel: "Talk to Our Advisor",
  ctaButtonLink: "/contact",
});

tx.createOrReplace({
  _id: "expertisePage-consulting-main",
  _type: "expertisePage-consulting",
  ...expertisePagePayload,
});

tx.createOrReplace({
  _id: "joinUsPage-consulting-careers",
  _type: "joinUsPage-consulting",
  pageKey: "careers",
  heroEyebrow: "CAREERS",
  heroHeadline: "Solve Hard Problems. Build Real Systems. Work That Matters.",
  heroSubheadline:
    "GVC works at the intersection of strategy, capital, and execution.",
  heroCtaLabel: "View Open Roles",
  heroCtaLink: "#openings",
  pullQuote1: "What Working at GVC Looks Like",
  pullQuote2:
    "Our work is direct, demanding, and consequential. You will be in the room and accountable for outcomes.",
  whoEyebrow: "WHAT WE LOOK FOR",
  whoHeadline: "What We Look For",
  traits: [
    { _key: "t1", title: "Execution orientation", description: "You want results, not analysis theater." },
    { _key: "t2", title: "Intellectual rigour", description: "You can structure complex problems clearly." },
    { _key: "t3", title: "Ownership mentality", description: "You take responsibility for mandates." },
    { _key: "t4", title: "Commercial awareness", description: "You understand capital, margin, risk, and execution." },
  ],
  ctaEyebrow: "CURRENT OPENINGS",
  ctaHeadline: "Current Openings",
  noOpeningsFallback:
    "No openings that match your profile? Send your CV and a brief note to careers@gv.consulting.",
  ctaButtonLabel: "Apply",
  ctaButtonHref: "mailto:careers@gv.consulting",
});

// Solutions + who-we-work-with
tx.createOrReplace({
  _id: "solutions-consulting-main",
  _type: "solutions-consulting",
  ...solutionsConsultingDefaultsPayload,
});

tx.createOrReplace({
  _id: "who-we-work-with-consulting-main",
  _type: "who-we-work-with-consulting",
  ...whoWeWorkWithPayload,
});

// Partner pages
const partnerKeys = ["landing", "expert", "technology", "business", "media"];
for (const key of partnerKeys) {
  tx.createOrReplace({
    _id: `partnerPage-consulting-${key}`,
    _type: "partnerPage-consulting",
    pageKey: key,
    heroEyebrow: "PARTNER WITH US",
    heroHeadline: key === "landing" ? "Partner With Us" : `${key[0].toUpperCase()}${key.slice(1)} Partners`,
    heroAccent: "Expertise. Reach. Execution.",
    heroSubheadline:
      "GrowValley Group partners with experts, operators, platforms, and ecosystem builders.",
    heroCtaLabel: "Talk to Our Advisor",
    heroCtaLink: "/contact",
    ...(key === "landing"
      ? {
          whyHeadline: "Why Partner With GrowValley Group",
          whyBody:
            "Partnerships at GVC are structured, governed, and built for the long term.",
          whyAccessHeadline: "What partners gain access to",
          whyAccessPoints: [
            "Complex, high-impact advisory mandates.",
            "Long-term institutional relationships.",
            "Structured collaboration models.",
            "A platform built on credibility and execution discipline.",
          ],
          partnerTypes: [
            { _key: "p1", key: "expert", title: "Expert Partners", tagline: "Bringing specialist depth to complex mandates.", ctaLabel: "Join Our Expert Network", ctaLink: "/partner-with-us/expert" },
            { _key: "p2", key: "technology", title: "Technology Partners", tagline: "Powering execution through platforms, tools, and systems.", ctaLabel: "Partner as a Technology Provider", ctaLink: "/partner-with-us/technology" },
            { _key: "p3", key: "business", title: "Business Partners", tagline: "Extending GVC's reach across markets and geographies.", ctaLabel: "Explore Business Partnership", ctaLink: "/partner-with-us/business" },
            { _key: "p4", key: "media", title: "Media Partners", tagline: "Amplifying execution-led thinking across the ecosystem.", ctaLabel: "Collaborate as a Media Partner", ctaLink: "/partner-with-us/media" },
          ],
        }
      : {}),
    closingHeadline: "Let's Build Together.",
    closingBody:
      "We are looking for collaborators who bring real capability and operate with discipline.",
    closingCtaLabel: "Talk to Our Advisor",
    closingCtaLink: "/contact",
  });
}

// Heroes
const heroSlugs = [
  "home",
  "about",
  "team",
  "leadership",
  "capabilities",
  "growth-advisory",
  "capital-advisory",
  "innovation-advisory",
  "pmo",
  "family-office-advisory",
  "expertise",
  "partner-with-us",
  "careers",
  "contact",
];
for (const slug of heroSlugs) {
  const isTeam = slug === "team";
  const isHome = slug === "home";
  tx.createOrReplace({
    _id: `hero-consulting-${slug}`,
    _type: "hero-consulting",
    pageSlug: slug,
    ...(isHome
      ? heroHomeConsultingDefaultsPayload
      : {
          eyebrow: isTeam ? "OUR TEAM" : "GrowValley Group",
          headline: isTeam
            ? "The people who do the work."
            : slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          subheadline: isTeam
            ? "GrowValley is staffed by specialists. Each person owns a defined domain across formation, operations, finance, and international expansion. They work in coordination across functions, so nothing falls through the gaps between them."
            : "Talk to the team that runs the work.",
        }),
    hasCTA: slug !== "contact" && !isTeam,
    ctaText: slug !== "contact" && !isTeam ? "Talk to our Advisor" : undefined,
    ctaHref: slug !== "contact" && !isTeam ? "/contact" : undefined,
  });
}

// Team page V1 — `/about-us/team` (category `operations`; leadership page still uses `advisory` only)
const teamOperationsV1 = [
  { _id: "team-consulting-v1-01-nadia", name: "Nadia Al Rashid", role: "Strategy & Scale Readiness" },
  { _id: "team-consulting-v1-02-tariq", name: "Tariq Mansour", role: "Performance Transformation" },
  { _id: "team-consulting-v1-03-leila", name: "Leila Okonkwo", role: "PMO & Execution Governance" },
  { _id: "team-consulting-v1-04-james", name: "James Whitfield", role: "Leadership & Organizational Design" },
  { _id: "team-consulting-v1-05-kai", name: "Kai Nakamura", role: "Venture Studio Operations" },
  { _id: "team-consulting-v1-06-sven", name: "Sven Hartmann", role: "Corporate Venture Building" },
  { _id: "team-consulting-v1-07-amara", name: "Amara Diallo", role: "Family Office Advisory" },
  { _id: "team-consulting-v1-08-rohan", name: "Rohan Mehta", role: "Business Structuring & Governance" },
  { _id: "team-consulting-v1-09-sofia", name: "Sofia Andrade", role: "Transformation & Change Management" },
];
for (const m of teamOperationsV1) {
  tx.createOrReplace({
    _id: m._id,
    _type: "team-consulting",
    name: m.name,
    role: m.role,
    category: "operations",
  });
}

// Pillars
for (const p of pillars) {
  tx.createOrReplace({
    _id: `pillar-consulting-${p.slug}`,
    _type: "pillar-consulting",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    heroHeadline: p.title,
    heroSubheadline: `${p.title} capability`,
    challengesHeadline: `The ${p.title} Challenges We Solve`,
    servicesEyebrow: `OUR ${p.title.toUpperCase()} CAPABILITIES`,
    engagementModelsHeadline: "Engagement Models",
    engagementOutcomesHeadline: "Engagement Outcomes",
    ctaHeadline: "Let's get started.",
    ctaBody: "Talk to Our Advisor",
    ctaButtonLabel: "Talk to Our Advisor",
  });
}

// Service pages parsed from content
for (const s of servicePages) {
  const [, pillarSlug, serviceSlug] = s.path.match(/^\/([^/]+)\/([^/]+)$/) || [];
  if (!pillarSlug || !serviceSlug) continue;
  const title = s.title.replace(/\s+—\s+LANDING$/i, "").trim();
  tx.createOrReplace({
    _id: `service-consulting-${serviceSlug}`,
    _type: "service-consulting",
    title,
    slug: { _type: "slug", current: serviceSlug },
    pillar: { _type: "reference", _ref: `pillar-consulting-${pillarSlug}` },
    description: `${title} service`,
    heroHeadline: title,
    heroSubheadline: "Talk to Our Advisor",
    heroCtaLabel: "Talk to Our Advisor",
    heroCtaLink: "/contact",
    problemHeadline: "The Challenges We Solve",
    whatsIncludedHeadline: "Engagement Outcomes",
    ctaHeadline: "Let's get started.",
    ctaButtonLabel: "Talk to Our Advisor",
    ctaButtonLink: "/contact",
  });
}

// Legal placeholders
for (const legal of ["privacy-policy", "terms-of-use", "cookie-policy", "disclaimer"]) {
  tx.createOrReplace({
    _id: `legalPage-consulting-${legal}`,
    _type: "legalPage-consulting",
    title: legal.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    slug: { _type: "slug", current: legal },
    lastUpdated: "May 2026",
    content: [
      {
        _type: "block",
        _key: "b1",
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", _key: "s1", text: "Content to be finalized.", marks: [] }],
      },
    ],
  });
}

const res = await tx.commit();
console.log("Sanity seed completed.");
console.log("Transaction:", res.transactionId);
console.log("Parsed service pages:", servicePages.length);
