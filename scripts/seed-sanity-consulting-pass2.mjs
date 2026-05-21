import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const root = process.cwd();
const contentPath = path.join(root, "gv_consulting_content.md");
const contentMd = fs.readFileSync(contentPath, "utf8");

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

const slugify = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const blockToText = (s) =>
  [
    {
      _type: "block",
      _key: "b1",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "s1", text: s?.trim() || "", marks: [] }],
    },
  ];

function splitPages(md) {
  const pages = [];
  const re =
    /##\s+\*\*PAGE\s+\d+\s*:\s*([^\n*]+)\*\*[\s\S]*?\*\*URL:\*\*\s*([^\n]+)\s*([\s\S]*?)(?=\n##\s+\*\*PAGE|\n#\s+\d|\n#\s+About Us|\n#\s+Team|\n#\s+Partner With Us|\n#\s+Careers|\n#\s+Contact|$)/g;
  let m;
  while ((m = re.exec(md))) {
    pages.push({
      title: m[1].trim(),
      url: m[2].trim(),
      body: m[3].trim(),
    });
  }
  return pages;
}

function cleanPath(url) {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^growvalleycapital\.com/, "gv.consulting")
    .replace(/^gv\.consulting/, "")
    .replace(/^\/+/, "/");
}

function between(text, startLabel, endLabels = []) {
  const start = text.indexOf(startLabel);
  if (start === -1) return "";
  let from = start + startLabel.length;
  let to = text.length;
  for (const end of endLabels) {
    const idx = text.indexOf(end, from);
    if (idx !== -1 && idx < to) to = idx;
  }
  return text.slice(from, to).trim();
}

function lines(text) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function bulletLines(text) {
  return lines(text)
    .filter((l) => l.startsWith("*"))
    .map((l) => l.replace(/^\*\s*/, "").trim());
}

function parseHero(body) {
  const heroChunk = between(body, "**\\[HERO\\]**", ["---", "**The", "**\\[IMPACT", "**[HERO]"]);
  const ls = lines(heroChunk).filter((l) => !/Talk to Our Advisor/i.test(l) && !/Trusted by/i.test(l));
  return {
    headline: ls[0] || "",
    subheadline: ls.slice(1).join(" ").trim(),
  };
}

function parseServiceContent(body) {
  const challengesChunk = between(body, "**The Challenges We Solve**", ["---", "**What We Do**", "**How We Work**"]);
  const whatWeDoChunk = between(body, "**What We Do**", ["---", "**How We Work**", "**Engagement Outcomes**"]);
  const howWeWorkChunk = between(body, "**How We Work**", ["---", "**Engagement Outcomes**", "**Let's get started.**"]);
  const outcomesChunk = between(body, "**Engagement Outcomes**", ["---", "**Let's get started.**"]);
  const closingChunk = between(body, "**Let's get started.**", ["# ", "## "]);

  const challengeBullets = bulletLines(challengesChunk);
  const whatBullets = bulletLines(whatWeDoChunk);
  const outcomeBullets = bulletLines(outcomesChunk);

  return {
    problemBody: lines(challengesChunk)
      .filter((l) => !l.startsWith("*"))
      .join(" ")
      .trim(),
    problemBullets: challengeBullets,
    featureBullets: whatBullets,
    valuePropBody: lines(howWeWorkChunk).join(" "),
    outcomes: outcomeBullets,
    closing: lines(closingChunk).join(" "),
  };
}

function parsePillarLanding(body) {
  const challenges = between(body, "Challenges We Solve**", ["---", "**Our", "**Who We Work With**"]);
  const who = between(body, "**Who We Work With**", ["---", "**Engagement Models**", "**Engagement Outcomes**"]);
  const engagementModels = between(body, "**Engagement Models**", ["---", "**Engagement Outcomes**"]);
  const engagementOutcomes = between(body, "**Engagement Outcomes**", ["---", "**Insights**", "**Let's get started.**"]);
  const insights = between(body, "**Insights**", ["---", "**Let's get started.**"]);
  const closing = between(body, "**Let's get started.**", ["# ", "## "]);

  return {
    challengesBullets: bulletLines(challenges),
    cardGridBody: lines(who).filter((l) => !l.startsWith("*")).join(" "),
    engagementModelsBullets: bulletLines(engagementModels),
    engagementModelsIntro: lines(engagementModels).filter((l) => !l.startsWith("*")).join(" "),
    engagementOutcomesBullets: bulletLines(engagementOutcomes),
    insightTitles: bulletLines(insights),
    closing: lines(closing).join(" "),
  };
}

