/**
 * Fix hero-consulting pageSlug validation in Studio by normalizing published + draft
 * documents to canonical slugs. Does not change hero copy or other types.
 *
 * Keep ALLOWED_PAGE_SLUGS in sync with src/sanity/lib/heroPageSlugs.ts
 *
 * Run: node scripts/seed-hero-page-slug-validation-fix.mjs
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

/** Sync with src/sanity/lib/heroPageSlugs.ts */
const ALLOWED_PAGE_SLUGS = new Set([
  "home",
  "companies",
  "about-us",
  "leadership",
  "team",
  "advisory",
  "capital",
  "ventures",
  "works",
  "studios",
  "contact",
  "join",
  "capabilities",
  "growth-advisory",
  "capital-advisory",
  "innovation-advisory",
  "project-advisory",
  "family-office-advisory",
  "expertise",
  "partner-with-us",
  "careers",
]);

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

const PAGE_SLUG_ALIASES = {
  about: "about-us",
};

function publishedId(id) {
  return id.startsWith("drafts.") ? id.slice(7) : id;
}

function inferPageSlug(doc) {
  const id = publishedId(doc._id);

  if (PAGE_SLUG_BY_ID[id]) {
    return PAGE_SLUG_BY_ID[id];
  }

  const companyMatch = id.match(/^hero-companies-(.+)$/);
  if (companyMatch) {
    return companyMatch[1];
  }

  const consultingMatch = id.match(/^hero-consulting-(.+)$/);
  if (consultingMatch) {
    return consultingMatch[1];
  }

  const shortMatch = id.match(/^hero-([a-z0-9-]+)$/);
  if (shortMatch && shortMatch[1] !== "consulting") {
    return shortMatch[1];
  }

  const trimmed = typeof doc.pageSlug === "string" ? doc.pageSlug.trim() : "";
  if (trimmed && PAGE_SLUG_ALIASES[trimmed]) {
    return PAGE_SLUG_ALIASES[trimmed];
  }

  if (trimmed && ALLOWED_PAGE_SLUGS.has(trimmed)) {
    return trimmed;
  }

  return null;
}

async function patchSlug(documentId, pageSlug) {
  await client.patch(documentId).set({ pageSlug }).commit();
}

const heroes = await client.fetch(
  `*[_type == "hero-consulting"]{ _id, pageSlug }`,
);

if (!heroes.length) {
  console.log("No hero-consulting documents found in dataset:", dataset);
  process.exit(0);
}

const byPublished = new Map();

for (const doc of heroes) {
  const pubId = publishedId(doc._id);
  if (!byPublished.has(pubId)) {
    byPublished.set(pubId, { published: null, draft: null });
  }
  const entry = byPublished.get(pubId);
  if (doc._id.startsWith("drafts.")) {
    entry.draft = doc;
  } else {
    entry.published = doc;
  }
}

let updated = 0;
let skipped = 0;
let unresolved = 0;

for (const [pubId, { published, draft }] of byPublished) {
  const source = published ?? draft;
  const nextSlug = inferPageSlug({ _id: pubId, pageSlug: source?.pageSlug });

  if (!nextSlug || !ALLOWED_PAGE_SLUGS.has(nextSlug)) {
    console.warn(
      `  ? Skipped  ${pubId} (could not resolve slug, was "${source?.pageSlug ?? ""}")`,
    );
    unresolved++;
    continue;
  }

  const targets = [
    published ? published._id : pubId,
    draft ? draft._id : `drafts.${pubId}`,
  ];

  let changed = false;

  for (const targetId of targets) {
    const exists = await client.fetch(`*[_id == $id][0]._id`, { id: targetId });
    if (!exists) {
      continue;
    }

    const current =
      targetId === published?._id
        ? published?.pageSlug
        : draft?.pageSlug ?? published?.pageSlug;

    const normalized =
      typeof current === "string" ? current.trim() : "";

    if (normalized === nextSlug) {
      continue;
    }

    await patchSlug(targetId, nextSlug);
    console.log(
      `  ✔ Updated  ${targetId}: "${normalized}" → "${nextSlug}"`,
    );
    changed = true;
    updated++;
  }

  if (!changed) {
    console.log(`  · OK       ${pubId} → ${nextSlug}`);
    skipped++;
  }
}

console.log(
  `\nDone. ${updated} patches, ${skipped} already valid, ${unresolved} unresolved (${byPublished.size} heroes).`,
);
