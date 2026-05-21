/**
 * Careers page seed (`/join-us/careers`) for joinUsPage-consulting.
 * Run: node --env-file=.env scripts/seed-sanity-careers-page.mjs
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
  _id: "joinUsPage-consulting-careers",
  _type: "joinUsPage-consulting",
  pageKey: "careers",
  heroEyebrow: "CAREERS",
  heroHeadline: "Careers",
  heroSubheadline:
    "Solve Hard Problems. Build Real Systems. Work That Matters.\n\nGVC works at the intersection of strategy, capital, and execution. Our team operates at the same level as the founders, CFOs, and boards they serve.",
  heroCtaLabel: "View Open Roles",
  heroCtaLink: "#openings",
  pullQuote1: "What Working at GVC Looks Like",
  pullQuote2:
    "Our work is direct, demanding, and consequential. Clients engage GVC because the stakes are real: capital is in motion, decisions carry weight, and execution has to deliver.\n\nThe work is hands-on. You will be in the room, on the program, and accountable for outcomes from the beginning.",
  whoEyebrow: "WHAT WE LOOK FOR",
  whoHeadline: "What We Look For",
  traits: [
    {
      _key: "c-trait-1",
      title: "Execution orientation",
      description:
        "You want to see the work deliver results, not produce analysis.",
    },
    {
      _key: "c-trait-2",
      title: "Intellectual rigour",
      description:
        "You can structure complex problems and communicate the logic to operators, boards, and investors.",
    },
    {
      _key: "c-trait-3",
      title: "Ownership mentality",
      description:
        "You take responsibility for your mandates and do not wait to be directed.",
    },
    {
      _key: "c-trait-4",
      title: "Commercial awareness",
      description:
        "You understand what matters to founders and operators: capital, margin, execution, and risk.",
    },
  ],
  ctaEyebrow: "CURRENT OPENINGS",
  ctaHeadline: "Current Openings",
  openings: [
    {
      _key: "c-open-1",
      title: "Associate, Growth Advisory",
      summary:
        "Support strategy and transformation mandates across diagnostics, model design, and execution planning.",
      applyLink: "mailto:careers@gv.consulting?subject=Application%20-%20Associate%2C%20Growth%20Advisory",
    },
    {
      _key: "c-open-2",
      title: "Manager, PMO & Transformation",
      summary:
        "Lead workstreams in complex multi-program transformations and build governance dashboards with clients.",
      applyLink: "mailto:careers@gv.consulting?subject=Application%20-%20Manager%2C%20PMO%20%26%20Transformation",
    },
    {
      _key: "c-open-3",
      title: "Analyst, Capital Advisory",
      summary:
        "Contribute to investment readiness, structuring, and transaction preparation mandates.",
      applyLink: "mailto:careers@gv.consulting?subject=Application%20-%20Analyst%2C%20Capital%20Advisory",
    },
  ],
  noOpeningsFallback:
    "No openings that match your profile? Send your CV and a brief note to careers@gv.consulting. We keep strong profiles on file for upcoming mandates.",
  ctaButtonLabel: "Apply",
  ctaButtonHref: "mailto:careers@gv.consulting",
});

tx.createOrReplace({
  _id: "hero-consulting-careers",
  _type: "hero-consulting",
  pageSlug: "careers",
  eyebrow: "CAREERS",
  headline: "Careers",
  subheadline:
    "Solve Hard Problems. Build Real Systems. Work That Matters.\n\nGVC works at the intersection of strategy, capital, and execution. Our team operates at the same level as the founders, CFOs, and boards they serve.",
  hasCTA: true,
  ctaText: "View Open Roles",
  ctaHref: "#openings",
});

const res = await tx.commit();
console.log("Careers page seed complete.");
console.log("Transaction:", res.transactionId);
