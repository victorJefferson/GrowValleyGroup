/**
 * Expertise page (`/expertise`) — full PAGE 33 CMS seed + hero singleton.
 * Run: node --env-file=.env scripts/seed-sanity-expertise-page.mjs
 */
import { createClient } from "@sanity/client";
import { expertisePagePayload } from "./data/expertise-page-payload.mjs";

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
  _id: "expertisePage-consulting-main",
  _type: "expertisePage-consulting",
  ...expertisePagePayload,
});

tx.createOrReplace({
  _id: "hero-consulting-expertise",
  _type: "hero-consulting",
  pageSlug: "expertise",
  eyebrow: "OUR TOP EXPERTISE",
  headline: "Our Top Expertise",
  subheadline:
    "Advisory. Execution. Accountability.\n\nGrowValley Group partners with organisations at critical moments of inflection — when growth is being pursued, capital decisions carry weight, and execution discipline becomes essential.",
  hasCTA: true,
  ctaText: "Talk to Our Advisor",
  ctaHref: "/contact",
});

const res = await tx.commit();
console.log("Expertise page seed complete.");
console.log("Transaction:", res.transactionId);
