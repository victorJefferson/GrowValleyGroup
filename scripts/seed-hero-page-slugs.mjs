/**
 * One-off: set pageSlug on hero-consulting documents so Studio dropdowns match site routes.
 * Does not touch hero copy, images, or other content types.
 *
 * Run: node scripts/seed-hero-page-slugs.mjs
 */
import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN in .env");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

/** Canonical slug per known hero document _id */
const PAGE_SLUG_BY_ID = {
  "hero-home": "home",
  "hero-companies": "companies",
  "hero-about-us": "about-us",
  "hero-consulting-about": "about-us",
  "hero-leadership": "leadership",
  "hero-companies-advisory": "advisory",
  "hero-companies-capital": "capital",
  "hero-companies-ventures": "ventures",
  "hero-companies-works": "works",
  "hero-companies-studios": "studios",
  "hero-contact": "contact",
  "hero-join": "join",
  "hero-consulting-capabilities": "capabilities",
  "hero-consulting-growth-advisory": "growth-advisory",
  "hero-consulting-capital-advisory": "capital-advisory",
  "hero-consulting-innovation-advisory": "innovation-advisory",
  "hero-consulting-project-advisory": "project-advisory",
  "hero-consulting-family-office-advisory": "family-office-advisory",
  "hero-consulting-expertise": "expertise",
  "hero-consulting-partner-with-us": "partner-with-us",
  "hero-consulting-careers": "careers",
  "hero-consulting-contact": "contact",
  "hero-consulting-team": "team",
  "hero-consulting-leadership": "leadership",
};

/** Legacy pageSlug values → current route slug */
const PAGE_SLUG_ALIASES = {
  about: "about-us",
};

function inferPageSlug(doc) {
  if (PAGE_SLUG_BY_ID[doc._id]) {
    return PAGE_SLUG_BY_ID[doc._id];
  }

  const companyMatch = doc._id.match(/^hero-companies-(.+)$/);
  if (companyMatch) {
    return companyMatch[1];
  }

  const consultingMatch = doc._id.match(/^hero-consulting-(.+)$/);
  if (consultingMatch) {
    return consultingMatch[1];
  }

  const shortMatch = doc._id.match(/^hero-([a-z0-9-]+)$/);
  if (shortMatch && shortMatch[1] !== "consulting") {
    return shortMatch[1];
  }

  if (doc.pageSlug && PAGE_SLUG_ALIASES[doc.pageSlug]) {
    return PAGE_SLUG_ALIASES[doc.pageSlug];
  }

  if (doc.pageSlug && !PAGE_SLUG_ALIASES[doc.pageSlug]) {
    return doc.pageSlug;
  }

  return null;
}

const heroes = await client.fetch(
  `*[_type == "hero-consulting"]{ _id, pageSlug }`,
);

if (!heroes.length) {
  console.log("No hero-consulting documents found in dataset:", dataset);
  process.exit(0);
}

let updated = 0;
let skipped = 0;
let unresolved = 0;

for (const doc of heroes) {
  const nextSlug = inferPageSlug(doc);

  if (!nextSlug) {
    console.warn(`  ? Skipped  ${doc._id} (could not infer pageSlug, was "${doc.pageSlug ?? ""}")`);
    unresolved++;
    continue;
  }

  if (doc.pageSlug === nextSlug) {
    console.log(`  · OK       ${doc._id} → ${nextSlug}`);
    skipped++;
    continue;
  }

  await client.patch(doc._id).set({ pageSlug: nextSlug }).commit();
  console.log(`  ✔ Updated  ${doc._id}: "${doc.pageSlug ?? ""}" → "${nextSlug}"`);
  updated++;
}

console.log(
  `\nDone. ${updated} updated, ${skipped} already correct, ${unresolved} unresolved (${heroes.length} total).`,
);