const pages = splitPages(contentMd).map((p) => ({ ...p, path: cleanPath(p.url) }));
const tx = client.transaction();

const pillarSlugSet = new Set([
  "/growth-advisory",
  "/capital-advisory",
  "/innovation-advisory",
  "/pmo",
  "/family-office-setup",
]);

const pillarPages = pages.filter((p) => pillarSlugSet.has(p.path));
const servicePages = pages.filter((p) => /^\/(growth-advisory|capital-advisory|innovation-advisory|pmo|family-office-setup)\/[^/]+$/.test(p.path));

for (const p of pillarPages) {
  const slug = p.path.slice(1);
  const hero = parseHero(p.body);
  const parsed = parsePillarLanding(p.body);

  tx.patch(`pillar-consulting-${slug}`, {
    set: {
      heroHeadline: hero.headline || undefined,
      heroSubheadline: hero.subheadline || undefined,
      challengesHeadline: `The ${hero.headline || slug.replace(/-/g, " ")} Challenges We Solve`,
      challengesBullets: parsed.challengesBullets,
      cardGridEyebrow: "WHO WE WORK WITH",
      cardGridHeadline: "Who We Work With",
      cardGridBody: parsed.cardGridBody || undefined,
      engagementModelsHeadline: "Engagement Models",
      engagementModelsIntro: parsed.engagementModelsIntro || undefined,
      engagementModels: parsed.engagementModelsBullets,
      engagementOutcomesHeadline: "Engagement Outcomes",
      engagementOutcomes: parsed.engagementOutcomesBullets,
      nextSectionTitle: "Let's get started.",
      nextSectionBody: parsed.closing || undefined,
      ctaHeadline: "Let's get started.",
      ctaBody: parsed.closing || undefined,
      ctaButtonLabel: "Talk to Our Advisor",
    },
  });
}

for (const s of servicePages) {
  const [, pillarSlug, serviceSlug] = s.path.match(/^\/([^/]+)\/([^/]+)$/) || [];
  if (!pillarSlug || !serviceSlug) continue;
  const hero = parseHero(s.body);
  const parsed = parseServiceContent(s.body);

  const left = parsed.outcomes.filter((_, i) => i % 2 === 0);
  const right = parsed.outcomes.filter((_, i) => i % 2 === 1);

  tx.patch(`service-consulting-${serviceSlug}`, {
    set: {
      title: hero.headline || s.title,
      heroHeadline: hero.headline || s.title,
      heroSubheadline: hero.subheadline || undefined,
      valuePropHeadline: "How We Work",
      valuePropBody: parsed.valuePropBody || undefined,
      problemHeadline: "The Challenges We Solve",
      problemBody: parsed.problemBody || undefined,
      problemBullets: parsed.problemBullets,
      featureEyebrow: "WHAT WE DO",
      featureHeadline: "What We Do",
      featureBullets: parsed.featureBullets,
      whatsIncludedHeadline: "Engagement Outcomes",
      whatsIncludedSubtext: parsed.closing || undefined,
      whatsIncluded: {
        column1: left,
        column2: right,
      },
      ctaHeadline: "Let's get started.",
      ctaBody: parsed.closing || undefined,
      ctaButtonLabel: "Talk to Our Advisor",
      ctaButtonLink: "/contact",
      pillar: { _type: "reference", _ref: `pillar-consulting-${pillarSlug}` },
    },
  });
}

// Seed lightweight insight docs from explicit bullet titles on pillar pages
const insightTitleSet = new Set();
for (const p of pillarPages) {
  parsePillarLanding(p.body).insightTitles.forEach((t) => insightTitleSet.add(t));
}

for (const title of insightTitleSet) {
  const slug = slugify(title);
  tx.createIfNotExists({
    _id: `insight-consulting-${slug}`,
    _type: "insight-consulting",
    title,
    slug: { _type: "slug", current: slug },
    excerpt: title,
    tag: "Strategy",
    publishedAt: new Date().toISOString(),
    content: blockToText("Seeded from gv_consulting_content.md"),
  });
}

const res = await tx.commit();
console.log("Pass2 seed complete");
console.log("Transaction:", res.transactionId);
console.log("Pillar pages updated:", pillarPages.length);
console.log("Service pages updated:", servicePages.length);
console.log("Insights created/ensured:", insightTitleSet.size);
