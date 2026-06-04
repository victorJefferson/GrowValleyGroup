/**
 * Join page seed (`/join`) for joinPage-consulting.
 * Run: node --env-file=.env scripts/seed-sanity-join-page.mjs
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

const tx = client.transaction();

tx.createOrReplace({
  _id: "joinPage-consulting-main",
  _type: "joinPage-consulting",
  heroParagraph1:
    "GrowValley Group works with operators, experts, investors, founders, and strategic partners building businesses, ventures, and long-term opportunities across multiple sectors and markets.",
  heroParagraph2:
    "We are an ecosystem of companies, operators, and partnerships designed around execution.",
  heroCtaLabel: "Start the Conversation",
  heroCtaLink: "/contact",
  whoHeadline: "Who We Work With",
  whoIntro:
    "GrowValley collaborates with individuals and organisations that bring capability, perspective, capital, or strategic value into the ecosystem.",
  whoFocusLabel: "The focus is simple:",
  whoFocusLine: "Work with serious people building serious things.",
  audienceSections: [
    {
      _key: "join-experts",
      key: "experts",
      title: "Experts",
      tagline: "Operators with real experience.",
      body:
        "We work with experienced operators, advisors, consultants, specialists, and execution partners across strategy, finance, operations, investment, technology, venture building, and business growth.\n\nWhether supporting clients, ventures, or internal initiatives, we look for people who understand execution, not just theory.",
      ctaLabel: "Join as an Expert",
      ctaLink: "/contact",
    },
    {
      _key: "join-partners",
      key: "partners",
      title: "Partners",
      tagline: "Strategic relationships built for growth.",
      body:
        "GrowValley partners with firms, institutions, service providers, venture platforms, and ecosystem operators looking to collaborate across markets, clients, and opportunities.\n\nThe objective is long-term alignment, not transactional introductions.",
      ctaLabel: "Become a Partner",
      ctaLink: "/contact",
    },
    {
      _key: "join-investors",
      key: "investors",
      title: "Investors",
      tagline: "Capital with long-term alignment.",
      body:
        "We engage with investors, family offices, and strategic capital partners interested in venture opportunities, private markets, acquisitions, and long-term ecosystem growth.\n\nWe value disciplined capital, strategic thinking, and aligned relationships.",
      ctaLabel: "Connect as an Investor",
      ctaLink: "/contact",
    },
  ],
  whyHeadline: "Why GrowValley",
  whyIntro:
    "GrowValley operates through specialized companies across advisory, capital, venture building, and operational infrastructure.\n\nThat creates opportunities to collaborate across:",
  whyBullets: [
    "Investments",
    "Venture creation",
    "Strategic advisory",
    "Market expansion",
    "Operational execution",
    "Private market opportunities",
    "Ecosystem partnerships",
  ],
  whyClosing: "The model is designed for people who want to build, not just observe.",
  closingHeadline: "Let's build something meaningful.",
  closingBody:
    "Whether you are an operator, investor, expert, or strategic partner, GrowValley is built around long-term relationships with people who execute at a high level.\n\nIf that sounds like you, start the conversation.",
  closingCtaLabel: "Contact GrowValley",
  closingCtaLink: "/contact",
});

tx.createOrReplace({
  _id: "hero-consulting-join",
  _type: "hero-consulting",
  pageSlug: "join",
  eyebrow: "JOIN GROWVALLEY",
  headline:
    "GrowValley Group works with operators, experts, investors, founders, and strategic partners building businesses, ventures, and long-term opportunities across multiple sectors and markets.",
  subheadline:
    "We are an ecosystem of companies, operators, and partnerships designed around execution.",
  hasCTA: true,
  ctaText: "Start the Conversation",
  ctaHref: "/contact",
});

const res = await tx.commit();
console.log("Join page seed complete.");
console.log("Transaction:", res.transactionId);
